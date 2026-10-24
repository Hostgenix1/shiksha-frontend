import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { seedAdminData } from "../data/seedData";
import { nowLabel } from "../lib/utils";
import { supabaseReady } from "../lib/supabaseClient";
import { useAdminAuth } from "./AdminAuthContext";
import {
  fetchAdminData,
  saveLead as saveLeadRemote,
  saveTask as saveTaskRemote,
  saveStudent as saveStudentRemote,
  saveApplication as saveApplicationRemote,
  saveInvoice as saveInvoiceRemote,
  savePayment as savePaymentRemote,
  saveCatalogItem as saveCatalogItemRemote,
  deleteCatalogItem as deleteCatalogItemRemote,
  saveContent as saveContentRemote,
  saveProfile as saveProfileRemote,
  updateProfile as updateProfileRemote,
  saveSettings as saveSettingsRemote,
} from "../data/supabaseRepo";

const AdminDataContext = createContext(null);
const STORAGE_KEY = "shiksha_admin_data_v1";

const cloneSeed = () => JSON.parse(JSON.stringify(seedAdminData));

const nextId = (items, prefix, floor = 0) => {
  const max = items.reduce((current, item) => {
    const numeric = Number(String(item.id || "").split("-").pop());
    return Number.isFinite(numeric) ? Math.max(current, numeric) : current;
  }, floor);
  return `${prefix}-${max + 1}`;
};

const futureDate = (days) =>
  new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);

export const AdminDataProvider = ({ children }) => {
  // When Supabase env vars exist, Postgres is the source of truth.
  // Otherwise the workspace runs on the localStorage demo store.
  const remote = supabaseReady;
  const { admin } = useAdminAuth();
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : cloneSeed();
    } catch {
      return cloneSeed();
    }
  });
  const [toast, setToast] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (remote) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, remote]);

  const notify = useCallback((message, type = "success") => {
    const id = Date.now();
    setToast({ id, message, type });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3400);
  }, []);

  const push = useCallback(
    (promise, label) => {
      if (!remote || !promise) return;
      promise.catch((error) => {
        console.error(`[supabase] ${label}`, error);
        notify(
          `"${label}" could not be saved to Supabase. ${error?.message || ""}`.trim(),
          "error"
        );
      });
    },
    [notify, remote]
  );

  const loadRemote = useCallback(
    async ({ silent = false } = {}) => {
      if (!remote) return false;
      setSyncing(true);
      try {
        const remoteData = await fetchAdminData();
        setData(remoteData);
        if (!silent) {
          notify("Cloud workspace reloaded from Supabase.", "info");
        }
        return true;
      } catch (error) {
        console.error("[supabase] load", error);
        notify(`Supabase load failed. ${error?.message || ""}`.trim(), "error");
        return false;
      } finally {
        setSyncing(false);
      }
    },
    [notify, remote]
  );

  useEffect(() => {
    if (!remote || !admin) return;
    loadRemote({ silent: true });
    // Re-load when a different staff member signs in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote, admin?.email]);

  const updateLead = useCallback(
    (id, patch) => {
      if (remote) {
        const existing = data.leads.find((lead) => lead.id === id);
        if (existing) push(saveLeadRemote({ ...existing, ...patch }), "Lead update");
      }
      setData((current) => ({
        ...current,
        leads: current.leads.map((lead) =>
          lead.id === id ? { ...lead, ...patch } : lead
        ),
      }));
    },
    [data.leads, push, remote]
  );

  const addLead = useCallback(
    (payload) => {
      const id = nextId(data.leads, "LD", 1042);
      const lead = {
        id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city || "",
        source: payload.source || "Website",
        interest: payload.interest || "",
        college: payload.college || "",
        stage: "New",
        temperature: payload.temperature || "Warm",
        owner: payload.owner || "Aarav Mehta",
        score: Number(payload.score) || 60,
        value: Number(payload.value) || 0,
        createdAt: new Date().toISOString(),
        nextFollowUp: payload.nextFollowUp || futureDate(1),
        lastContact: "Lead created from admin panel",
        notes: payload.notes
          ? [
              {
                id: `n-${Date.now()}`,
                author: payload.owner || "Aarav Mehta",
                time: nowLabel(),
                text: payload.notes,
              },
            ]
          : [],
      };
      push(saveLeadRemote(lead), "Lead create");
      setData((current) => ({ ...current, leads: [lead, ...current.leads] }));
      notify(`Lead ${id} created for ${lead.name}.`);
      return lead;
    },
    [data.leads, notify, push, remote]
  );

  const addLeadNote = useCallback(
    (id, text, author = "Aarav Mehta") => {
      const note = {
        id: `n-${Date.now()}`,
        author,
        time: nowLabel(),
        text,
      };
      if (remote) {
        const existing = data.leads.find((lead) => lead.id === id);
        if (existing) {
          push(
            saveLeadRemote({
              ...existing,
              lastContact: text,
              notes: [note, ...(existing.notes || [])],
            }),
            "Lead note"
          );
        }
      }
      setData((current) => ({
        ...current,
        leads: current.leads.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                lastContact: text,
                notes: [note, ...lead.notes],
              }
            : lead
        ),
      }));
      notify("Activity added to the lead timeline.");
    },
    [data.leads, notify, push, remote]
  );

  const convertLead = useCallback(
    (leadId) => {
      const lead = data.leads.find((item) => item.id === leadId);
      if (!lead) return null;
      const existing = data.applications.find((item) => item.leadId === leadId);
      if (existing) {
        updateLead(leadId, { stage: "Application" });
        notify("An application already exists for this lead.", "info");
        return existing.id;
      }

      const applicationId = nextId(data.applications, "APP", 2051);
      const studentId = nextId(data.students, "STU", 301);
      const invoiceId = nextId(data.invoices, "INV", 4001);
      const amount = Number(lead.value) || 0;

      const application = {
        id: applicationId,
        leadId,
        studentName: lead.name,
        course: lead.interest,
        college: lead.college,
        stage: "Draft",
        submitted: "",
        counsellor: lead.owner,
        docsVerified: false,
        amount,
      };
      const student = {
        id: studentId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        course: lead.interest,
        college: lead.college,
        year: "2026",
        status: "Onboarding",
        feeStatus: "Pending",
        admissionDate: new Date().toISOString().slice(0, 10),
      };
      const invoice = {
        id: invoiceId,
        studentId,
        studentName: lead.name,
        course: lead.interest,
        amount,
        paid: 0,
        dueDate: futureDate(30),
        status: "Pending",
        payments: [],
      };
      const note = {
        id: `n-${Date.now()}`,
        author: "System",
        time: nowLabel(),
        text: `Application ${applicationId} and student profile ${studentId} created from this lead.`,
      };
      const updatedLead = {
        ...lead,
        stage: "Application",
        lastContact: `Converted to application ${applicationId}`,
        notes: [note, ...lead.notes],
      };

      if (remote) {
        push(saveLeadRemote(updatedLead), "Lead convert");
        push(saveApplicationRemote(application), "Application create");
        push(saveStudentRemote(student), "Student create");
        push(saveInvoiceRemote(invoice), "Invoice create");
      }

      setData((current) => ({
        ...current,
        leads: current.leads.map((item) =>
          item.id === leadId ? updatedLead : item
        ),
        applications: [application, ...current.applications],
        students: [student, ...current.students],
        invoices: [invoice, ...current.invoices],
      }));
      notify(`Application ${applicationId} created for ${lead.name}.`);
      return applicationId;
    },
    [data.applications, data.invoices, data.leads, data.students, notify, push, remote, updateLead]
  );

  const addTask = useCallback(
    (payload) => {
      const id = nextId(data.tasks, "TSK", 501);
      const task = {
        id,
        title: payload.title,
        leadId: payload.leadId || "",
        leadName: payload.leadName || "General task",
        due: payload.due || futureDate(1),
        priority: payload.priority || "Medium",
        type: payload.type || "Call",
        owner: payload.owner || "Aarav Mehta",
        done: false,
      };
      push(saveTaskRemote(task), "Task create");
      setData((current) => ({ ...current, tasks: [task, ...current.tasks] }));
      notify("Task added to your follow-up list.");
      return task;
    },
    [data.tasks, notify, push, remote]
  );

  const toggleTask = useCallback(
    (id) => {
      if (remote) {
        const existing = data.tasks.find((task) => task.id === id);
        if (existing) {
          push(saveTaskRemote({ ...existing, done: !existing.done }), "Task update");
        }
      }
      setData((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        ),
      }));
    },
    [data.tasks, push, remote]
  );

  const addStudent = useCallback(
    (payload) => {
      const id = nextId(data.students, "STU", 301);
      const student = {
        id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        course: payload.course,
        college: payload.college,
        year: payload.year || "2026",
        status: payload.status || "Onboarding",
        feeStatus: payload.feeStatus || "Pending",
        admissionDate: new Date().toISOString().slice(0, 10),
      };
      push(saveStudentRemote(student), "Student create");
      setData((current) => ({ ...current, students: [student, ...current.students] }));
      notify(`Student ${student.name} added successfully.`);
      return student;
    },
    [data.students, notify, push, remote]
  );

  const addApplication = useCallback(
    (payload) => {
      const id = nextId(data.applications, "APP", 2051);
      const application = {
        id,
        leadId: payload.leadId || "",
        studentName: payload.studentName,
        course: payload.course,
        college: payload.college,
        stage: payload.stage || "Draft",
        submitted: payload.submitted || "",
        counsellor: payload.counsellor || "Aarav Mehta",
        docsVerified: false,
        amount: Number(payload.amount) || 0,
      };
      push(saveApplicationRemote(application), "Application create");
      setData((current) => ({
        ...current,
        applications: [application, ...current.applications],
      }));
      notify(`Application ${id} created.`);
      return application;
    },
    [data.applications, notify, push, remote]
  );

  const updateApplication = useCallback(
    (id, patch) => {
      if (remote) {
        const existing = data.applications.find((application) => application.id === id);
        if (existing) {
          push(saveApplicationRemote({ ...existing, ...patch }), "Application update");
        }
      }
      setData((current) => ({
        ...current,
        applications: current.applications.map((application) =>
          application.id === id ? { ...application, ...patch } : application
        ),
      }));
    },
    [data.applications, push, remote]
  );

  const addInvoice = useCallback(
    (payload) => {
      const id = nextId(data.invoices, "INV", 4001);
      const invoice = {
        id,
        studentId: payload.studentId || "",
        studentName: payload.studentName,
        course: payload.course || "",
        amount: Number(payload.amount) || 0,
        paid: 0,
        dueDate: payload.dueDate || futureDate(30),
        status: "Pending",
        payments: [],
      };
      push(saveInvoiceRemote(invoice), "Invoice create");
      setData((current) => ({ ...current, invoices: [invoice, ...current.invoices] }));
      notify(`Invoice ${id} generated.`);
      return invoice;
    },
    [data.invoices, notify, push, remote]
  );

  const recordPayment = useCallback(
    (invoiceId, payload) => {
      const amount = Number(payload.amount) || 0;
      if (amount <= 0) return;
      const payment = {
        id: `PAY-${Date.now()}`,
        date: payload.date || new Date().toISOString().slice(0, 10),
        amount,
        method: payload.method || "UPI",
        reference: payload.reference || "",
      };
      if (remote) {
        const existing = data.invoices.find((invoice) => invoice.id === invoiceId);
        if (existing) {
          const newPaid = Math.min(existing.amount, existing.paid + amount);
          push(savePaymentRemote(invoiceId, payment, newPaid), "Payment");
        }
      }
      setData((current) => ({
        ...current,
        invoices: current.invoices.map((invoice) => {
          if (invoice.id !== invoiceId) return invoice;
          return {
            ...invoice,
            paid: Math.min(invoice.amount, invoice.paid + amount),
            payments: [payment, ...(invoice.payments || [])],
          };
        }),
      }));
      notify("Payment recorded and receipt updated.");
    },
    [data.invoices, notify, push, remote]
  );

  const addCatalogItem = useCallback(
    (type, payload) => {
      const prefix = type === "colleges" ? "col" : type === "courses" ? "c" : "e";
      const item = {
        ...payload,
        id: `${prefix}${Date.now()}`,
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      push(saveCatalogItemRemote(type, item), "Catalog create");
      setData((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          [type]: [item, ...current.catalog[type]],
        },
      }));
      notify("New catalog record created.");
      return item;
    },
    [notify, push, remote]
  );

  const updateCatalogItem = useCallback(
    (type, id, patch) => {
      if (remote) {
        const existing = data.catalog[type]?.find((item) => item.id === id);
        if (existing) {
          push(
            saveCatalogItemRemote(type, {
              ...existing,
              ...patch,
              updatedAt: new Date().toISOString().slice(0, 10),
            }),
            "Catalog update"
          );
        }
      }
      setData((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          [type]: current.catalog[type].map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...patch,
                  updatedAt: new Date().toISOString().slice(0, 10),
                }
              : item
          ),
        },
      }));
    },
    [data.catalog, push, remote]
  );

  const deleteCatalogItem = useCallback(
    (type, id) => {
      push(deleteCatalogItemRemote(type, id), "Catalog delete");
      setData((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          [type]: current.catalog[type].filter((item) => item.id !== id),
        },
      }));
      notify("Catalog record removed.", "info");
    },
    [notify, push, remote]
  );

  const addContent = useCallback(
    (payload) => {
      const id = `CNT-${Date.now()}`;
      const item = {
        id,
        title: payload.title,
        type: payload.type || "Article",
        category: payload.category || "General",
        status: payload.status || "Draft",
        updatedAt: new Date().toISOString().slice(0, 10),
        author: payload.author || "Aarav Mehta",
      };
      push(saveContentRemote(item), "Content create");
      setData((current) => ({ ...current, content: [item, ...current.content] }));
      notify("Content item drafted.");
      return item;
    },
    [notify, push, remote]
  );

  const updateContent = useCallback(
    (id, patch) => {
      if (remote) {
        const existing = data.content.find((item) => item.id === id);
        if (existing) {
          push(
            saveContentRemote({
              ...existing,
              ...patch,
              updatedAt: new Date().toISOString().slice(0, 10),
            }),
            "Content update"
          );
        }
      }
      setData((current) => ({
        ...current,
        content: current.content.map((item) =>
          item.id === id
            ? {
                ...item,
                ...patch,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : item
        ),
      }));
    },
    [data.content, push, remote]
  );

  const addUser = useCallback(
    (payload) => {
      const id = nextId(data.users, "USR", 1);
      const user = {
        id,
        name: payload.name,
        email: payload.email,
        role: payload.role || "Counsellor",
        status: "Active",
        lastActive: "Invite pending",
        phone: payload.phone || "",
      };
      push(saveProfileRemote(user), "Team member create");
      setData((current) => ({ ...current, users: [user, ...current.users] }));
      notify(`Invite sent to ${user.email}.`);
      return user;
    },
    [data.users, notify, push, remote]
  );

  const updateUser = useCallback(
    (id, patch) => {
      push(updateProfileRemote(id, patch), "Team member update");
      setData((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === id ? { ...user, ...patch } : user
        ),
      }));
    },
    [push, remote]
  );

  const updateSettings = useCallback(
    (patch) => {
      push(saveSettingsRemote({ ...data.settings, ...patch }), "Settings update");
      setData((current) => ({
        ...current,
        settings: { ...current.settings, ...patch },
      }));
    },
    [data.settings, push, remote]
  );

  const resetDemoData = useCallback(() => {
    if (remote) {
      // Never delete cloud data from the browser; just re-read Postgres.
      loadRemote();
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    setData(cloneSeed());
    notify("Demo data reset to the original seed.", "info");
  }, [loadRemote, notify, remote]);

  const payments = useMemo(
    () =>
      data.invoices
        .flatMap((invoice) =>
          (invoice.payments || []).map((payment) => ({
            ...payment,
            invoiceId: invoice.id,
            studentName: invoice.studentName,
            course: invoice.course,
          }))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [data.invoices]
  );

  const value = {
    ...data,
    payments,
    toast,
    notify,
    remote,
    syncing,
    reloadRemote: loadRemote,
    updateLead,
    addLead,
    addLeadNote,
    convertLead,
    addTask,
    toggleTask,
    addStudent,
    addApplication,
    updateApplication,
    addInvoice,
    recordPayment,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    addContent,
    updateContent,
    addUser,
    updateUser,
    updateSettings,
    resetDemoData,
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }
  return context;
};
