import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  School,
  GraduationCap,
  Bell,
  LogOut,
  Heart,
  Settings,
  ArrowRight,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { courses, exams } from "../data/mockData";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Saved courses", icon: BookOpen },
  { label: "Saved colleges", icon: School },
  { label: "Exam alerts", icon: GraduationCap },
  { label: "Shortlists", icon: Heart },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Saved courses", value: "12", icon: BookOpen, tone: "bg-blue-50 text-blue-600" },
  { label: "Saved colleges", value: "5", icon: School, tone: "bg-emerald-50 text-emerald-600" },
  { label: "Exam alerts", value: "3", icon: CalendarDays, tone: "bg-violet-50 text-violet-600" },
  { label: "Profile views", value: "48", icon: TrendingUp, tone: "bg-amber-50 text-amber-600" },
];

const notifications = [
  {
    id: 1,
    title: "JEE Main registration closes soon",
    text: "The last date to apply is 30 Nov 2026.",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "New B.Tech programme added",
    text: "IIT Delhi has added an AI & Data Science specialisation.",
    time: "1 day ago",
  },
  {
    id: 3,
    title: "DU cut-off released",
    text: "First cut-off list for UG admissions is now available.",
    time: "3 days ago",
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-6.25rem)] bg-slate-50">
      <div className="container-x py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-dark">{user.name}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <nav className="mt-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 hover:bg-slate-50 hover:text-dark"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-2.5 rounded-lg border-t border-slate-100 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="space-y-6 lg:col-span-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-dark">
                  Welcome back, {user.name}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Here is a quick look at your saved items and latest updates.
                </p>
              </div>
              <Link to="/colleges" className="btn-primary w-fit">
                Explore colleges <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.tone}`}
                    >
                      <stat.icon className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-dark">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {/* Recommended courses */}
              <section className="xl:col-span-2">
                <div className="rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-base font-bold text-dark">Recommended courses</h2>
                    <Link
                      to="/courses"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {courses.slice(0, 4).map((course) => (
                      <div key={course.id} className="flex items-center gap-4 p-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-16 w-24 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-dark">
                            {course.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {course.category} · {course.duration} · {course.fee}
                          </p>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="hidden shrink-0 text-xs font-semibold text-primary hover:underline sm:block"
                        >
                          Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Notifications + exam alerts */}
              <section className="space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="flex items-center gap-2 text-base font-bold text-dark">
                      <Bell className="h-4 w-4 text-primary" /> Notifications
                    </h2>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                      {notifications.length}
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    {notifications.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <div>
                          <p className="text-sm font-medium text-dark">{item.title}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{item.text}</p>
                          <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h2 className="flex items-center gap-2 text-base font-bold text-dark">
                    <CalendarDays className="h-4 w-4 text-primary" /> Exam deadlines
                  </h2>
                  <div className="mt-4 space-y-3">
                    {exams.slice(0, 3).map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5"
                      >
                        <div>
                          <p className="text-sm font-semibold text-dark">{exam.name}</p>
                          <p className="text-[11px] text-slate-500">
                            Apply by {exam.applyEnd}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-primary">
                          {exam.examDate}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/exams"
                    className="mt-4 inline-flex text-xs font-semibold text-primary hover:underline"
                  >
                    View exam calendar
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
