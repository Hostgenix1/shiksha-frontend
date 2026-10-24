import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Download,
  FileCheck2,
  Plus,
  Search,
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
import {
  applicationStages,
  cn,
  counsellorNames,
  downloadCsv,
  formatCompactCurrency,
  formatDate,
  todayISO,
} from "../lib/utils";

const emptyApplication = {
  leadId: "",
  studentName: "",
  course: "",
  college: "",
  stage: "Draft",
  submitted: "",
  counsellor: "Aarav Mehta",
  amount: "",
};

const AdminApplications = () => {
  const {
    applications,
    leads,
    updateApplication,
    addApplication,
    notify,
  } = useAdminData();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [counsellor, setCounsellor] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingId, setViewingId] = useState(null);
  const [form, setForm] = useState(emptyApplication);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return applications.filter(
      (application) =>
        (!term ||
          [
            application.studentName,
            application.id,
            application.course,
            application.college,
            application.leadId,
          ]
            .join(" ")
            .toLowerCase()
            .includes(term)) &&
        (stage === "All" || application.stage === stage) &&
        (counsellor === "All" || application.counsellor === counsellor)
    );
  }, [applications, search, stage, counsellor]);

  const viewing = applications.find((application) => application.id === viewingId);
  const inProgress = applications.filter(
    (application) => !["Enrolled", "Rejected", "Draft"].includes(application.stage)
  );
  const offers = applications.filter((application) =>
    ["Offer issued", "Offer accepted", "Enrolled"].includes(application.stage)
  );
  const enrolled = applications.filter((application) => application.stage === "Enrolled");

  const chooseLead = (leadId) => {
    const lead = leads.find((item) => item.id === leadId);
    setForm((current) => ({
      ...current,
      leadId,
      studentName: lead?.name || current.studentName,
      course: lead?.interest || current.course,
      college: lead?.college || current.college,
      amount: lead?.value || current.amount,
      counsellor: lead?.owner || current.counsellor,
    }));
  };

  const submitApplication = (event) => {
    event.preventDefault();
    if (!form.studentName.trim() || !form.course.trim()) {
      notify("Student name and course are required.", "error");
      return;
    }
    addApplication({
      ...form,
      submitted: form.stage === "Draft" ? "" : form.submitted || todayISO(),
    });
    setForm(emptyApplication);
    setModalOpen(false);
  };

  const exportApplications = () => {
    downloadCsv(
      "shiksha-applications.csv",
      filtered.map((application) => ({
        "Application ID": application.id,
        "Lead ID": application.leadId,
        Student: application.studentName,
        Course: application.course,
        College: application.college,
        Stage: application.stage,
        Submitted: application.submitted,
        Counsellor: application.counsellor,
        Documents: application.docsVerified ? "Verified" : "Pending",
        Amount: application.amount,
      }))
    );
    notify(`Exported ${filtered.length} applications.`);
  };

  const stageStats = [
    {
      label: "Applications",
      value: applications.length,
      helper: "All time",
      tone: "bg-blue-50 text-blue-600",
      icon: ClipboardList,
    },
    {
      label: "In progress",
      value: inProgress.length,
      helper: "Being processed",
      tone: "bg-amber-50 text-amber-600",
      icon: Search,
    },
    {
      label: "Offers",
      value: offers.length,
      helper: "Issued or accepted",
      tone: "bg-violet-50 text-violet-600",
      icon: FileCheck2,
    },
    {
      label: "Enrolled",
      value: enrolled.length,
      helper: "Admission won",
      tone: "bg-emerald-50 text-emerald-600",
      icon: CheckCircle2,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Admissions"
        title="Applications"
        description="Track every application from draft to enrolment, with documents and offers."
        breadcrumb={["Admin", "Admissions", "Applications"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportApplications}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New application
            </AdminButton>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stageStats.map((stat) => (
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
            placeholder="Search by student, application ID or college…"
            className="w-full lg:max-w-sm"
          />
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <SelectInput
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="!w-auto py-2 text-xs"
            >
              <option value="All">All stages</option>
              {applicationStages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
            <SelectInput
              value={counsellor}
              onChange={(event) => setCounsellor(event.target.value)}
              className="!w-auto py-2 text-xs"
            >
              <option value="All">All counsellors</option>
              {counsellorNames.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No applications match these filters"
            description="Try a different stage, counsellor or search term."
            action={
              <AdminButton variant="outline" onClick={() => setSearch("")}>
                Clear search
              </AdminButton>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1060px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Applicant</th>
                  <th className="px-4 py-3 font-semibold">Programme</th>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Documents</th>
                  <th className="px-4 py-3 font-semibold">Stage</th>
                  <th className="px-4 py-3 font-semibold">Counsellor</th>
                  <th className="px-4 py-3 text-right font-semibold">Value</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((application) => (
                  <tr key={application.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={application.studentName} size="sm" />
                        <div>
                          <p className="text-xs font-semibold text-dark">
                            {application.studentName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {application.id}
                            {application.leadId ? ` · ${application.leadId}` : ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-slate-700">{application.course}</p>
                      <p className="text-[10px] text-slate-400">{application.college}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {application.submitted ? formatDate(application.submitted) : "Not submitted"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold",
                          application.docsVerified
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        )}
                      >
                        {application.docsVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <SelectInput
                        value={application.stage}
                        onChange={(event) => {
                          updateApplication(application.id, { stage: event.target.value });
                          notify(`Application moved to ${event.target.value}.`);
                        }}
                        className="!w-[150px] py-1.5 text-[11px]"
                      >
                        {applicationStages.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </SelectInput>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Avatar name={application.counsellor} size="sm" />
                        <span className="text-[10px] text-slate-500">
                          {application.counsellor.split(" ")[0]}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-xs font-bold text-dark">
                      {formatCompactCurrency(application.amount)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setViewingId(application.id)}
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
            {applications.length} applications
          </span>
          <Link to="/admin/students" className="font-semibold text-primary hover:underline">
            View students
          </Link>
        </div>
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create an application"
        description="Start a new application manually or prefill it from an existing lead."
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitApplication}>Create application</AdminButton>
          </>
        }
      >
        <form onSubmit={submitApplication} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Convert from lead" className="sm:col-span-2">
            <SelectInput
              value={form.leadId}
              onChange={(event) => chooseLead(event.target.value)}
            >
              <option value="">Start without a lead</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} · {lead.interest || "No course"}
                </option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Student name" required>
            <TextInput
              value={form.studentName}
              onChange={(event) =>
                setForm({ ...form, studentName: event.target.value })
              }
              required
            />
          </FormField>
          <FormField label="Course" required>
            <TextInput
              value={form.course}
              onChange={(event) => setForm({ ...form, course: event.target.value })}
              required
            />
          </FormField>
          <FormField label="College">
            <TextInput
              value={form.college}
              onChange={(event) => setForm({ ...form, college: event.target.value })}
            />
          </FormField>
          <FormField label="Stage">
            <SelectInput
              value={form.stage}
              onChange={(event) => setForm({ ...form, stage: event.target.value })}
            >
              {applicationStages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Counsellor">
            <SelectInput
              value={form.counsellor}
              onChange={(event) => setForm({ ...form, counsellor: event.target.value })}
            >
              {counsellorNames.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Application value (₹)">
            <TextInput
              type="number"
              min="0"
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
            />
          </FormField>
          <FormField label="Submitted on">
            <TextInput
              type="date"
              value={form.submitted}
              onChange={(event) => setForm({ ...form, submitted: event.target.value })}
            />
          </FormField>
        </form>
      </Modal>

      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewingId(null)}
        title={viewing ? `Application ${viewing.id}` : "Application"}
        description={viewing ? `${viewing.studentName} · ${viewing.course}` : ""}
        wide
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setViewingId(null)}>
              Close
            </AdminButton>
            {viewing && (
              <AdminButton
                onClick={() => {
                  updateApplication(viewing.id, {
                    stage: "Enrolled",
                    docsVerified: true,
                  });
                  notify("Application marked as enrolled.");
                }}
              >
                Mark enrolled
              </AdminButton>
            )}
          </>
        }
      >
        {viewing && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={viewing.studentName} size="lg" />
                  <div>
                    <p className="text-base font-extrabold text-dark">
                      {viewing.studentName}
                    </p>
                    <p className="text-xs text-slate-500">{viewing.leadId || "Manual entry"}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge status={viewing.stage} dot />
                  <StatusBadge status={viewing.docsVerified ? "Verified" : "Pending"} />
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 text-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Programme
                </p>
                <p className="mt-1 text-sm font-bold text-dark">{viewing.course}</p>
                <p className="mt-0.5 text-xs text-slate-500">{viewing.college}</p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Application value
                </p>
                <p className="mt-1 text-sm font-bold text-dark">
                  {formatCompactCurrency(viewing.amount)}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Application details
                </p>
                <dl className="mt-3 space-y-2.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Submitted</dt>
                    <dd className="font-semibold text-dark">
                      {viewing.submitted ? formatDate(viewing.submitted) : "Not submitted"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Counsellor</dt>
                    <dd className="font-semibold text-dark">{viewing.counsellor}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Documents</dt>
                    <dd className="font-semibold text-dark">
                      {viewing.docsVerified ? "Verified" : "Pending verification"}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Document checklist
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    "Class 10 mark sheet",
                    "Class 12 mark sheet",
                    "Entrance exam scorecard",
                    "Category certificate",
                  ].map((doc, index) => (
                    <label
                      key={doc}
                      className="flex items-center gap-2 text-[11px] text-slate-600"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={viewing.docsVerified || index < 2}
                        className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      {doc}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminApplications;
