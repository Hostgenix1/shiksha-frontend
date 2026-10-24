import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Download,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  UserRound,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  Avatar,
  EmptyState,
  FormField,
  Modal,
  PageHeader,
  SearchField,
  SectionCard,
  SelectInput,
  StatusBadge,
  TextInput,
} from "../components/AdminUI";
import { cn, downloadCsv, formatDate } from "../lib/utils";

const emptyStudent = {
  name: "",
  email: "",
  phone: "",
  course: "",
  college: "",
  year: "2026",
  status: "Onboarding",
  feeStatus: "Pending",
};

const AdminStudents = () => {
  const { students, addStudent, invoices, notify } = useAdminData();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [feeStatus, setFeeStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingId, setViewingId] = useState(null);
  const [form, setForm] = useState(emptyStudent);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter(
      (student) =>
        (!term ||
          [student.name, student.email, student.phone, student.course, student.college, student.id]
            .join(" ")
            .toLowerCase()
            .includes(term)) &&
        (status === "All" || student.status === status) &&
        (feeStatus === "All" || student.feeStatus === feeStatus)
    );
  }, [students, search, status, feeStatus]);

  const viewing = students.find((student) => student.id === viewingId);
  const studentInvoices = viewing
    ? invoices.filter((invoice) => invoice.studentId === viewing.id)
    : [];
  const outstanding = viewing
    ? studentInvoices.reduce((sum, invoice) => sum + (invoice.amount - invoice.paid), 0)
    : 0;

  const submitStudent = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      notify("Name and email are required.", "error");
      return;
    }
    addStudent(form);
    setForm(emptyStudent);
    setModalOpen(false);
  };

  const exportStudents = () => {
    downloadCsv(
      "shiksha-students.csv",
      filtered.map((student) => ({
        "Student ID": student.id,
        Name: student.name,
        Email: student.email,
        Phone: student.phone,
        Course: student.course,
        College: student.college,
        Year: student.year,
        Status: student.status,
        "Fee status": student.feeStatus,
        "Admission date": student.admissionDate,
      }))
    );
    notify(`Exported ${filtered.length} students.`);
  };

  const stats = [
    {
      label: "Total students",
      value: students.length,
      helper: "All records",
      tone: "bg-blue-50 text-blue-600",
      icon: GraduationCap,
    },
    {
      label: "Active students",
      value: students.filter((student) => student.status === "Active").length,
      helper: "Currently enrolled",
      tone: "bg-emerald-50 text-emerald-600",
      icon: UserRound,
    },
    {
      label: "Onboarding",
      value: students.filter((student) => student.status === "Onboarding").length,
      helper: "Admission in progress",
      tone: "bg-amber-50 text-amber-600",
      icon: CalendarDays,
    },
    {
      label: "Fee pending",
      value: students.filter((student) => student.feeStatus !== "Paid").length,
      helper: "Partial or unpaid",
      tone: "bg-rose-50 text-rose-600",
      icon: CalendarDays,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Admissions"
        title="Students"
        description="A single record for every enrolled and onboarding student."
        breadcrumb={["Admin", "Admissions", "Students"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportStudents}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add student
            </AdminButton>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", stat.tone)}>
              <stat.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-dark">{stat.value}</p>
              <p className="text-[10px] text-slate-400">{stat.helper}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionCard>
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search by name, course, college or student ID…"
            className="w-full lg:max-w-sm"
          />
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <SelectInput
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="!w-auto py-2 text-xs"
            >
              <option value="All">All statuses</option>
              <option>Active</option>
              <option>Onboarding</option>
              <option>Graduated</option>
            </SelectInput>
            <SelectInput
              value={feeStatus}
              onChange={(event) => setFeeStatus(event.target.value)}
              className="!w-auto py-2 text-xs"
            >
              <option value="All">All fee statuses</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Pending</option>
            </SelectInput>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            title="No students match these filters"
            description="Try changing the search term or filters."
            action={
              <AdminButton variant="outline" onClick={() => {
                setSearch("");
                setStatus("All");
                setFeeStatus("All");
              }}>
                Clear filters
              </AdminButton>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Year</th>
                  <th className="px-4 py-3 font-semibold">Fee status</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Admitted</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((student) => (
                  <tr key={student.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={student.name} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-dark">
                            {student.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="flex items-center gap-1 text-[11px] text-slate-600">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {student.phone}
                      </p>
                      <p className="mt-0.5 flex max-w-[180px] items-center gap-1 truncate text-[10px] text-slate-400">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-slate-700">{student.course}</p>
                      <p className="text-[10px] text-slate-400">{student.college}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{student.year}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={student.feeStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={student.status} dot />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatDate(student.admissionDate)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setViewingId(student.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        View <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500">
          <span>
            Showing <strong className="text-dark">{filtered.length}</strong> of{" "}
            {students.length} students
          </span>
          <Link to="/admin/applications" className="font-semibold text-primary hover:underline">
            View applications
          </Link>
        </div>
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add a student"
        description="Create a student record and set the onboarding status."
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitStudent}>Add student</AdminButton>
          </>
        }
      >
        <form onSubmit={submitStudent} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full name" required>
            <TextInput
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </FormField>
          <FormField label="Email" required>
            <TextInput
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </FormField>
          <FormField label="Phone">
            <TextInput
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
            />
          </FormField>
          <FormField label="Admission year">
            <TextInput
              value={form.year}
              onChange={(event) => setForm({ ...form, year: event.target.value })}
            />
          </FormField>
          <FormField label="Course">
            <TextInput
              value={form.course}
              onChange={(event) => setForm({ ...form, course: event.target.value })}
              placeholder="e.g. B.Tech CSE"
            />
          </FormField>
          <FormField label="College">
            <TextInput
              value={form.college}
              onChange={(event) => setForm({ ...form, college: event.target.value })}
              placeholder="e.g. IIT Patna"
            />
          </FormField>
          <FormField label="Status">
            <SelectInput
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            >
              <option>Onboarding</option>
              <option>Active</option>
              <option>Graduated</option>
            </SelectInput>
          </FormField>
          <FormField label="Fee status">
            <SelectInput
              value={form.feeStatus}
              onChange={(event) => setForm({ ...form, feeStatus: event.target.value })}
            >
              <option>Pending</option>
              <option>Partial</option>
              <option>Paid</option>
            </SelectInput>
          </FormField>
        </form>
      </Modal>

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewingId(null)}
        title={viewing?.name || "Student profile"}
        description={viewing ? `${viewing.id} · ${viewing.year} admission cycle` : ""}
        wide
        footer={
          <AdminButton variant="outline" onClick={() => setViewingId(null)}>
            Close
          </AdminButton>
        }
      >
        {viewing && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <Avatar name={viewing.name} size="xl" />
                <div>
                  <p className="text-lg font-extrabold text-dark">{viewing.name}</p>
                  <p className="text-xs text-slate-500">
                    {viewing.course} · {viewing.college}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <StatusBadge status={viewing.status} dot />
                    <StatusBadge status={viewing.feeStatus} />
                  </div>
                </div>
              </div>
              <div className="space-y-3 rounded-xl border border-slate-200 p-4 text-sm">
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-slate-400" />
                  <span className="break-all text-xs text-slate-600">{viewing.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-slate-600">{viewing.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-slate-600">
                    Admitted {formatDate(viewing.admissionDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Programme
                </p>
                <p className="mt-1 text-sm font-bold text-dark">{viewing.course}</p>
                <p className="mt-0.5 text-xs text-slate-500">{viewing.college}</p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Admission year
                </p>
                <p className="mt-1 text-sm font-bold text-dark">{viewing.year}</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Fee summary
                </p>
                <p className="mt-1 text-sm font-bold text-dark">
                  {studentInvoices.length
                    ? `${studentInvoices.length} invoice${studentInvoices.length > 1 ? "s" : ""}`
                    : "No invoices yet"}
                </p>
                {outstanding > 0 && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">
                    ₹{outstanding.toLocaleString("en-IN")} outstanding
                  </p>
                )}
                <Link
                  to="/admin/invoices"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Open finance <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminStudents;
