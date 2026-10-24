import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  GraduationCap,
  Info,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  Newspaper,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trophy,
  UserCog,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useAdminData } from "../context/AdminDataContext";
import { Avatar, buttonStyles } from "./AdminUI";
import { cn } from "../lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "CRM",
    items: [
      { label: "Leads", to: "/admin/leads", icon: Users, badge: "18" },
      { label: "Pipeline", to: "/admin/pipeline", icon: LayoutGrid },
      { label: "Tasks", to: "/admin/tasks", icon: CheckSquare, badge: "7" },
    ],
  },
  {
    label: "Admissions",
    items: [
      { label: "Students", to: "/admin/students", icon: GraduationCap },
      { label: "Applications", to: "/admin/applications", icon: ClipboardList },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Colleges", to: "/admin/colleges", icon: Building2 },
      { label: "Courses", to: "/admin/courses", icon: BookOpen },
      { label: "Exams", to: "/admin/exams", icon: Trophy },
    ],
  },
  {
    label: "Finance",
    items: [{ label: "Invoices & payments", to: "/admin/invoices", icon: Wallet }],
  },
  {
    label: "Content",
    items: [{ label: "Content & moderation", to: "/admin/content", icon: Newspaper }],
  },
  {
    label: "Insights",
    items: [{ label: "Reports", to: "/admin/reports", icon: BarChart3 }],
  },
  {
    label: "Administration",
    items: [
      { label: "Team & roles", to: "/admin/users", icon: UserCog },
      { label: "Settings", to: "/admin/settings", icon: Settings },
    ],
  },
];

const notifications = [
  {
    id: 1,
    title: "High-priority lead assigned",
    text: "Ananya Sharma is waiting for a fee-structure call.",
    time: "8 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Application documents pending",
    text: "Meera Joshi has 2 documents left for verification.",
    time: "32 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Payment received",
    text: "₹1,50,000 recorded against INV-4002.",
    time: "1 hour ago",
    unread: false,
  },
];

const AdminLayout = () => {
  const { admin, logout, authLoading } = useAdminAuth();
  const { toast, tasks, remote } = useAdminData();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setMobileOpen(false);
    setMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!menu) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menu]);

  const openTasks = tasks.filter((task) => !task.done).length;

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">Loading workspace…</p>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const submitSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/admin/leads?search=${encodeURIComponent(value)}`);
    setQuery("");
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-[#0B1220] text-slate-300">
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-blue-950/50">
          <GraduationCap className="h-5 w-5 text-white" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold tracking-tight text-white">
            Shiksha <span className="text-accent">Admin</span>
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            ERP & CRM suite
          </p>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {group.label}
            </p>
            <div className="mt-1.5 space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute -left-3 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-accent" />
                      )}
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive ? "text-blue-300" : "text-slate-500 group-hover:text-slate-300"
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-white/5 text-slate-400"
                          )}
                        >
                          {item.label === "Tasks" ? openTasks : item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-3">
        <Link
          to="/"
          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[10px] font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
          title={
            remote
              ? "Cloud workspace backed by Supabase"
              : "All demo data is saved in this browser"
          }
        >
          <span className="inline-flex items-center gap-1.5">
            <ExternalLink className="h-3 w-3" /> Public site
          </span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
            {remote ? "Cloud" : "Demo"}
          </span>
        </Link>
        <div className="mt-1 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <Avatar name={admin.name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{admin.name}</p>
            <p className="truncate text-[10px] text-slate-500">{admin.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-rose-300"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[264px] lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute inset-y-0 left-0 w-[280px] shadow-2xl">{sidebar}</div>
        </div>
      )}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-40 flex h-[72px] items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {remote ? "Supabase workspace" : "Demo workspace"}
            </span>
            <span className="hidden text-[10px] text-slate-400 xl:inline">
              {remote ? "Cloud data · Postgres + RLS" : "Data saved in this browser"}
            </span>
          </div>

          <form
            onSubmit={submitSearch}
            className="ml-auto hidden w-full max-w-xs items-center md:flex"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search leads, students…"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-12 text-xs text-slate-700 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-bold text-slate-400 sm:block">
                ⏎
              </span>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1.5 md:ml-3">
            <Link
              to="/admin/leads?new=1"
              className={buttonStyles("primary", "sm", "hidden sm:inline-flex")}
            >
              <Plus className="h-3.5 w-3.5" /> New lead
            </Link>

            <div className="relative">
              <button
                onClick={() => setMenu(menu === "notifications" ? null : "notifications")}
                className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-dark"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              {menu === "notifications" && (
                <>
                  <button
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setMenu(null)}
                    aria-label="Close notifications"
                  />
                  <div className="absolute right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-dark">Notifications</p>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        2 new
                      </span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {notifications.map((item) => (
                        <div key={item.id} className="flex gap-3 px-4 py-3">
                          <span
                            className={cn(
                              "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                              item.unread ? "bg-primary" : "bg-slate-300"
                            )}
                          />
                          <div>
                            <p className="text-xs font-semibold text-dark">{item.title}</p>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                              {item.text}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-400">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/admin/tasks"
                      className="block border-t border-slate-100 px-4 py-2.5 text-center text-xs font-semibold text-primary hover:bg-slate-50"
                    >
                      View all follow-ups
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setMenu(menu === "profile" ? null : "profile")}
                className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100"
              >
                <Avatar name={admin.name} size="sm" />
                <div className="hidden text-left xl:block">
                  <p className="text-xs font-semibold text-dark">{admin.name}</p>
                  <p className="text-[10px] text-slate-500">{admin.role}</p>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 xl:block" />
              </button>
              {menu === "profile" && (
                <>
                  <button
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setMenu(null)}
                    aria-label="Close profile menu"
                  />
                  <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-dark">{admin.name}</p>
                      <p className="truncate text-xs text-slate-500">{admin.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        to="/admin/settings"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Settings className="h-4 w-4" /> Workspace settings
                      </Link>
                      <Link
                        to="/admin/users"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <ShieldCheck className="h-4 w-4" /> Team & permissions
                      </Link>
                      <Link
                        to="/"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <ExternalLink className="h-4 w-4" /> Public website
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="h-4 w-4" /> Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[120] flex max-w-sm items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              toast.type === "info"
                ? "bg-blue-50 text-blue-600"
                : toast.type === "error"
                ? "bg-rose-50 text-rose-600"
                : "bg-emerald-50 text-emerald-600"
            )}
          >
            {toast.type === "info" ? (
              <Info className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
          </span>
          <p className="pt-1 text-xs font-medium leading-relaxed text-slate-700">
            {toast.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
