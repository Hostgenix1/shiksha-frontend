import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  Plus,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useAdminData } from "../context/AdminDataContext";
import {
  Avatar,
  MiniBars,
  PageHeader,
  ProgressBar,
  SectionCard,
  Sparkline,
  StatCard,
  StatusBadge,
  buttonStyles,
} from "../components/AdminUI";
import {
  cn,
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  leadStages,
  percent,
  todayISO,
} from "../lib/utils";

const sourceTones = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-slate-400",
];

const AdminDashboard = () => {
  const { admin } = useAdminAuth();
  const { leads, tasks, students, invoices, applications, toggleTask } = useAdminData();

  const activeLeads = leads.filter((lead) => lead.stage !== "Lost");
  const newLeads = leads.filter((lead) => lead.stage === "New");
  const admitted = leads.filter((lead) => lead.stage === "Admitted");
  const collected = invoices.reduce((total, invoice) => total + invoice.paid, 0);
  const billed = invoices.reduce((total, invoice) => total + invoice.amount, 0);
  const outstanding = billed - collected;
  const collectionRate = percent(collected, billed);
  const openTasks = tasks.filter((task) => !task.done);
  const today = todayISO();
  const dueToday = openTasks.filter(
    (task) => task.due <= today
  );
  const conversion = percent(admitted.length, leads.length);

  const sourceCounts = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});
  const sourceData = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, value], index) => ({
      label,
      value,
      dot: sourceTones[index],
      tone: sourceTones[index],
    }));

  const pipelineData = leadStages.map((stage) => ({
    label: stage,
    value: leads.filter((lead) => lead.stage === stage).length,
    tone:
      stage === "Admitted"
        ? "bg-emerald-500"
        : stage === "Application"
        ? "bg-orange-500"
        : stage === "Counselling"
        ? "bg-amber-500"
        : stage === "New"
        ? "bg-sky-500"
        : "bg-primary",
  }));

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  const recentAdmissions = [...students]
    .filter((student) => student.status !== "Graduated")
    .sort((a, b) => new Date(b.admissionDate) - new Date(a.admissionDate))
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        eyebrow="Command center"
        title={`Welcome back, ${admin?.name?.split(" ")[0] || "Admin"}`}
        description="Here is the live pulse of your admissions, counselling and fee operations."
        breadcrumb={["Admin", "Dashboard"]}
        actions={
          <>
            <Link to="/admin/reports" className={buttonStyles("outline", "md")}>
              <BarChart3 className="h-4 w-4" /> View reports
            </Link>
            <Link to="/admin/leads?new=1" className={buttonStyles("primary", "md")}>
              <Plus className="h-4 w-4" /> New lead
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="New leads"
          value={newLeads.length}
          trend="+18.4%"
          helper={`${activeLeads.length} active leads`}
          icon={Users}
          tone="blue"
        />
        <StatCard
          label="Open applications"
          value={applications.filter((item) => !["Enrolled", "Rejected"].includes(item.stage)).length}
          trend="+8.2%"
          helper={`${applications.filter((item) => item.stage === "Enrolled").length} enrolled`}
          icon={ClipboardList}
          tone="violet"
        />
        <StatCard
          label="Fees collected"
          value={formatCompactCurrency(collected)}
          trend="+24.1%"
          helper={`${collectionRate}% of ${formatCompactCurrency(billed)} billed`}
          icon={IndianRupee}
          tone="emerald"
        />
        <StatCard
          label="Lead conversion"
          value={`${conversion}%`}
          trend="+2.8%"
          helper={`${admitted.length} admissions`}
          icon={TrendingUp}
          tone="amber"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <SectionCard
            title="Lead & revenue performance"
            description="A quick view of the last 30 days of pipeline activity."
            action={
              <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                Last 30 days
              </span>
            }
          >
            <div className="p-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Pipeline value
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-dark">
                    {formatCompactCurrency(activeLeads.reduce((sum, lead) => sum + (lead.value || 0), 0))}
                  </p>
                </div>
                <div className="flex gap-6 text-xs">
                  <div>
                    <p className="text-slate-400">New leads</p>
                    <p className="mt-0.5 font-bold text-dark">{newLeads.length}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Qualified</p>
                    <p className="mt-0.5 font-bold text-dark">
                      {leads.filter((lead) => lead.stage === "Qualified").length}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Admitted</p>
                    <p className="mt-0.5 font-bold text-emerald-600">{admitted.length}</p>
                  </div>
                </div>
              </div>
              <Sparkline
                points={[4, 6, 5, 9, 8, 12, 10, 14, 13, 17, 15, 19]}
                className="mt-4"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>25 Sep</span>
                <span>10 Oct</span>
                <span>25 Oct</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Recent leads"
            description="The latest enquiries across every source."
            action={
              <Link
                to="/admin/leads"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Lead</th>
                    <th className="px-4 py-3 font-semibold">Interest</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                    <th className="px-4 py-3 font-semibold">Stage</th>
                    <th className="px-4 py-3 font-semibold">Owner</th>
                    <th className="px-5 py-3 text-right font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="transition hover:bg-slate-50/70">
                      <td className="px-5 py-3">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="flex items-center gap-2.5"
                        >
                          <Avatar name={lead.name} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-dark">
                              {lead.name}
                            </p>
                            <p className="truncate text-[10px] text-slate-400">
                              {lead.id} · {lead.city}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-slate-600">{lead.interest}</p>
                        <p className="text-[10px] text-slate-400">{lead.college}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{lead.source}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.stage} dot />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={lead.owner} size="sm" />
                          <span className="text-[11px] text-slate-500">{lead.owner}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right text-xs font-bold text-dark">
                        {formatCompactCurrency(lead.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <div className="grid gap-5 md:grid-cols-2">
            <SectionCard
              title="Recent admissions"
              action={
                <Link
                  to="/admin/students"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Students
                </Link>
              }
            >
              <div className="divide-y divide-slate-100">
                {recentAdmissions.map((student) => (
                  <div key={student.id} className="flex items-center gap-3 px-5 py-3.5">
                    <Avatar name={student.name} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-dark">
                        {student.name}
                      </p>
                      <p className="truncate text-[10px] text-slate-400">
                        {student.course} · {student.college}
                      </p>
                    </div>
                    <StatusBadge status={student.status} />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Lead sources" description="Where enquiries are coming from.">
              <div className="p-5">
                <MiniBars items={sourceData} formatValue={(value) => `${value}`} />
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="space-y-5">
          <SectionCard title="Pipeline health" description="Active leads by counselling stage.">
            <div className="p-5">
              <MiniBars
                items={pipelineData}
                formatValue={(value) => `${value}`}
                tone="bg-primary"
              />
              <Link
                to="/admin/pipeline"
                className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
              >
                Open pipeline <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </SectionCard>

          <SectionCard title="Fee collection" description="Current billing cycle.">
            <div className="p-5">
              <p className="text-2xl font-extrabold tracking-tight text-dark">
                {formatCurrency(collected)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                collected of {formatCurrency(billed)}
              </p>
              <ProgressBar
                value={collectionRate}
                tone={collectionRate > 70 ? "bg-emerald-500" : "bg-amber-500"}
                className="mt-4"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Outstanding
                  </p>
                  <p className="mt-1 text-sm font-bold text-rose-600">
                    {formatCompactCurrency(outstanding)}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Invoices
                  </p>
                  <p className="mt-1 text-sm font-bold text-dark">{invoices.length}</p>
                </div>
              </div>
              <Link
                to="/admin/invoices"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Manage invoices <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </SectionCard>

          <SectionCard
            title="Today's follow-ups"
            description={`${dueToday.length} conversations need attention.`}
            action={
              <Link
                to="/admin/tasks"
                className="text-xs font-semibold text-primary hover:underline"
              >
                All tasks
              </Link>
            }
          >
            <div className="divide-y divide-slate-100">
              {openTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-start gap-3 px-5 py-3.5">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-300 text-transparent transition hover:border-primary hover:text-primary"
                    aria-label="Mark task complete"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium leading-snug text-dark">{task.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {formatDate(task.due, { year: undefined })}
                      </span>
                      <StatusBadge status={task.priority} />
                    </div>
                  </div>
                </div>
              ))}
              {openTasks.length === 0 && (
                <div className="px-5 py-8 text-center text-xs text-slate-500">
                  Everything is caught up. Great work!
                </div>
              )}
            </div>
          </SectionCard>

          <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 to-[#13233f] p-5 text-white shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Wallet className="h-4 w-4 text-accent" />
            </span>
            <p className="mt-3 text-sm font-bold">Monthly target</p>
            <p className="mt-1 text-2xl font-extrabold">
              {Math.min(100, Math.round((collected / 2500000) * 100))}%
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              {formatCompactCurrency(collected)} collected towards the ₹25L collections
              target.
            </p>
            <ProgressBar
              value={Math.min(100, (collected / 2500000) * 100)}
              tone="bg-accent"
              className="mt-3 bg-white/10"
            />
            <Link
              to="/admin/reports"
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-200 hover:text-white"
            >
              Review performance <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Create an application",
            helper: "Convert an enquiry into an application.",
            to: "/admin/applications",
            icon: ClipboardList,
            tone: "bg-violet-50 text-violet-600",
          },
          {
            label: "Record a payment",
            helper: "Log an offline or UPI payment.",
            to: "/admin/invoices",
            icon: IndianRupee,
            tone: "bg-emerald-50 text-emerald-600",
          },
          {
            label: "Publish a college",
            helper: "Keep the public catalog up to date.",
            to: "/admin/colleges",
            icon: Building2,
            tone: "bg-blue-50 text-blue-600",
          },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-primary/30 hover:shadow-sm"
          >
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", item.tone)}>
              <item.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-dark">{item.label}</p>
              <p className="truncate text-[10px] text-slate-400">{item.helper}</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
