import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  GraduationCap,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Colleges", path: "/colleges" },
  { label: "Courses", path: "/courses" },
  { label: "Exams", path: "/exams" },
  { label: "Articles", path: "/articles" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/courses?search=${encodeURIComponent(query.trim())}`);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Utility bar */}
      <div className="bg-dark text-slate-300">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-accent" /> 1800 123 4567
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Mail className="h-3.5 w-3.5 text-accent" /> support@shiksha.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/colleges" className="hidden hover:text-white sm:inline">
              For Colleges
            </Link>
            {user ? (
              <>
                <span className="hidden text-slate-400 sm:inline">
                  Hi, <span className="font-medium text-white">{user.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="rounded-md bg-white/10 px-3 py-1 font-medium text-white transition hover:bg-white/20"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-accent px-3 py-1 font-semibold text-white transition hover:bg-accent-dark"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center gap-6">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-dark">
              Shiksha<span className="text-primary">.com</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={submitSearch}
            className="ml-auto hidden max-w-xs flex-1 items-center md:flex"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges, courses, exams"
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </form>

          <Link
            to="/signup"
            className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark md:inline-flex"
          >
            Free Counselling <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            className="ml-auto rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="container-x space-y-1 py-4">
              <form onSubmit={submitSearch} className="mb-3 md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search colleges, courses, exams"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </div>
              </form>
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-3">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="btn-outline flex-1"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn-outline flex-1"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="btn-primary flex-1"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
