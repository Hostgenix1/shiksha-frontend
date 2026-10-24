import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  Avatar,
  EmptyState,
  PageHeader,
  SectionCard,
  SelectInput,
  StatusBadge,
  Textarea,
  TextInput,
  buttonStyles,
} from "../components/AdminUI";
import {
  cn,
  counsellorNames,
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  formatDateTime,
  leadStages,
  todayISO,
} from "../lib/utils";

const LeadStageStepper = ({ stage }) => {
  if (stage === "Lost") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        This lead was marked as lost.
      </div>
    );
  }
  const currentIndex = leadStages.indexOf(stage);
  return (
    <div className="flex items-center overflow-x-auto pb-1 [scrollbar-width:none]">
      {leadStages.map((item, index) => {
        const complete = index < currentIndex;
        const current = index === currentIndex;
        return (
          <div key={item} className="flex min-w-0 flex-1 items-center">
            <div className="flex min-w-[78px] flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                  complete
                    ? "bg-emerald-500 text-white"
                    : current
                    ? "bg-primary text-white ring-4 ring-primary/10"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {complete ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-center text-[10px] font-semibold",
                  current ? "text-primary" : "text-slate-400"
                )}
              >
                {item}
              </span>
            </div>
            {index < leadStages.length - 1 && (
              <div
                className={cn(
                  "mb-4 h-0.5 flex-1",
                  index < currentIndex ? "bg-emerald-400" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const AdminLeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAdminAuth();
  const {
    leads,
    tasks,
    applications,
    updateLead,
    addLeadNote,
    convertLead,
    toggleTask,
    notify,
  } = useAdminData();
  const [note, setNote] = useState("");

  const lead = leads.find((item) => item.id === id);
  if (!lead) {
    return (
      <div>
        <PageHeader title="Lead not found" breadcrumb={["Admin", "CRM", "Leads"]} />
        <SectionCard>
          <EmptyState
            icon={UserRound}
            title="This lead does not exist"
            description="It may have been removed or the link is incorrect."
            action={
              <Link to="/admin/leads" className={buttonStyles("primary")}>
                Back to leads
              </Link>
            }
          />
        </SectionCard>
      </div>
    );
  }

  const linkedTasks = tasks.filter((task) => task.leadId === lead.id);
  const linkedApplication = applications.find((app) => app.leadId === lead.id);
  const overdue =
    lead.nextFollowUp &&
    lead.nextFollowUp < todayISO() &&
    !["Admitted", "Lost"].includes(lead.stage);

  const submitNote = (event) => {
    event.preventDefault();
    if (!note.trim()) return;
    addLeadNote(lead.id, note.trim(), admin?.name);
    setNote("");
  };

  const quickLogCall = () => {
    addLeadNote(
      lead.id,
      `Call logged with ${lead.name}. Discussed ${lead.interest || "course options"} and the next steps.`,
      admin?.name
    );
  };

  const handleConvert = () => {
    const applicationId = convertLead(lead.id);
    if (applicationId) navigate("/admin/applications");
  };

  return (
    <div>
      <PageHeader
        breadcrumb={["Admin", "CRM", "Leads", lead.id]}
        eyebrow="Lead workspace"
        title={lead.name}
        description={`${lead.interest || "Course enquiry"} · ${lead.college || "College not selected"}`}
        actions={
          <>
            <a href={`tel:${lead.phone}`} className={buttonStyles("outline", "md")}>
              <Phone className="h-4 w-4" /> Call
            </a>
            <a href={`mailto:${lead.email}`} className={buttonStyles("outline", "md")}>
              <Mail className="h-4 w-4" /> Email
            </a>
            {linkedApplication ? (
              <Link to="/admin/applications" className={buttonStyles("primary", "md")}>
                <ClipboardList className="h-4 w-4" /> View application
              </Link>
            ) : (
              <AdminButton onClick={handleConvert}>
                Convert to application <ArrowRight className="h-4 w-4" />
              </AdminButton>
            )}
          </>
        }
      />

      <div className="mb-5 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={lead.stage} dot />
            <StatusBadge status={lead.temperature} />
            <span className="text-[11px] text-slate-400">
              Created {formatDate(lead.createdAt)}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            Lead score <strong className="text-dark">{lead.score}/100</strong>
          </span>
        </div>
        <LeadStageStepper stage={lead.stage} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <SectionCard title="Activity timeline" description="Calls, notes and system updates.">
            <form onSubmit={submitNote} className="border-b border-slate-100 p-5">
              <Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={`Add a note about your conversation with ${lead.name.split(" ")[0]}…`}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <AdminButton
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={quickLogCall}
                  >
                    <Phone className="h-3.5 w-3.5" /> Log a call
                  </AdminButton>
                  <AdminButton
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      addLeadNote(
                        lead.id,
                        `Brochure and course details sent to ${lead.email}.`,
                        admin?.name
                      )
                    }
                  >
                    <Send className="h-3.5 w-3.5" /> Send brochure
                  </AdminButton>
                </div>
                <AdminButton type="submit" size="sm">
                  Add note <Plus className="h-3.5 w-3.5" />
                </AdminButton>
              </div>
            </form>

            <div className="p-5">
              {lead.notes.length === 0 ? (
                <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-xs text-slate-500">
                  No activity yet. Add the first note or log a call.
                </p>
              ) : (
                <div className="relative space-y-5 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-slate-200">
                  {lead.notes.map((activity) => (
                    <div key={activity.id} className="relative flex gap-3">
                      <Avatar name={activity.author} size="sm" className="relative z-10 ring-4 ring-white" />
                      <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50/70 p-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-[11px] font-bold text-dark">
                            {activity.author}
                          </p>
                          <span className="text-[10px] text-slate-400">{activity.time}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                          {activity.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Linked records"
            description="The application and follow-ups created from this lead."
          >
            <div className="divide-y divide-slate-100">
              <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <ClipboardList className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-dark">Application</p>
                  {linkedApplication ? (
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {linkedApplication.id} · {linkedApplication.course} ·{" "}
                      {formatCompactCurrency(linkedApplication.amount)}
                    </p>
                  ) : (
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      No application created yet.
                    </p>
                  )}
                </div>
                {linkedApplication ? (
                  <>
                    <StatusBadge status={linkedApplication.stage} />
                    <Link
                      to="/admin/applications"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Open
                    </Link>
                  </>
                ) : (
                  <AdminButton size="sm" variant="outline" onClick={handleConvert}>
                    Convert lead
                  </AdminButton>
                )}
              </div>

              {linkedTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 px-5 py-3.5">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                      task.done
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 text-transparent hover:border-primary hover:text-primary"
                    )}
                    aria-label="Toggle task"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-xs font-medium",
                        task.done ? "text-slate-400 line-through" : "text-dark"
                      )}
                    >
                      {task.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(task.due)}
                      <StatusBadge status={task.priority} />
                    </p>
                  </div>
                </div>
              ))}

              <div className="px-5 py-3.5">
                <Link
                  to="/admin/tasks"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Manage follow-ups <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-5">
          <SectionCard title="Contact details">
            <div className="space-y-4 p-5 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <a
                    href={`mailto:${lead.email}`}
                    className="mt-0.5 block break-all text-xs font-medium text-dark hover:text-primary"
                  >
                    {lead.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>
                  <a
                    href={`tel:${lead.phone}`}
                    className="mt-0.5 block text-xs font-medium text-dark hover:text-primary"
                  >
                    {lead.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    City
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-dark">{lead.city || "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Source
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-dark">{lead.source}</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Lead controls">
            <div className="space-y-4 p-5">
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Stage
                </span>
                <SelectInput
                  value={lead.stage}
                  onChange={(event) => {
                    updateLead(lead.id, { stage: event.target.value });
                    notify(`Stage updated to ${event.target.value}.`);
                  }}
                >
                  {[...leadStages, "Lost"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectInput>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Owner
                </span>
                <SelectInput
                  value={lead.owner}
                  onChange={(event) => {
                    updateLead(lead.id, { owner: event.target.value });
                    notify(`Lead reassigned to ${event.target.value}.`);
                  }}
                >
                  {counsellorNames.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </SelectInput>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Temperature
                </span>
                <SelectInput
                  value={lead.temperature}
                  onChange={(event) =>
                    updateLead(lead.id, { temperature: event.target.value })
                  }
                >
                  <option>Hot</option>
                  <option>Warm</option>
                  <option>Cold</option>
                </SelectInput>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Next follow-up
                </span>
                <TextInput
                  type="date"
                  value={lead.nextFollowUp || ""}
                  onChange={(event) =>
                    updateLead(lead.id, { nextFollowUp: event.target.value })
                  }
                />
                {overdue && (
                  <span className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-rose-600">
                    <Clock className="h-3 w-3" /> Follow-up is overdue
                  </span>
                )}
              </label>
              {lead.stage === "Lost" && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
                  Reason: {lead.lostReason || "Not specified"}
                </p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Opportunity">
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Potential value
              </p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-dark">
                {formatCurrency(lead.value)}
              </p>
              <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Interested in</span>
                  <span className="text-right font-semibold text-dark">
                    {lead.interest || "—"}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">College</span>
                  <span className="text-right font-semibold text-dark">
                    {lead.college || "—"}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Last contact</span>
                  <span className="max-w-[150px] text-right font-medium text-slate-600">
                    {lead.lastContact || "—"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3">
                <Avatar name={lead.owner} size="sm" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400">Assigned counsellor</p>
                  <p className="truncate text-xs font-semibold text-dark">{lead.owner}</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center">
            <MessageSquare className="mx-auto h-5 w-5 text-slate-300" />
            <p className="mt-2 text-xs font-semibold text-dark">Need a quick update?</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Log a call or add a note from the activity timeline.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-[11px] text-slate-500">
        <Link to="/admin/leads" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all leads
        </Link>
        <span>Last updated {formatDateTime(lead.createdAt)}</span>
      </div>
    </div>
  );
};

export default AdminLeadDetail;
