import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { demoAdmin, useAdminAuth } from "../context/AdminAuthContext";
import { AdminButton, FormField, TextInput } from "../components/AdminUI";

const highlights = [
  "Lead-to-admission pipeline in one view",
  "Applications, documents and fee collection",
  "Role-based access for every team",
];

const AdminLogin = () => {
  const { admin, login, demoLogin, authLoading, supabaseReady } = useAdminAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">Checking your session…</p>
      </div>
    );
  }

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(form.email, form.password);
    if (result?.ok) {
      navigate("/admin/dashboard");
    } else {
      setError(result?.error || "Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  const enterDemo = async () => {
    const result = await demoLogin();
    if (result?.ok) {
      navigate("/admin/dashboard");
    } else {
      setError(result?.error || "Demo access is unavailable.");
    }
  };

  const fillDemo = () => {
    setForm({ email: demoAdmin.email, password: demoAdmin.password });
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[#0B1220] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-blue-950/50">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="text-lg font-extrabold tracking-tight">
                Shiksha <span className="text-accent">Admin</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                ERP & CRM suite
              </p>
            </div>
          </Link>

          <div className="mt-20 max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-blue-200">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> One workspace for the
              entire student journey
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight xl:text-5xl">
              Run admissions
              <br />
              like a modern
              <br />
              <span className="text-blue-400">SaaS team.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Capture leads, counsel students, process applications, manage fees and
              publish catalog content — without switching between tools.
            </p>

            <div className="mt-8 space-y-3">
              {highlights.map((item) => (
                <p key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-14 grid max-w-lg grid-cols-3 gap-3">
          {[
            { icon: Users, value: "18", label: "Active leads" },
            { icon: BarChart3, value: "₹16.2L", label: "Fees collected" },
            { icon: ShieldCheck, value: "6", label: "Team roles" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <stat.icon className="h-4 w-4 text-blue-300" />
              <p className="mt-2 text-xl font-extrabold text-white">{stat.value}</p>
              <p className="mt-0.5 text-[10px] text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-screen flex-col p-4 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to website
          </Link>
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {supabaseReady ? "Cloud workspace" : "Demo workspace"}
          </span>
        </div>

        <div className="mx-auto my-auto w-full max-w-md py-10">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-dark">
                Shiksha <span className="text-accent">Admin</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                ERP & CRM suite
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-dark">
              Sign in to your workspace
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              {supabaseReady
                ? "Sign in with your Supabase staff account to open the live workspace."
                : "Use the demo account below to explore the complete admin experience."}
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <FormField label="Work email" required>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <TextInput
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    placeholder="you@shiksha.com"
                    className="pl-9"
                    autoComplete="email"
                  />
                </div>
              </FormField>

              <FormField label="Password" required>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <TextInput
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) =>
                      setForm({ ...form, password: event.target.value })
                    }
                    placeholder="Enter your password"
                    className="pl-9 pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormField>

              {error && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                  {error}
                </p>
              )}

              <AdminButton type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign in to dashboard"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </AdminButton>
            </form>

            {supabaseReady ? (
              <div className="mt-5 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4">
                <p className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Supabase
                  connected
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  Auth and Postgres are live for this workspace. Accounts are managed in
                  your Supabase project (Authentication → Users).
                </p>
              </div>
            ) : (
              <>
                <div className="my-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Demo access
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/60 p-4">
                  <p className="text-xs font-bold text-slate-700">Demo credentials</p>
                  <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-600">
                    <p>admin@shiksha.com</p>
                    <p>admin123</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <AdminButton type="button" variant="outline" size="sm" onClick={fillDemo}>
                      Fill credentials
                    </AdminButton>
                    <AdminButton type="button" variant="amber" size="sm" onClick={enterDemo}>
                      Open demo dashboard <ArrowRight className="h-3.5 w-3.5" />
                    </AdminButton>
                  </div>
                </div>
              </>
            )}
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5" />{" "}
            {supabaseReady
              ? "Protected by Supabase Auth and row-level security."
              : "Protected demo workspace. No real student data is used."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
