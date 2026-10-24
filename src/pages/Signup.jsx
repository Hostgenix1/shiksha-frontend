import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const benefits = [
  "Save and compare colleges side by side",
  "Get personalised course recommendations",
  "Receive exam and admission deadline alerts",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login({ name: formData.name, email: formData.email });
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-6.25rem)] bg-slate-50">
      <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        {/* Left panel */}
        <div className="hidden lg:block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark via-slate-900 to-primary-dark p-10 text-white">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight">
              Your admission journey starts here
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
              Create a free account to plan your studies with confidence — no fees, no
              spam.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <span className="text-slate-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-dark">
              Create your free account
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Already registered?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>

            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="input-field pl-10"
                    placeholder="Your full name"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="input-field pl-10"
                    placeholder="Re-enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
