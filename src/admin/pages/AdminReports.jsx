import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Download,
  IndianRupee,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  Avatar,
  MiniBars,
  PageHeader,
  ProgressBar,
  SectionCard,
  StatCard,
  StatusBadge,
} from "../components/AdminUI";
import {
  cn,
  downloadCsv,
  formatCompactCurrency,
  formatCurrency,
  invoiceStatus,
  leadStages,
  percent,
  todayISO,
} from "../lib/utils";

const ranges = ["Last 30 days", "This quarter", "Year to date"];

const AdminReports = () => {
  const { leads, applications, invoices, students, tasks, notify } = useAdminData();
  const [range, setRange] = useState("Last 30 days");
  const today = todayISO();

  const activeLeads = leads.filter((lead) => lead.stage !== "Lost");
  const lostLeads = leads.filter((lead) => lead.stage === "Lost");
  const admitted = leads.filter((lead) => lead.stage === "Admitted");
  const billed = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const collected = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);
  const outstanding = billed - collected;
  const conversion = percent(admitted.length, leads.length);
  const avgLeadValue = activeLeads.length
    ? activeLeads.reduce((sum, lead) => sum + (lead.value || 0), 0) / activeLeads.length
    : 0;
  const enrolled = applications.filter((app) => app.stage === "Enrolled");
  const winRate = percent(enrolled.length, applications.length);

  const funnel = leadStages.map((stage, index) => {
    const reached = activeLeads.filter(
      (lead) => leadStages.indexOf(lead.stage) >= index
    );
    return {
      label: stage,
      value: reached.length,
      percent: percent(reached.length, activeLeads.length),
      tone:
        stage === "Admitted"
          ? "bg-emerald-500"
          : stage === "Application"
          ? "bg-orange-500"
          : stage === "Counselling"
          ? "bg-amber-500"
          : "bg-primary",
    };
  });

  const sourceStats = useMemo(() => {
    const map = new Map();
    leads.forEach((lead) => {
      if (!map.has(lead.source)) {
        map.set(lead.source, {
          source: lead.source,
          leads: 0,
          admitted: 0,
          value: 0,
        });
      }
      const entry = map.get(lead.source);
      entry.leads += 1;
      entry.value += lead.value || 0;
      if (lead.stage === "Admitted") entry.admitted += 1;
    });
    return [...map.values()]
      .map((entry) => ({
        ...entry,
        conversion: percent(entry.admitted, entry.leads),
      }))
      .sort((a, b) => b.leads - a.leads);
  }, [leads]);

  const ownerStats = useMemo(() => {
    const owners = [...new Set(leads.map((lead) => lead.owner))];
    return owners
      .map((owner) => {
        const ownerLeads = leads.filter((lead) => lead.owner === owner);
        const ownerAdmitted = ownerLeads.filter((lead) => lead.stage === "Admitted");
        const ownerApplications = applications.filter(
          (app) => app.counsellor === owner
        );
        return {
          owner,
          leads: ownerLeads.length,
          admitted: ownerAdmitted.length,
          applications: ownerApplications.length,
          value: ownerLeads.reduce((sum, lead) => sum + (lead.value || 0), 0),
          conversion: percent(ownerAdmitted.length, ownerLeads.length),
        };
      })
      .sort((a, b) => b.leads - a.leads);
  }, [leads, applications]);

  const courseStats = useMemo(() => {
    const map = new Map();
    leads.forEach((lead) => {
      const course = lead.interest || "Unspecified";
      if (!map.has(course)) {
        map.set(course, { course, count: 0, value: 0, admitted: 0 });
      }
      const entry = map.get(course);
      entry.count += 1;
      entry.value += lead.value || 0;
      if (lead.stage === "Admitted") entry.admitted += 1;
    });
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 6);
  }, [leads]);

  const invoiceStates = ["Paid", "Partial", "Pending", "Overdue"].map((state) => {
    const matching = invoices.filter((invoice) => invoiceStatus(invoice) === state);
    return {
      state,
      count: matching.length,
      amount: matching.reduce((sum, invoice) => sum + invoice.amount, 0),
      balance: matching.reduce((sum, invoice) => sum + (invoice.amount - invoice.paid), 0),
    };
  });

  const exportReport = () => {
    downloadCsv(
      "shiksha-report.csv",
      ownerStats.map((stat) => ({
        Counsellor: stat.owner,
        Leads: stat.leads,
        Applications: stat.applications,
        Admitted: stat.admitted,
        "Conversion %": stat.conversion,
        "Pipeline value": stat.value,
        "Collection rate %": percent(collected, billed),
        "Overall conversion %": conversion,
      }))
    );
    notify("Performance report exported.");
  };

  const maxSource = Math.max(...sourceStats.map((item) => item.leads), 1);

  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Reports & performance"
        description="Understand lead quality, counselling output and fee collection in one place."
        breadcrumb={["Admin", "Insights", "Reports"]}
        actions={
          <>
            <select
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 focus:border-primary focus:outline-none"
            >
              {ranges.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <AdminButton variant="outline" onClick={exportReport}>
              <Download className="h-4 w-4" /> Export report
            </AdminButton>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Lead conversion"
          value={`${conversion}%`}
          helper={`${admitted.length} of ${leads.length} leads admitted`}
          trend="+2.8%"
          icon={Target}
          tone="blue"
        />
        <StatCard
          label="Application win rate"
          value={`${winRate}%`}
          helper={`${enrolled.length} of ${applications.length} applications enrolled`}
          trend="+5.1%"
          icon={TrendingUp}
          tone="violet"
        />
        <StatCard
          label="Fee collection"
          value={formatCompactCurrency(collected)}
          helper={`${percent(collected, billed)}% of ${formatCompactCurrency(billed)} billed`}
          trend="+18.2%"
          icon={IndianRupee}
          tone="emerald"
        />
        <StatCard
          label="Average lead value"
          value={formatCompactCurrency(avgLeadValue)}
          helper={`${activeLeads.length} active opportunities`}
          icon={Users}
          tone="amber"
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Admissions funnel"
          description={`Cumulative lead progression · ${range.toLowerCase()}`}
          action={
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              {activeLeads.length} active leads
            </span>
          }
        >
          <div className="p-5">
            {funnel.map((stage, index) => (
              <div key={stage.label} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[9px] font-bold text-slate-500">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {stage.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    <strong className="text-dark">{stage.value}</strong> leads ·{" "}
                    {stage.percent}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn("h-full rounded-full transition-all", stage.tone)}
                    style={{ width: `${Math.max(4, stage.percent)}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                {lostLeads.length} lost leads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {admitted.length} admissions won
              </span>
              <span className="ml-auto font-semibold text-primary">
                {conversion}% overall conversion
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Revenue summary"
          description="Billed vs collected"
          action={
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
              {percent(collected, billed)}% collected
            </span>
          }
        >
          <div className="p-5">
            <p className="text-3xl font-extrabold tracking-tight text-dark">
              {formatCompactCurrency(collected)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              collected out of {formatCurrency(billed)} billed
            </p>
            <ProgressBar
              value={percent(collected, billed)}
              tone="bg-emerald-500"
              className="mt-4"
            />
            <div className="mt-5 space-y-3">
              {invoiceStates.map((entry) => (
                <div key={entry.state} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={entry.state} />
                    <span className="text-[10px] text-slate-400">
                      {entry.count} invoice{entry.count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-dark">
                    {formatCompactCurrency(entry.state === "Paid" ? entry.amount : entry.balance)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[11px] text-slate-500">
              Outstanding balance <strong className="text-rose-600">{formatCurrency(outstanding)}</strong>{" "}
              across {invoices.filter((invoice) => invoiceStatus(invoice) !== "Paid").length} open
              invoices.
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Lead source performance"
          description="Which channels bring in the best enquiries."
          action={
            <span className="text-[10px] font-semibold text-slate-400">
              {sourceStats.length} active sources
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Leads</th>
                  <th className="px-4 py-3 font-semibold">Admitted</th>
                  <th className="px-4 py-3 font-semibold">Conversion</th>
                  <th className="px-5 py-3 text-right font-semibold">Pipeline value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sourceStats.map((source) => (
                  <tr key={source.source} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <p className="text-xs font-semibold text-dark">{source.source}</p>
                      <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.max(8, (source.leads / maxSource) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                      {source.leads}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{source.admitted}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-[10px] font-bold",
                          source.conversion >= 20
                            ? "bg-emerald-50 text-emerald-700"
                            : source.conversion > 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {source.conversion}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs font-bold text-dark">
                      {formatCompactCurrency(source.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Course demand" description="Most requested programmes.">
          <div className="p-5">
            <MiniBars
              items={courseStats.map((course) => ({
                label: course.course,
                value: course.count,
                tone: "bg-violet-500",
              }))}
              formatValue={(value) => `${value} leads`}
            />
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
              {courseStats.slice(0, 3).map((course) => (
                <div key={course.course} className="flex items-center justify-between gap-2">
                  <span className="truncate">{course.course}</span>
                  <span className="shrink-0 font-semibold text-dark">
                    {course.admitted} admitted · {formatCompactCurrency(course.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <SectionCard
          className="xl:col-span-2"
          title="Counsellor performance"
          description="Lead ownership and admissions outcome by team member."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Counsellor</th>
                  <th className="px-4 py-3 font-semibold">Leads</th>
                  <th className="px-4 py-3 font-semibold">Applications</th>
                  <th className="px-4 py-3 font-semibold">Admitted</th>
                  <th className="px-4 py-3 font-semibold">Conversion</th>
                  <th className="px-5 py-3 text-right font-semibold">Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ownerStats.map((stat) => (
                  <tr key={stat.owner} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={stat.owner} size="sm" />
                        <span className="text-xs font-semibold text-dark">{stat.owner}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{stat.leads}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{stat.applications}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-emerald-600">
                      {stat.admitted}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <ProgressBar
                          value={stat.conversion}
                          tone="bg-primary"
                          className="w-16"
                        />
                        <span className="text-[10px] font-bold text-slate-600">
                          {stat.conversion}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right text-xs font-bold text-dark">
                      {formatCompactCurrency(stat.value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Operational snapshot" description="A quick health check.">
          <div className="divide-y divide-slate-100">
            {[
              {
                label: "Open follow-ups",
                value: tasks.filter((task) => !task.done).length,
                helper: `${tasks.filter((task) => !task.done && task.due <= today).length} due now`,
                icon: Target,
                tone: "bg-blue-50 text-blue-600",
              },
              {
                label: "Active students",
                value: students.filter((student) => student.status === "Active").length,
                helper: `${students.filter((student) => student.status === "Onboarding").length} onboarding`,
                icon: Users,
                tone: "bg-emerald-50 text-emerald-600",
              },
              {
                label: "Applications in progress",
                value: applications.filter(
                  (app) => !["Draft", "Enrolled", "Rejected"].includes(app.stage)
                ).length,
                helper: `${applications.length} total applications`,
                icon: BarChart3,
                tone: "bg-violet-50 text-violet-600",
              },
              {
                label: "Average deal size",
                value: formatCompactCurrency(avgLeadValue),
                helper: "Across active leads",
                icon: IndianRupee,
                tone: "bg-amber-50 text-amber-600",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-5 py-3.5">
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", item.tone)}>
                  <item.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-slate-600">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.helper}</p>
                </div>
                <p className="text-sm font-extrabold text-dark">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 p-4">
            <button
              onClick={exportReport}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
            >
              Download team report <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AdminReports;
