import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Download,
  GripVertical,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  Avatar,
  PageHeader,
  SearchField,
  SelectInput,
  buttonStyles,
} from "../components/AdminUI";
import {
  cn,
  counsellorNames,
  downloadCsv,
  formatCompactCurrency,
  formatDate,
  leadStages,
  percent,
  todayISO,
} from "../lib/utils";

const stageAccent = {
  New: "bg-sky-500",
  Contacted: "bg-indigo-500",
  Qualified: "bg-violet-500",
  Counselling: "bg-amber-500",
  Application: "bg-orange-500",
  Admitted: "bg-emerald-500",
  Lost: "bg-rose-400",
};

const AdminPipeline = () => {
  const { leads, updateLead, notify } = useAdminData();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [owner, setOwner] = useState("All");
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const columns = [...leadStages, "Lost"];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesTerm =
        !term ||
        [lead.name, lead.interest, lead.college, lead.source, lead.id]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesTerm && (owner === "All" || lead.owner === owner);
    });
  }, [leads, search, owner]);

  const activeLeads = filtered.filter((lead) => lead.stage !== "Lost");
  const pipelineValue = activeLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  const followUps = activeLeads.filter(
    (lead) => lead.nextFollowUp && lead.nextFollowUp <= todayISO()
  ).length;

  const dropLead = (stage) => {
    const id = dragging;
    setDragOver(null);
    setDragging(null);
    if (!id) return;
    const lead = leads.find((item) => item.id === id);
    if (!lead || lead.stage === stage) return;
    updateLead(id, {
      stage,
      lostReason: stage === "Lost" ? "Marked lost in pipeline" : "",
      nextFollowUp: stage === "Admitted" ? "" : lead.nextFollowUp,
    });
    notify(`${lead.name} moved to ${stage}.`);
  };

  const exportPipeline = () => {
    downloadCsv(
      "shiksha-pipeline.csv",
      filtered.map((lead) => ({
        "Lead ID": lead.id,
        Name: lead.name,
        Course: lead.interest,
        College: lead.college,
        Stage: lead.stage,
        Owner: lead.owner,
        Source: lead.source,
        Value: lead.value,
        Score: lead.score,
        "Follow-up": lead.nextFollowUp,
      }))
    );
    notify("Pipeline exported as CSV.");
  };

  return (
    <div>
      <PageHeader
        eyebrow="CRM"
        title="Admissions pipeline"
        description="Drag leads across stages and keep every counselling conversation moving."
        breadcrumb={["Admin", "CRM", "Pipeline"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportPipeline}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <Link to="/admin/leads?new=1" className={buttonStyles("primary")}>
              <Plus className="h-4 w-4" /> New lead
            </Link>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active leads",
            value: activeLeads.length,
            helper: `${percent(activeLeads.length, filtered.length)}% of visible leads`,
            icon: Users,
            tone: "text-blue-600 bg-blue-50",
          },
          {
            label: "Pipeline value",
            value: formatCompactCurrency(pipelineValue),
            helper: "Potential fee value",
            icon: Sparkles,
            tone: "text-violet-600 bg-violet-50",
          },
          {
            label: "Follow-ups due",
            value: followUps,
            helper: "Today or overdue",
            icon: CalendarDays,
            tone: "text-amber-600 bg-amber-50",
          },
          {
            label: "Admissions won",
            value: filtered.filter((lead) => lead.stage === "Admitted").length,
            helper: "Closed this cycle",
            icon: ArrowRight,
            tone: "text-emerald-600 bg-emerald-50",
          },
        ].map((stat) => (
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

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search pipeline by name, course or college…"
          className="w-full sm:max-w-sm"
        />
        <SelectInput
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          className="!w-auto min-w-[160px] py-2 text-xs sm:ml-auto"
        >
          <option value="All">All counsellors</option>
          {counsellorNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </SelectInput>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
          <GripVertical className="h-3.5 w-3.5" /> Drag to move stage
        </span>
      </div>

      <div className="overflow-x-auto pb-3 [scrollbar-width:thin]">
        <div className="flex min-w-max gap-3">
          {columns.map((stage) => {
            const stageLeads = filtered.filter((lead) => lead.stage === stage);
            const value = stageLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
            return (
              <div
                key={stage}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(stage);
                }}
                onDragLeave={() => setDragOver((current) => (current === stage ? null : current))}
                onDrop={(event) => {
                  event.preventDefault();
                  dropLead(stage);
                }}
                className={cn(
                  "w-[286px] shrink-0 rounded-xl border bg-slate-100/70 p-2.5 transition",
                  dragOver === stage
                    ? "border-primary/50 bg-blue-50/80 ring-2 ring-primary/10"
                    : "border-slate-200"
                )}
              >
                <div className="mb-2 rounded-lg bg-white px-3 py-2.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", stageAccent[stage])} />
                    <p className="text-xs font-bold text-dark">{stage}</p>
                    <span className="ml-auto rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {formatCompactCurrency(value)} potential
                  </p>
                </div>

                <div className="space-y-2">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", lead.id);
                        event.dataTransfer.effectAllowed = "move";
                        setDragging(lead.id);
                      }}
                      onDragEnd={() => {
                        setDragging(null);
                        setDragOver(null);
                      }}
                      onClick={() => {
                        if (!dragging) navigate(`/admin/leads/${lead.id}`);
                      }}
                      className={cn(
                        "group cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:border-primary/30 hover:shadow-md active:cursor-grabbing",
                        dragging === lead.id && "opacity-50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-2">
                          <Avatar name={lead.name} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-dark group-hover:text-primary">
                              {lead.name}
                            </p>
                            <p className="truncate text-[10px] text-slate-400">{lead.id}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "mt-1 h-2 w-2 shrink-0 rounded-full",
                            lead.temperature === "Hot"
                              ? "bg-rose-500"
                              : lead.temperature === "Warm"
                              ? "bg-amber-400"
                              : "bg-sky-400"
                          )}
                          title={lead.temperature}
                        />
                      </div>

                      <p className="mt-2.5 truncate text-[11px] font-medium text-slate-600">
                        {lead.interest || "Course not selected"}
                      </p>
                      <p className="truncate text-[10px] text-slate-400">
                        {lead.college || "College not selected"}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                        <span className="font-bold text-dark">
                          {formatCompactCurrency(lead.value)}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-1",
                            lead.nextFollowUp && lead.nextFollowUp < todayISO()
                              ? "font-semibold text-rose-600"
                              : "text-slate-400"
                          )}
                        >
                          <CalendarDays className="h-3 w-3" />
                          {lead.nextFollowUp
                            ? formatDate(lead.nextFollowUp, { year: undefined })
                            : "No follow-up"}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="rounded bg-slate-50 px-1.5 py-0.5 text-[9px] font-medium text-slate-500">
                          {lead.source}
                        </span>
                        <div className="flex items-center gap-1">
                          <Avatar name={lead.owner} size="sm" className="h-5 w-5 text-[8px]" />
                          <span className="max-w-[70px] truncate text-[9px] text-slate-400">
                            {lead.owner.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-300 text-center text-[10px] text-slate-400">
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-2 text-[10px] text-slate-400">
        Tip: open a lead from the pipeline to see the full activity timeline, notes and
        linked application.
      </p>
    </div>
  );
};

export default AdminPipeline;
