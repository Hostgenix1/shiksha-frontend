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
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : cloneSeed();
    } catch {
      return cloneSeed();
    }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const notify = useCallback((message, type = "success") => {
    const id = Date.now();
    setToast({ id, message, type });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3400);
  }, []);

  const updateLead = useCallback((id, patch) => {
    setData((current) => ({
      ...current,
      leads: current.leads.map((lead) =>
        lead.id === id ? { ...lead, ...patch } : lead
      ),
    }));
  }, []);

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
      setData((current) => ({ ...current, leads: [lead, ...current.leads] }));
      notify(`Lead ${id} created for ${lead.name}.`);
      return lead;
    },
    [data.leads, notify]
  );

  const addLeadNote = useCallback(
    (id, text, author = "Aarav Mehta") => {
      setData((current) => ({
        ...current,
        leads: current.leads.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                lastContact: text,
                notes: [
                  {
                    id: `n-${Date.now()}`,
                    author,
                    time: nowLabel(),
                    text,
                  },
                  ...lead.notes,
                ],
              }
            : lead
        ),
      }));
      notify("Activity added to the lead timeline.");
    },
    [notify]
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

      setData((current) => ({
        ...current,
        leads: current.leads.map((item) =>
          item.id === leadId
            ? {
                ...item,
                stage: "Application",
                lastContact: `Converted to application ${applicationId}`,
                notes: [
                  {
                    id: `n-${Date.now()}`,
                    author: "System",
                    time: nowLabel(),
                    text: `Application ${applicationId} and student profile ${studentId} created from this lead.`,
                  },
                  ...item.notes,
                ],
              }
            : item
        ),
        applications: [application, ...current.applications],
        students: [student, ...current.students],
        invoices: [invoice, ...current.invoices],
      }));
      notify(`Application ${applicationId} created for ${lead.name}.`);
      return applicationId;
    },
    [data.applications, data.invoices, data.leads, data.students, notify, updateLead]
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
      setData((current) => ({ ...current, tasks: [task, ...current.tasks] }));
      notify("Task added to your follow-up list.");
      return task;
    },
    [data.tasks, notify]
  );

  const toggleTask = useCallback((id) => {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      ),
    }));
  }, []);

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
      setData((current) => ({ ...current, students: [student, ...current.students] }));
      notify(`Student ${student.name} added successfully.`);
      return student;
    },
    [data.students, notify]
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
      setData((current) => ({
        ...current,
        applications: [application, ...current.applications],
      }));
      notify(`Application ${id} created.`);
      return application;
    },
    [data.applications, notify]
  );

  const updateApplication = useCallback((id, patch) => {
    setData((current) => ({
      ...current,
      applications: current.applications.map((application) =>
        application.id === id ? { ...application, ...patch } : application
      ),
    }));
  }, []);

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
      setData((current) => ({ ...current, invoices: [invoice, ...current.invoices] }));
      notify(`Invoice ${id} generated.`);
      return invoice;
    },
    [data.invoices, notify]
  );

  const recordPayment = useCallback(
    (invoiceId, payload) => {
      const amount = Number(payload.amount) || 0;
      if (amount <= 0) return;
      setData((current) => ({
        ...current,
        invoices: current.invoices.map((invoice) => {
          if (invoice.id !== invoiceId) return invoice;
          const payment = {
            id: `PAY-${Date.now()}`,
            date: payload.date || new Date().toISOString().slice(0, 10),
            amount,
            method: payload.method || "UPI",
            reference: payload.reference || "",
          };
          return {
            ...invoice,
            paid: Math.min(invoice.amount, invoice.paid + amount),
            payments: [payment, ...(invoice.payments || [])],
          };
        }),
      }));
      notify("Payment recorded and receipt updated.");
    },
    [notify]
  );

  const addCatalogItem = useCallback(
    (type, payload) => {
      const prefix = type === "colleges" ? "col" : type === "courses" ? "c" : "e";
      const item = {
        ...payload,
        id: `${prefix}${Date.now()}`,
        updatedAt: new Date().toISOString().slice(0, 10),
      };
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
    [notify]
  );

  const updateCatalogItem = useCallback(
    (type, id, patch) => {
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
    [notify]
  );

  const deleteCatalogItem = useCallback(
    (type, id) => {
      setData((current) => ({
        ...current,
        catalog: {
          ...current.catalog,
          [type]: current.catalog[type].filter((item) => item.id !== id),
        },
      }));
      notify("Catalog record removed.", "info");
    },
    [notify]
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
      setData((current) => ({ ...current, content: [item, ...current.content] }));
      notify("Content item drafted.");
      return item;
    },
    [notify]
  );

  const updateContent = useCallback(
    (id, patch) => {
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
    [notify]
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
      setData((current) => ({ ...current, users: [user, ...current.users] }));
      notify(`Invite sent to ${user.email}.`);
      return user;
    },
    [data.users, notify]
  );

  const updateUser = useCallback((id, patch) => {
    setData((current) => ({
      ...current,
      users: current.users.map((user) =>
        user.id === id ? { ...user, ...patch } : user
      ),
    }));
  }, []);

  const updateSettings = useCallback((patch) => {
    setData((current) => ({
      ...current,
      settings: { ...current.settings, ...patch },
    }));
  }, []);

  const resetDemoData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(cloneSeed());
    notify("Demo data reset to the original seed.", "info");
  }, [notify]);

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
