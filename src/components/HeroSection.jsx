import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Building2,
  BookOpen,
  CalendarDays,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

const tabs = [
  { key: "colleges", label: "Colleges", icon: Building2, placeholder: "Search by college name, city or stream" },
  { key: "courses", label: "Courses", icon: BookOpen, placeholder: "Search courses like B.Tech, MBA, MBBS" },
  { key: "exams", label: "Exams", icon: CalendarDays, placeholder: "Search exams like JEE Main, NEET, CAT" },
];

const popular = ["B.Tech", "MBBS", "MBA", "Law", "Design", "Commerce"];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("colleges");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const active = tabs.find((tab) => tab.key === activeTab);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (activeTab === "colleges") {
      navigate(q ? `/colleges?search=${encodeURIComponent(q)}` : "/colleges");
    } else if (activeTab === "courses") {
      navigate(q ? `/courses?search=${encodeURIComponent(q)}` : "/courses");
    } else {
      navigate(q ? `/exams?search=${encodeURIComponent(q)}` : "/exams");
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-20">
        {/* Copy + search */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Admissions open for 2027 intake
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-dark sm:text-5xl">
            Find the right college.
            <br />
            Build the <span className="text-primary">right future.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Compare 5,000+ colleges, explore 50,000+ courses and track every entrance
            exam — with expert counselling at no cost.
          </p>

          {/* Search card */}
          <div className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/60">
            <div className="flex gap-1 border-b border-slate-100 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    activeTab === tab.key
                      ? "bg-primary/10 text-primary"
                      : "text-slate-500 hover:bg-slate-50 hover:text-dark"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="mt-3 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={active.placeholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Popular searches */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-500">Popular:</span>
            {popular.map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/courses?search=${encodeURIComponent(item)}`)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-slate-300/50">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=75"
              alt="Students on a college campus"
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Trusted by students
                  </p>
                  <p className="mt-1 text-lg font-bold text-dark">1M+ students guided</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.8
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-8 top-10 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Users className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-dark">5,000+</p>
              <p className="text-xs text-slate-500">Colleges listed</p>
            </div>
          </div>

          <div className="absolute -right-4 bottom-24 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-primary">
              <TrendingUp className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-dark">50,000+</p>
              <p className="text-xs text-slate-500">Courses to explore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
