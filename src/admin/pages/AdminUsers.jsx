import { useMemo, useState } from "react";
import {
  Download,
  Mail,
  Plus,
  ShieldCheck,
  UserCheck,
  UserCog,
  Users,
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
  StatCard,
  StatusBadge,
  TextInput,
} from "../components/AdminUI";
import { adminRoles, cn, downloadCsv } from "../lib/utils";

const emptyUser = {
  name: "",
  email: "",
  phone: "",
  role: "Counsellor",
};

const roleTones = {
  "Super Admin": "bg-blue-50 text-blue-700 ring-blue-200",
  "Senior Counsellor": "bg-violet-50 text-violet-700 ring-violet-200",
  Counsellor: "bg-sky-50 text-sky-700 ring-sky-200",
  "Admissions Officer": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Finance Officer": "bg-amber-50 text-amber-700 ring-amber-200",
  "Content Editor": "bg-rose-50 text-rose-700 ring-rose-200",
  Viewer: "bg-slate-100 text-slate-600 ring-slate-200",
};

const permissions = [
  { role: "Super Admin", crm: true, admissions: true, finance: true, content: true, admin: true },
  { role: "Senior Counsellor", crm: true, admissions: true, finance: false, content: false, admin: false },
  { role: "Counsellor", crm: true, admissions: true, finance: false, content: false, admin: false },
  { role: "Admissions Officer", crm: true, admissions: true, finance: false, content: false, admin: false },
  { role: "Finance Officer", crm: false, admissions: false, finance: true, content: false, admin: false },
  { role: "Content Editor", crm: false, admissions: false, finance: false, content: true, admin: false },
  { role: "Viewer", crm: true, admissions: true, finance: true, content: true, admin: false },
];

const AdminUsers = () => {
  const { users, leads, tasks, addUser, updateUser, notify } = useAdminData();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyUser);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users.filter(
      (user) =>
        (!term ||
          [user.name, user.email, user.role, user.phone]
            .join(" ")
            .toLowerCase()
            .includes(term)) &&
        (role === "All" || user.role === role)
    );
  }, [users, search, role]);

  const openTasks = tasks.filter((task) => !task.done);

  const submitUser = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      notify("Name and work email are required.", "error");
      return;
    }
    addUser(form);
    setForm(emptyUser);
    setModalOpen(false);
  };

  const toggleUser = (user) => {
    const next = user.status === "Active" ? "Inactive" : "Active";
    updateUser(user.id, { status: next });
    notify(`${user.name} is now ${next.toLowerCase()}.`);
  };

  const exportTeam = () => {
    downloadCsv(
      "shiksha-team.csv",
      filtered.map((user) => ({
        "Team member": user.name,
        Email: user.email,
        Phone: user.phone,
        Role: user.role,
        Status: user.status,
        "Last active": user.lastActive,
        "Assigned leads": leads.filter((lead) => lead.owner === user.name).length,
        "Open tasks": tasks.filter((task) => task.owner === user.name && !task.done).length,
      }))
    );
    notify("Team directory exported.");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Team & roles"
        description="Invite teammates, assign responsibilities and control access to each workspace."
        breadcrumb={["Admin", "Administration", "Team & roles"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportTeam}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Invite member
            </AdminButton>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Team members"
          value={users.length}
          helper="Across all roles"
          icon={Users}
          tone="blue"
        />
        <StatCard
          label="Active accounts"
          value={users.filter((user) => user.status === "Active").length}
          helper="Can access the panel"
          icon={UserCheck}
          tone="emerald"
        />
        <StatCard
          label="Open tasks"
          value={openTasks.length}
          helper="Assigned across the team"
          icon={UserCog}
          tone="amber"
        />
        <StatCard
          label="Admin roles"
          value={adminRoles.length}
          helper="Role-based permissions"
          icon={ShieldCheck}
          tone="violet"
        />
      </div>

      <SectionCard className="mt-5">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search by name, email or role…"
            className="w-full sm:max-w-sm"
          />
          <SelectInput
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="!w-auto py-2 text-xs sm:ml-auto"
          >
            <option value="All">All roles</option>
            {adminRoles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </SelectInput>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No team members match this filter"
            description="Try another role or search term."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Team member</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Assigned leads</th>
                  <th className="px-4 py-3 font-semibold">Open tasks</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Last active</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((user) => {
                  const assigned = leads.filter((lead) => lead.owner === user.name).length;
                  const userTasks = tasks.filter(
                    (task) => task.owner === user.name && !task.done
                  ).length;
                  return (
                    <tr key={user.id} className="transition hover:bg-slate-50/70">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={user.name} size="md" />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-dark">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-slate-400">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="flex max-w-[210px] items-center gap-1 truncate text-[11px] text-slate-600">
                          <Mail className="h-3 w-3 shrink-0 text-slate-400" />
                          <span className="truncate">{user.email}</span>
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">{user.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ring-1",
                            roleTones[user.role] || roleTones.Viewer
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                        {assigned}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "rounded-md px-2 py-1 text-[10px] font-bold",
                            userTasks > 2
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-500"
                          )}
                        >
                          {userTasks}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={user.status} dot />
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{user.lastActive}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => toggleUser(user)}
                          disabled={user.role === "Super Admin"}
                          className={cn(
                            "rounded-md px-2.5 py-1.5 text-[10px] font-bold transition disabled:cursor-not-allowed disabled:opacity-40",
                            user.status === "Active"
                              ? "bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          )}
                        >
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500">
          Showing <strong className="text-dark">{filtered.length}</strong> of {users.length} team
          members · Super Admin access cannot be deactivated in this demo.
        </div>
      </SectionCard>

      <SectionCard
        className="mt-5"
        title="Role permissions"
        description="A simple view of who can access each workspace area."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 text-center font-semibold">CRM</th>
                <th className="px-4 py-3 text-center font-semibold">Admissions</th>
                <th className="px-4 py-3 text-center font-semibold">Finance</th>
                <th className="px-4 py-3 text-center font-semibold">Content</th>
                <th className="px-5 py-3 text-center font-semibold">Administration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((row) => (
                <tr key={row.role} className="transition hover:bg-slate-50/70">
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ring-1",
                        roleTones[row.role] || roleTones.Viewer
                      )}
                    >
                      {row.role}
                    </span>
                  </td>
                  {[row.crm, row.admissions, row.finance, row.content, row.admin].map(
                    (allowed, index) => (
                      <td key={index} className="px-4 py-3 text-center">
                        {allowed ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-300">
                            —
                          </span>
                        )}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Invite a team member"
        description="Send a workspace invitation and assign a role."
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitUser}>Send invite</AdminButton>
          </>
        }
      >
        <form onSubmit={submitUser} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full name" required>
            <TextInput
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="e.g. Neha Kapoor"
              required
            />
          </FormField>
          <FormField label="Work email" required>
            <TextInput
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="name@shiksha.com"
              required
            />
          </FormField>
          <FormField label="Phone">
            <TextInput
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="+91 98xxx xxxxx"
            />
          </FormField>
          <FormField label="Role">
            <SelectInput
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value })}
            >
              {adminRoles.filter((item) => item !== "Super Admin").map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </FormField>
        </form>
      </Modal>
    </div>
  );
};

export default AdminUsers;
