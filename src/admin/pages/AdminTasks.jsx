import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  IndianRupee,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  ListChecks,
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
  cn,
  counsellorNames,
  downloadCsv,
  formatDate,
  todayISO,
} from "../lib/utils";

const typeIcons = {
  Call: Phone,
  Email: Mail,
  WhatsApp: MessageSquare,
  Document: FileText,
  Payment: IndianRupee,
  Meeting: CalendarDays,
  Application: ListChecks,
};

const taskTabs = ["All open", "Today", "Overdue", "Completed"];

const emptyTask = {
  title: "",
  leadId: "",
  due: todayISO(),
  priority: "Medium",
  type: "Call",
  owner: "Aarav Mehta",
};

const AdminTasks = () => {
  const { tasks, leads, addTask, toggleTask, notify } = useAdminData();
  const [tab, setTab] = useState("All open");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyTask);

  const today = todayISO();
  const openTasks = tasks.filter((task) => !task.done);
  const dueToday = openTasks.filter((task) => task.due === today);
  const overdue = openTasks.filter((task) => task.due < today);
  const completed = tasks.filter((task) => task.done);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks
      .filter((task) => {
        if (tab === "Today") return !task.done && task.due === today;
        if (tab === "Overdue") return !task.done && task.due < today;
        if (tab === "Completed") return task.done;
        return !task.done;
      })
      .filter(
        (task) =>
          !term ||
          [task.title, task.leadName, task.owner, task.type]
            .join(" ")
            .toLowerCase()
            .includes(term)
      )
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return new Date(a.due) - new Date(b.due);
      });
  }, [tasks, tab, search, today]);

  const submitTask = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      notify("Add a task title.", "error");
      return;
    }
    const lead = leads.find((item) => item.id === form.leadId);
    addTask({
      ...form,
      leadName: lead?.name || "General task",
    });
    setModalOpen(false);
    setForm(emptyTask);
  };

  const exportTasks = () => {
    downloadCsv(
      "shiksha-tasks.csv",
      filtered.map((task) => ({
        "Task ID": task.id,
        Task: task.title,
        Lead: task.leadName,
        Owner: task.owner,
        Due: task.due,
        Priority: task.priority,
        Type: task.type,
        Status: task.done ? "Completed" : "Open",
      }))
    );
    notify(`Exported ${filtered.length} tasks.`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="CRM"
        title="Tasks & follow-ups"
        description="Keep every student conversation on time and on track."
        breadcrumb={["Admin", "CRM", "Tasks"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportTasks}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add task
            </AdminButton>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Open tasks",
            value: openTasks.length,
            helper: "Across the team",
            icon: ListChecks,
            tone: "bg-blue-50 text-blue-600",
          },
          {
            label: "Due today",
            value: dueToday.length,
            helper: "Needs attention",
            icon: CalendarDays,
            tone: "bg-amber-50 text-amber-600",
          },
          {
            label: "Overdue",
            value: overdue.length,
            helper: "Escalate if needed",
            icon: MessageSquare,
            tone: "bg-rose-50 text-rose-600",
          },
          {
            label: "Completed",
            value: completed.length,
            helper: "This cycle",
            icon: CheckCircle2,
            tone: "bg-emerald-50 text-emerald-600",
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

      <SectionCard>
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center">
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {taskTabs.map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition",
                  tab === item
                    ? "bg-primary text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-dark"
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search tasks…"
            className="w-full lg:ml-auto lg:max-w-xs"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title={tab === "Completed" ? "No completed tasks yet" : "You are all caught up"}
            description={
              tab === "Completed"
                ? "Completed follow-ups will appear here."
                : "There are no tasks matching this view."
            }
            action={
              <AdminButton variant="outline" onClick={() => setModalOpen(true)}>
                <Plus className="h-4 w-4" /> Add a task
              </AdminButton>
            }
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((task) => {
              const Icon = typeIcons[task.type] || MessageSquare;
              const isOverdue = !task.done && task.due < today;
              return (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-3 px-5 py-4 transition hover:bg-slate-50/70",
                    task.done && "opacity-60"
                  )}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition",
                      task.done
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 text-transparent hover:border-primary hover:text-primary"
                    )}
                    aria-label={task.done ? "Mark task incomplete" : "Mark task complete"}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      isOverdue ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p
                          className={cn(
                            "text-sm font-semibold text-dark",
                            task.done && "line-through"
                          )}
                        >
                          {task.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-500">
                            {task.type}
                          </span>
                          {task.leadId ? (
                            <Link
                              to={`/admin/leads/${task.leadId}`}
                              className="font-semibold text-primary hover:underline"
                            >
                              {task.leadName}
                            </Link>
                          ) : (
                            <span>{task.leadName}</span>
                          )}
                          <span>·</span>
                          <span className={cn(isOverdue && "font-bold text-rose-600")}>
                            Due {formatDate(task.due)}
                          </span>
                          {isOverdue && (
                            <span className="rounded-full bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">
                              Overdue
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={task.priority} />
                        <div className="flex items-center gap-1.5">
                          <Avatar name={task.owner} size="sm" />
                          <span className="hidden text-[10px] text-slate-400 sm:inline">
                            {task.owner.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500">
          <span>
            Showing <strong className="text-dark">{filtered.length}</strong> tasks
          </span>
          <Link to="/admin/pipeline" className="font-semibold text-primary hover:underline">
            View pipeline
          </Link>
        </div>
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add a follow-up task"
        description="Create a reminder and link it to a lead."
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitTask}>Save task</AdminButton>
          </>
        }
      >
        <form onSubmit={submitTask} className="space-y-4">
          <FormField label="Task title" required>
            <TextInput
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="e.g. Call the student with the fee structure"
              required
            />
          </FormField>
          <FormField label="Related lead">
            <SelectInput
              value={form.leadId}
              onChange={(event) => setForm({ ...form, leadId: event.target.value })}
            >
              <option value="">No linked lead</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} · {lead.id}
                </option>
              ))}
            </SelectInput>
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Due date">
              <TextInput
                type="date"
                value={form.due}
                onChange={(event) => setForm({ ...form, due: event.target.value })}
              />
            </FormField>
            <FormField label="Priority">
              <SelectInput
                value={form.priority}
                onChange={(event) => setForm({ ...form, priority: event.target.value })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </SelectInput>
            </FormField>
            <FormField label="Type">
              <SelectInput
                value={form.type}
                onChange={(event) => setForm({ ...form, type: event.target.value })}
              >
                {Object.keys(typeIcons).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectInput>
            </FormField>
            <FormField label="Owner">
              <SelectInput
                value={form.owner}
                onChange={(event) => setForm({ ...form, owner: event.target.value })}
              >
                {counsellorNames.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectInput>
            </FormField>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTasks;
