import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const benefits = [
  "Shortlist and compare colleges in one place",
  "Track application deadlines for every exam",
  "Free counselling from verified education experts",
];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
      }
      login({
        name: formData.email.split("@")[0],
        email: formData.email,
      });
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-6.25rem)] bg-slate-50">
      <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        {/* Left panel */}
        <div className="hidden lg:block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-blue-600 p-10 text-white">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight">
              Welcome back to Shiksha
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-blue-100">
              Log in to save colleges, compare courses and keep track of every
              admission deadline.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-300" />
                  <span className="text-blue-50">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xs text-blue-200">
              Trusted by over 1 million students every year.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-dark">
              Log in to your account
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              New here?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create a free account
              </Link>
            </p>

            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input-field pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" /> Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" /> Show
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input-field pl-10"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Log in"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-400">
              Demo login: use any email and password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
