import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Database,
  ExternalLink,
  Globe2,
  Lock,
  Mail,
  RefreshCw,
  Save,
  Server,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useAdminData } from "../context/AdminDataContext";
import { seedSettings } from "../data/seedData";
import {
  AdminButton,
  Avatar,
  FormField,
  PageHeader,
  SectionCard,
  SelectInput,
  TextInput,
  buttonStyles,
} from "../components/AdminUI";
import { cn } from "../lib/utils";

const ToggleRow = ({ title, description, checked, onChange, disabled = false }) => (
  <div className="flex items-start justify-between gap-4 py-4">
    <div>
      <p className="text-xs font-semibold text-dark">{title}</p>
      <p className="mt-0.5 max-w-xl text-[11px] leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition",
          checked ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  </div>
);

const AdminSettings = () => {
  const { admin } = useAdminAuth();
  const { settings, updateSettings, resetDemoData, notify, remote } = useAdminData();
  const [form, setForm] = useState({ ...settings });

  const saveSettings = (event) => {
    event?.preventDefault();
    updateSettings(form);
    notify("Workspace settings saved.");
  };

  const handleReset = () => {
    if (
      !window.confirm(
        remote
          ? "Reload the workspace from Supabase? Local edits that were not saved to the cloud will be discarded."
          : "Reset all demo leads, students, applications, invoices and catalog changes to the original seed data?"
      )
    ) {
      return;
    }
    resetDemoData();
    if (!remote) setForm({ ...seedSettings });
  };

  const integrations = [
    {
      name: "Public website",
      description: "Shiksha.com catalog and content frontend",
      status: "Connected",
      tone: "emerald",
      icon: Globe2,
      action: (
        <Link to="/" className="text-xs font-semibold text-primary hover:underline">
          Open site
        </Link>
      ),
    },
    {
      name: remote ? "Supabase Postgres" : "Admin demo store",
      description: remote
        ? "Cloud database with row-level security policies"
        : "Browser localStorage persistence for this preview",
      status: remote ? "Connected" : "Active",
      tone: remote ? "emerald" : "blue",
      icon: Database,
      action: (
        <span className="text-[10px] font-semibold text-slate-400">
          {remote ? "Postgres + RLS" : "Local only"}
        </span>
      ),
    },
    {
      name: "Supabase Auth",
      description: remote
        ? "Staff accounts, sessions and email/password sign-in"
        : "Multi-user auth activates when env vars are configured",
      status: remote ? "Connected" : "Not configured",
      tone: remote ? "emerald" : "amber",
      icon: Server,
      action: (
        <span
          className={cn(
            "rounded-full px-2 py-1 text-[10px] font-bold",
            remote ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          )}
        >
          {remote ? "Live" : "Next phase"}
        </span>
      ),
    },
    {
      name: "Payment gateway",
      description: "Online fee collection and reconciliation",
      status: "Manual ledger",
      tone: "slate",
      icon: Lock,
      action: (
        <Link
          to="/admin/invoices"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View ledger
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Workspace settings"
        description="Control your organisation profile, admissions preferences and data integrations."
        breadcrumb={["Admin", "Administration", "Settings"]}
        actions={
          <AdminButton onClick={saveSettings}>
            <Save className="h-4 w-4" /> Save changes
          </AdminButton>
        }
      />

      <div className="grid gap-5 xl:grid-cols-3">
        <form onSubmit={saveSettings} className="space-y-5 xl:col-span-2">
          <SectionCard
            title="Organisation profile"
            description="Used on invoices, emails and student communication."
          >
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <FormField label="Organisation name" className="sm:col-span-2">
                <TextInput
                  value={form.organisation}
                  onChange={(event) =>
                    setForm({ ...form, organisation: event.target.value })
                  }
                />
              </FormField>
              <FormField label="Support email">
                <TextInput
                  type="email"
                  value={form.supportEmail}
                  onChange={(event) =>
                    setForm({ ...form, supportEmail: event.target.value })
                  }
                />
              </FormField>
              <FormField label="Support phone">
                <TextInput
                  value={form.supportPhone}
                  onChange={(event) =>
                    setForm({ ...form, supportPhone: event.target.value })
                  }
                />
              </FormField>
              <FormField label="Academic session">
                <TextInput
                  value={form.academicSession}
                  onChange={(event) =>
                    setForm({ ...form, academicSession: event.target.value })
                  }
                />
              </FormField>
              <FormField
                label="Lead response SLA"
                hint="Target time to first contact after an enquiry."
              >
                <SelectInput
                  value={form.leadSlaHours}
                  onChange={(event) =>
                    setForm({ ...form, leadSlaHours: event.target.value })
                  }
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="24">24 hours</option>
                </SelectInput>
              </FormField>
            </div>
          </SectionCard>

          <SectionCard
            title="Admissions & CRM preferences"
            description="Defaults that shape how enquiries are handled."
          >
            <div className="divide-y divide-slate-100 px-5">
              <ToggleRow
                title="Auto-assign new leads"
                description="Route unassigned enquiries to the counsellor with the lightest active pipeline."
                checked={form.autoAssignLeads}
                onChange={(value) => setForm({ ...form, autoAssignLeads: value })}
              />
              <ToggleRow
                title="Duplicate lead detection"
                description="Warn the team when a phone number or email already exists in CRM."
                checked={form.duplicateCheck}
                onChange={(value) => setForm({ ...form, duplicateCheck: value })}
              />
              <ToggleRow
                title="Email alerts"
                description="Notify owners when a high-priority lead, overdue task or payment arrives."
                checked={form.emailAlerts}
                onChange={(value) => setForm({ ...form, emailAlerts: value })}
              />
              <ToggleRow
                title="Daily digest"
                description="Send a morning summary of follow-ups, applications and collections."
                checked={form.dailyDigest}
                onChange={(value) => setForm({ ...form, dailyDigest: value })}
              />
            </div>
          </SectionCard>

          <div className="flex justify-end">
            <AdminButton type="submit">
              <Save className="h-4 w-4" /> Save workspace settings
            </AdminButton>
          </div>
        </form>

        <aside className="space-y-5">
          <SectionCard title="Your account">
            <div className="p-5">
              <div className="flex items-center gap-3">
                <Avatar name={admin?.name || "Admin"} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-dark">{admin?.name}</p>
                  <p className="truncate text-xs text-slate-500">{admin?.email}</p>
                  <span className="mt-1 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-primary ring-1 ring-blue-100">
                    {admin?.role}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-[11px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <UserRound className="h-3.5 w-3.5" /> Profile
                  </span>
                  <span className="font-semibold text-dark">
                    {remote ? "Supabase user" : "Demo session"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="h-3.5 w-3.5" /> Access
                  </span>
                  <span className="font-semibold text-dark">Full workspace</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Lock className="h-3.5 w-3.5" /> Authentication
                  </span>
                  <span className={cn("font-semibold", remote ? "text-emerald-600" : "text-amber-600")}>
                    {remote ? "Supabase Auth" : "Prototype login"}
                  </span>
                </div>
              </div>
              <Link
                to="/admin/users"
                className={buttonStyles("outline", "sm", "mt-4 w-full")}
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Manage team & roles
              </Link>
            </div>
          </SectionCard>

          <SectionCard title="Session" description="Current workspace health.">
            <div className="divide-y divide-slate-100">
              {[
                {
                  icon: CheckCircle2,
                  label: "Admin route protection",
                  value: "Active",
                  tone: "text-emerald-600",
                },
                {
                  icon: Database,
                  label: "Data persistence",
                  value: remote ? "Supabase Postgres" : "Browser store",
                  tone: remote ? "text-emerald-600" : "text-blue-600",
                },
                {
                  icon: Server,
                  label: "Backend",
                  value: remote ? "Supabase" : "Demo mode",
                  tone: remote ? "text-emerald-600" : "text-amber-600",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 px-5 py-3.5">
                  <item.icon className={cn("h-4 w-4", item.tone)} />
                  <span className="flex-1 text-[11px] text-slate-500">{item.label}</span>
                  <span className={cn("text-[10px] font-bold", item.tone)}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <div
            className={cn(
              "rounded-xl border p-4",
              remote ? "border-emerald-100 bg-emerald-50/60" : "border-blue-100 bg-blue-50/60"
            )}
          >
            <p className="flex items-center gap-1.5 text-xs font-bold text-dark">
              <ShieldCheck
                className={cn("h-4 w-4", remote ? "text-emerald-600" : "text-primary")}
              />{" "}
              {remote ? "Cloud workspace" : "Demo data notice"}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
              {remote
                ? "This workspace is connected to Supabase. Data is stored in Postgres with row-level security, and every change is written through to the cloud."
                : "This admin panel is a fully interactive product preview. Records live in your browser and are not shared across devices yet. Supabase Auth, Postgres and RLS are the recommended next step for a production rollout."}
            </p>
          </div>
        </aside>
      </div>

      <SectionCard
        className="mt-5"
        title="Integrations"
        description="Connections that power the current workspace."
      >
        <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {integrations.map((item) => (
            <div key={item.name} className="flex items-center gap-3 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <item.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-dark">{item.name}</p>
                <p className="truncate text-[10px] text-slate-400">{item.description}</p>
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold",
                    item.tone === "emerald" && "bg-emerald-50 text-emerald-700",
                    item.tone === "blue" && "bg-blue-50 text-blue-700",
                    item.tone === "amber" && "bg-amber-50 text-amber-700",
                    item.tone === "slate" && "bg-slate-100 text-slate-600"
                  )}
                >
                  {item.status}
                </span>
                <div className="mt-1">{item.action}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="mt-5 rounded-xl border border-rose-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold text-dark">
              <RefreshCw className="h-4 w-4 text-rose-500" />{" "}
              {remote ? "Reload cloud workspace" : "Reset demo workspace"}
            </h2>
            <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-slate-500">
              {remote
                ? "Re-read every table from Supabase. Cloud records are never deleted from the browser."
                : "Restore every lead, student, application, invoice, catalog record and setting to the original seed. This only affects this browser."}
            </p>
          </div>
          <AdminButton variant="danger" onClick={handleReset} className="shrink-0">
            <RefreshCw className="h-4 w-4" /> {remote ? "Reload data" : "Reset data"}
          </AdminButton>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> {form.organisation} · Academic session{" "}
          {form.academicSession}
        </span>
        <span className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" /> {form.supportEmail}
        </span>
        <Link to="/" className="flex items-center gap-1 font-semibold text-primary hover:underline">
          Public site <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default AdminSettings;
