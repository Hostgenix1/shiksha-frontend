import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  MessageSquare,
  Heart,
  Download,
  List,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Clock,
  Users,
  IndianRupee,
  CheckCircle2,
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
  Building2,
  Award,
  TrendingUp,
  CalendarDays,
  BookOpen,
  FileText,
  Library,
  Dumbbell,
  FlaskConical,
  Utensils,
  HeartPulse,
  Wifi,
  Presentation,
  Quote,
  Send,
  User,
  Trophy,
  Layers,
  Percent,
} from "lucide-react";
import { colleges, exams } from "../data/mockData";
import { getCollegeDetail } from "../data/collegeDetails";
import { useAuth } from "../context/AuthContext";

const facilityIcons = {
  library: Library,
  hostel: Building2,
  sports: Dumbbell,
  lab: FlaskConical,
  cafeteria: Utensils,
  medical: HeartPulse,
  wifi: Wifi,
  auditorium: Presentation,
};

const SectionTitle = ({ eyebrow, title, description, action }) => (
  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-xl font-extrabold tracking-tight text-dark sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-1.5 max-w-3xl text-sm text-slate-500">{description}</p>
      )}
    </div>
    {action}
  </div>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <label className="relative flex w-full min-w-0 flex-col gap-0.5 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:w-auto sm:min-w-[150px]">
    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none truncate bg-transparent pr-5 text-xs font-semibold text-dark focus:outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute bottom-2.5 right-2.5 h-3.5 w-3.5 text-slate-400" />
  </label>
);

const Accordion = ({ title, items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-dark">
          <MessageSquare className="h-4 w-4 text-primary" /> {title}
        </h3>
      </div>
      {items.map((item, index) => (
        <div key={item.q} className="border-b border-slate-100 last:border-0">
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
          >
            <span className="text-sm font-medium text-dark">
              <span className="mr-1 font-bold text-primary">Q:</span> {item.q}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-400 transition ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const ProgrammeCard = ({ programme, selected, onCompare, onDownload }) => (
  <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md">
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-sm font-bold leading-snug text-dark">
        {programme.title}
      </h3>
      <div className="flex shrink-0 flex-col items-end gap-1">
        {programme.nirfRank && (
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
            #{programme.nirfRank} NIRF
          </span>
        )}
        {programme.rating && (
          <span className="flex items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {programme.rating}.0
          </span>
        )}
      </div>
    </div>

    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" /> {programme.duration}
      </span>
      <span className="flex items-center gap-1">
        <Users className="h-3.5 w-3.5" /> {programme.seats} seats
      </span>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Exams accepted
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {programme.exams.map((exam) => (
            <span
              key={exam}
              className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"
            >
              {exam}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Seats offered
        </p>
        <p className="mt-1 text-sm font-bold text-dark">{programme.seats}</p>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Median salary
        </p>
        <p className="mt-1 text-sm font-semibold text-dark">
          {programme.medianSalary}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Total tuition fees
        </p>
        <p className="mt-1 flex items-center gap-0.5 text-sm font-bold text-dark">
          {programme.totalFees}
        </p>
      </div>
    </div>

    <div className="mt-auto grid grid-cols-2 gap-2 pt-4 sm:grid-cols-[1.5fr_1fr_1fr]">
      <a
        href="#fees"
        className="col-span-2 inline-flex items-center justify-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark sm:col-span-1"
      >
        Get Fee Details
      </a>
      <button
        onClick={onCompare}
        className={`inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
          selected
            ? "border-primary bg-primary/10 text-primary"
            : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
        }`}
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        {selected ? "Selected" : "Compare"}
      </button>
      <button
        onClick={onDownload}
        className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
      >
        <Download className="h-3.5 w-3.5" /> Brochure
      </button>
    </div>
  </article>
);

const RecommendedCard = ({ item, onDownload }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md">
    <img
      src={item.image}
      alt={item.name}
      className="h-32 w-full shrink-0 bg-slate-100 object-cover"
    />
    <div className="flex flex-1 flex-col p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-snug text-dark">{item.name}</h3>
        {item.rating && (
          <span className="flex shrink-0 items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {item.rating}
          </span>
        )}
      </div>
      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5" /> {item.location}
      </p>
      {item.ranking && (
        <span className="mt-2 inline-block w-fit rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
          {item.ranking}
        </span>
      )}
      <div className="mt-auto pt-3">
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span className="text-slate-500">{item.courses}</span>
          <span className="font-bold text-dark">{item.fees}</span>
        </div>
        <button
          onClick={onDownload}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
        >
          <Download className="h-3.5 w-3.5" /> Brochure
        </button>
      </div>
    </div>
  </div>
);

const ForumItem = ({ item }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5">
    <p className="text-sm font-bold text-dark">{item.question}</p>
    <div className="mt-3 flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {item.author?.charAt(0) || "S"}
      </span>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-dark">{item.author}</p>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
            {item.level}
          </span>
          <span className="text-[10px] text-slate-400">{item.time}</span>
        </div>
        {item.answer ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {item.answer}
          </p>
        ) : (
          <p className="mt-2 text-sm italic text-slate-400">
            Awaiting an answer from our experts.
          </p>
        )}
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
    <Building2 className="h-12 w-12 text-slate-300" />
    <h1 className="mt-4 text-2xl font-bold text-dark">College not found</h1>
    <p className="mt-2 text-sm text-slate-500">
      The page you are looking for may have moved or no longer exists.
    </p>
    <Link to="/colleges" className="btn-primary mt-6">
      Browse all colleges
    </Link>
  </div>
);

const CollegeDetailContent = ({ college }) => {
  const { user } = useAuth();
  const detail = useMemo(() => getCollegeDetail(college), [college]);

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("College Info");
  const [tocOpen, setTocOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [examFilter, setExamFilter] = useState("All");
  const [specFilter, setSpecFilter] = useState("All");
  const [streamFilter, setStreamFilter] = useState("All");
  const [feeFilter, setFeeFilter] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [showAllSeats, setShowAllSeats] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [pageRating, setPageRating] = useState(0);
  const [question, setQuestion] = useState("");
  const [newQuestions, setNewQuestions] = useState([]);

  const specializations = useMemo(
    () => ["All", ...new Set(detail.programmes.map((p) => p.specialization))],
    [detail]
  );
  const examOptions = useMemo(
    () => ["All", ...new Set(detail.programmes.flatMap((p) => p.exams))],
    [detail]
  );
  const streams = useMemo(
    () => ["All", ...new Set(detail.programmes.map((p) => p.stream))],
    [detail]
  );
  const feeOptions = ["All", "Under ₹5 L", "₹5 L – ₹10 L", "Above ₹10 L"];

  const filteredProgrammes = useMemo(() => {
    return detail.programmes.filter((programme) => {
      const q = query.trim().toLowerCase();
      if (q && !programme.title.toLowerCase().includes(q)) return false;
      if (examFilter !== "All" && !programme.exams.includes(examFilter)) return false;
      if (specFilter !== "All" && programme.specialization !== specFilter) return false;
      if (streamFilter !== "All" && programme.stream !== streamFilter) return false;
      if (feeFilter === "Under ₹5 L" && programme.feeInLakh >= 5) return false;
      if (
        feeFilter === "₹5 L – ₹10 L" &&
        (programme.feeInLakh < 5 || programme.feeInLakh > 10)
      ) {
        return false;
      }
      if (feeFilter === "Above ₹10 L" && programme.feeInLakh <= 10) return false;
      return true;
    });
  }, [detail, query, examFilter, specFilter, streamFilter, feeFilter]);

  const clearFilters = () => {
    setQuery("");
    setExamFilter("All");
    setSpecFilter("All");
    setStreamFilter("All");
    setFeeFilter("All");
  };

  const toggleCompare = (id) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const downloadBrochure = (heading, rows) => {
    const content = [
      heading,
      "=".repeat(Math.min(heading.length, 60)),
      "",
      ...rows.map(([label, value]) => `${label}: ${value}`),
      "",
      "Generated from Shiksha.com",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const downloadCollegeBrochure = () =>
    downloadBrochure(detail.pageTitle, [
      ["College", college.name],
      ["Location", college.location],
      ["Type", college.type],
      ["Established", college.established],
      ["Total tuition fees", detail.totalTuition],
      ["Accepted exams", detail.acceptedExams.join(", ")],
      ["Rating", `${college.rating} / 5`],
      ["Programmes", detail.programmes.length],
    ]);

  const downloadProgrammeBrochure = (programme) =>
    downloadBrochure(programme.title, [
      ["College", college.name],
      ["Duration", programme.duration],
      ["Seats", programme.seats],
      ["Exams accepted", programme.exams.join(", ")],
      ["Total tuition fees", programme.totalFees],
      ["Median salary", programme.medianSalary],
    ]);

  const tabs = [
    { label: "College Info", href: "overview" },
    { label: "Courses", href: "courses" },
    { label: "Fees", href: "fees" },
    { label: "Reviews", href: "reviews" },
    { label: "Admissions", href: "admissions" },
    { label: "Placements", href: "placements" },
    { label: "Cut-Offs", href: "cutoffs" },
    { label: "Rankings", href: "rankings" },
    { label: "Gallery", href: "gallery" },
    { label: "Infrastructure", href: "infrastructure" },
    { label: "Faculty", href: "faculty" },
    { label: "Compare", href: "compare" },
    { label: "Q&A", href: "qna" },
    { label: "Scholarships", href: "scholarships" },
    { label: detail.primaryExam, href: "jee-advanced" },
  ];

  const tocItems = [
    {
      label: `${college.shortName} ${detail.courseGroup} Highlights ${detail.year}`,
      href: "highlights",
    },
    { label: "Popular courses", href: "courses" },
    { label: "Seats", href: "seats" },
    ...(detail.onlineCourses.length
      ? [{ label: "Online courses", href: "online-courses" }]
      : []),
    { label: "Comparison with similar colleges", href: "compare" },
  ];

  const visibleSeats = showAllSeats
    ? detail.programmes
    : detail.programmes.slice(0, 5);
  const visibleRecommended = showAllRecommended
    ? detail.recommended
    : detail.recommended.slice(0, 8);
  const visibleTrending = showAllTrending
    ? detail.trending
    : detail.trending.slice(0, 8);
  const forumItems = [...newQuestions, ...detail.forum];
  const linkedExam = exams.find((item) => item.name === detail.examInfo.name);
  const examDetailsTo = linkedExam
    ? `/exams/${linkedExam.slug}`
    : `/exams?search=${encodeURIComponent(detail.examInfo.name)}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb + header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-x py-5">
          <nav className="flex items-center gap-1.5 overflow-hidden text-xs text-slate-500">
            <Link to="/" className="shrink-0 hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link to="/colleges" className="shrink-0 hover:text-primary">
              Colleges in {college.location.split(",")[0]}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to={`/colleges/${college.id}`}
              className="shrink-0 hover:text-primary"
            >
              {college.shortName}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-medium text-dark">
              {detail.courseGroup}
            </span>
          </nav>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                  {detail.courseGroup}
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                  NIRF #{college.nirfRank}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                  {college.type}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-dark sm:text-3xl">
                {detail.pageTitle}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" /> {college.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-dark">{college.rating}</span>
                  ({college.reviews} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-slate-400" /> Est.{" "}
                  {college.established}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-slate-400" />{" "}
                  {detail.programmes.length} programmes
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                  saved
                    ? "border-primary bg-primary text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
                }`}
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-white" : ""}`} />
                {saved ? "Saved" : "Save"}
              </button>
              <button
                onClick={downloadCollegeBrochure}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:text-sm"
              >
                <Download className="h-4 w-4" /> Brochure
              </button>
              <button
                onClick={() => scrollTo("courses")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:text-sm"
              >
                <List className="h-4 w-4" /> Course List
              </button>
              <button
                onClick={() => scrollTo("qna")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:text-sm"
              >
                <MessageSquare className="h-4 w-4" /> Ask
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky section nav */}
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-x">
          <div className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {tabs.map((tab) => (
              <a
                key={tab.label}
                href={`#${tab.href}`}
                onClick={() => setActiveTab(tab.label)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold transition ${
                  activeTab === tab.label
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-dark"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x space-y-12 py-8">
        {/* Overview */}
        <section id="overview" className="scroll-mt-36">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <SectionTitle
                  eyebrow="College info"
                  title={`${college.shortName} Overview`}
                />
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-bold text-dark">
                      <List className="h-4 w-4 text-primary" /> Table of contents
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition ${
                        tocOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {tocOpen && (
                    <div className="mt-3 grid gap-1.5 border-t border-slate-100 pt-3 sm:grid-cols-2">
                      {tocItems.map((item) => (
                        <a
                          key={item.href}
                          href={`#${item.href}`}
                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary"
                        >
                          <ChevronRight className="h-3.5 w-3.5 text-primary" />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                id="highlights"
                className="scroll-mt-36 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <SectionTitle
                  eyebrow="Highlights"
                  title={`${college.shortName} ${detail.courseGroup} Highlights ${detail.year}`}
                />
                <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                  {detail.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <Award className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Return on investment
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-dark">
                      {detail.totalTuition}
                    </p>
                    <p className="text-[11px] text-slate-500">Total tuition fees</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Eligibility criteria
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700">
                      {detail.eligibility}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <FileText className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Accepted exam
                    </p>
                    <p className="mt-1 text-sm font-bold text-dark">
                      {detail.primaryExam}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {detail.scoreRequirement}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {detail.acceptedExams.map((exam) => (
                    <span
                      key={exam}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-primary"
                    >
                      {exam}
                    </span>
                  ))}
                </div>

                <Accordion
                  title="Commonly asked questions on highlights"
                  items={detail.highlightFaqs}
                />
              </div>
            </div>

            <aside>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  src={college.image}
                  alt={college.name}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Total tuition fees
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-2xl font-extrabold text-dark">
                    <IndianRupee className="h-5 w-5" />
                    {detail.totalTuition.replace("₹", "")}
                  </p>

                  <dl className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-500">Rating</dt>
                      <dd className="flex items-center gap-1 font-semibold text-dark">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {college.rating} / 5
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-500">Established</dt>
                      <dd className="font-semibold text-dark">
                        {college.established}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-500">Type</dt>
                      <dd className="font-semibold text-dark">{college.type}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-500">Programmes</dt>
                      <dd className="font-semibold text-dark">
                        {detail.programmes.length}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <dt className="text-slate-500">Exams</dt>
                      <dd className="text-right font-semibold text-dark">
                        {detail.acceptedExams.slice(0, 3).join(", ")}
                      </dd>
                    </div>
                  </dl>

                  <Link to="/signup" className="btn-primary mt-4 w-full">
                    Apply now <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={downloadCollegeBrochure}
                    className="btn-outline mt-2 w-full"
                  >
                    <Download className="h-4 w-4" /> Download brochure
                  </button>
                  <a
                    href="#fees"
                    className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View fee structure <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-dark">Need help deciding?</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Speak to a counsellor who can compare this college with your other
                  shortlisted options.
                </p>
                <Link
                  to="/signup"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Book a free call <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Fees */}
        <section id="fees" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Fees"
            title={`${college.shortName} ${detail.courseGroup} Fees`}
            description="Indicative fee structure for the 2026-27 academic year. Confirm the latest figures with the institute before paying."
            action={
              <button
                onClick={() =>
                  downloadBrochure(`${detail.pageTitle} - Fee structure`, [
                    ...detail.fees.map((fee) => [fee.label, fee.value]),
                    ["Note", "Fees are indicative and subject to change."],
                  ])
                }
                className="btn-outline w-fit"
              >
                <Download className="h-4 w-4" /> Fee structure
              </button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.fees.map((fee) => (
              <div
                key={fee.label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <p className="text-xs font-medium text-slate-500">{fee.label}</p>
                <p className="mt-2 text-lg font-extrabold text-dark">{fee.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <FileText className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Fees are indicative. Hostel, mess and examination charges may vary by
              programme. Scholarships and fee waivers are available for eligible
              candidates.
            </p>
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Courses"
            title={`${college.shortName} ${detail.courseGroup} Popular courses`}
            description="Explore specialisations, seat intake, accepted exams, median salary and total tuition fees."
          />

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search for specialisations in ${detail.courseGroup}`}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-dark"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <X className="h-4 w-4" /> Clear
                </button>
              </div>

              <div className="hidden flex-wrap gap-2 lg:flex">
                <FilterSelect
                  label="Specialization"
                  value={specFilter}
                  onChange={setSpecFilter}
                  options={specializations}
                />
                <FilterSelect
                  label="Exams Accepted"
                  value={examFilter}
                  onChange={setExamFilter}
                  options={examOptions}
                />
                <FilterSelect
                  label="Total Fees"
                  value={feeFilter}
                  onChange={setFeeFilter}
                  options={feeOptions}
                />
                <FilterSelect
                  label="Streams"
                  value={streamFilter}
                  onChange={setStreamFilter}
                  options={streams}
                />
              </div>
            </div>

            {filtersOpen && (
              <div className="mt-3 grid grid-cols-2 gap-2 lg:hidden">
                <FilterSelect
                  label="Specialization"
                  value={specFilter}
                  onChange={setSpecFilter}
                  options={specializations}
                />
                <FilterSelect
                  label="Exams Accepted"
                  value={examFilter}
                  onChange={setExamFilter}
                  options={examOptions}
                />
                <FilterSelect
                  label="Total Fees"
                  value={feeFilter}
                  onChange={setFeeFilter}
                  options={feeOptions}
                />
                <FilterSelect
                  label="Streams"
                  value={streamFilter}
                  onChange={setStreamFilter}
                  options={streams}
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-600">
              Showing{" "}
              <span className="font-bold text-dark">
                {filteredProgrammes.length}
              </span>{" "}
              of {detail.programmes.length} courses
            </p>
            {compareIds.length > 0 && (
              <p className="text-xs font-semibold text-primary">
                {compareIds.length} course{compareIds.length > 1 ? "s" : ""} selected
                for comparison
              </p>
            )}
          </div>

          {filteredProgrammes.length === 0 ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white py-16 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-3 text-lg font-bold text-dark">No courses found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try a different search or clear the filters.
              </p>
              <button onClick={clearFilters} className="btn-primary mt-5">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              {filteredProgrammes.map((programme) => (
                <ProgrammeCard
                  key={programme.id}
                  programme={programme}
                  selected={compareIds.includes(programme.id)}
                  onCompare={() => toggleCompare(programme.id)}
                  onDownload={() => downloadProgrammeBrochure(programme)}
                />
              ))}
            </div>
          )}

          <Accordion
            title="Commonly asked questions on all courses"
            items={[
              {
                q: "What is the seat intake for these programmes?",
                a: `The total intake across the listed programmes is ${detail.seatsTotal} seats. Seat distribution varies by specialisation and category.`,
              },
              {
                q: `How are admissions handled at ${college.shortName}?`,
                a: `Admissions are based on the accepted entrance exams (${detail.acceptedExams.join(
                  ", "
                )}), followed by counselling and document verification.`,
              },
              {
                q: "Are scholarships available?",
                a: "Yes. Merit-cum-means, category-based and institute scholarships are available. Eligibility and amounts vary by programme.",
              },
            ]}
          />
        </section>

        {/* Admissions */}
        <section id="admissions" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Admissions"
            title={`${college.shortName} Admissions`}
            description="A step-by-step view of the admission process, eligibility and key entrance exam details."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-dark">Admission process</h3>
              <div className="mt-4 space-y-4">
                {detail.admissionSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      {index < detail.admissionSteps.length - 1 && (
                        <span className="mt-1 h-full w-px bg-slate-200" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-bold text-dark">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-dark">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Eligibility
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {detail.eligibility}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {detail.acceptedExams.map((exam) => (
                    <span
                      key={exam}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-primary"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              <div
                id="jee-advanced"
                className="scroll-mt-36 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-base font-bold text-dark">
                    <Trophy className="h-5 w-5 text-primary" /> {detail.examInfo.name}
                  </h3>
                  <Link
                    to={examDetailsTo}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Exam details
                  </Link>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {detail.examInfo.description}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Exam date
                    </p>
                    <p className="mt-1 text-xs font-bold text-dark">
                      {detail.examInfo.date}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Application window
                    </p>
                    <p className="mt-1 text-xs font-bold text-dark">
                      {detail.examInfo.applicationWindow}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Mode
                    </p>
                    <p className="mt-1 text-xs font-bold text-dark">
                      {detail.examInfo.mode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placements */}
        <section id="placements" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Placements"
            title={`${college.shortName} Placements`}
            description="Placement statistics reported by the institute for the latest available year."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.placements.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="mt-2 text-xl font-extrabold text-dark">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Top recruiters
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.placements.recruiters.map((recruiter) => (
                <span
                  key={recruiter}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {recruiter}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Cut-offs */}
        <section id="cutoffs" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Cut-offs"
            title={`${college.shortName} Cut-Offs`}
            description={detail.cutoffs.title}
          />
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {detail.cutoffs.columns.map((column) => (
                    <th key={column} className="px-5 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detail.cutoffs.rows.map((row) => (
                  <tr key={row[0]} className="hover:bg-slate-50">
                    {row.map((cell, index) => (
                      <td
                        key={index}
                        className={`px-5 py-3 ${
                          index === 0 ? "font-semibold text-dark" : "text-slate-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Cut-offs are indicative and vary by category, programme and year. Verify
            the latest data on the official counselling portal.
          </p>
        </section>

        {/* Rankings */}
        <section id="rankings" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Rankings"
            title={`${college.shortName} Rankings`}
            description="Rankings and recognitions from national and international agencies."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.rankings.map((ranking) => (
              <div
                key={`${ranking.agency}-${ranking.category}`}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <Award className="h-4 w-4 text-primary" />
                <p className="mt-2 text-xl font-extrabold text-dark">
                  {ranking.rank}
                </p>
                <p className="mt-1 text-xs font-semibold text-dark">
                  {ranking.category}
                </p>
                <p className="text-[11px] text-slate-500">
                  {ranking.agency} · {ranking.year}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Reviews"
            title={`${college.shortName} Student Reviews`}
            description="Experiences shared by current students and recent alumni."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {detail.reviews.map((review) => (
              <div
                key={review.name}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
              >
                <Quote className="h-6 w-6 text-primary/30" />
                <h3 className="mt-2 text-sm font-bold text-dark">{review.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {review.text}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {review.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-dark">{review.name}</p>
                      <p className="text-[10px] text-slate-400">{review.date}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-0.5 rounded bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {review.rating}.0
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Gallery"
            title={`${college.shortName} Campus`}
            description="A glimpse of the campus, classrooms and student life."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {detail.gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <img
                  src={image}
                  alt={`${college.shortName} campus ${index + 1}`}
                  className="h-36 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure */}
        <section id="infrastructure" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Infrastructure"
            title={`${college.shortName} Infrastructure`}
            description="Facilities available to students on campus."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {detail.facilities.map((facility) => {
              const Icon = facilityIcons[facility.icon] || Building2;
              return (
                <div
                  key={facility.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-dark">
                    {facility.name}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Faculty"
            title={`${college.shortName} Faculty`}
            description="Academics and industry experts who teach at the institute."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.faculty.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {member.name
                    .replace(/^(Prof\.|Dr\.|Ms\.|Mr\.)\s*/, "")
                    .charAt(0)}
                </span>
                <p className="mt-3 text-sm font-bold text-dark">{member.name}</p>
                <p className="text-xs font-medium text-primary">
                  {member.designation}
                </p>
                <p className="mt-1 text-xs text-slate-500">{member.department}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarships */}
        <section id="scholarships" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Scholarships"
            title={`${college.shortName} Scholarships`}
            description="Financial support options for eligible students."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {detail.scholarships.map((scholarship) => (
              <div
                key={scholarship.name}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <Percent className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-sm font-bold text-dark">
                  {scholarship.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {scholarship.amount}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {scholarship.eligibility}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended colleges */}
        <section className="scroll-mt-36">
          <SectionTitle
            eyebrow="Recommended colleges"
            title="Explore popular similar colleges"
            description={`Students who showed interest in ${college.shortName} also showed interest in these colleges.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleRecommended.map((item) => (
              <RecommendedCard
                key={item.id}
                item={item}
                onDownload={() =>
                  downloadBrochure(item.name, [
                    ["Location", item.location],
                    ["Courses", item.courses],
                    ["Total fees", item.fees],
                    ...(item.rating ? [["Rating", `${item.rating} / 5`]] : []),
                  ])
                }
              />
            ))}
          </div>
          {detail.recommended.length > 8 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAllRecommended(!showAllRecommended)}
                className="btn-outline"
              >
                {showAllRecommended
                  ? "Show fewer colleges"
                  : `View all ${detail.recommended.length} recommendations`}
              </button>
            </div>
          )}
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-dark">
                Want better recommendations?
              </p>
              <p className="mt-1 text-sm text-slate-500">
                There is a 90% better chance of getting the best college
                recommendations by sharing your preferences.
              </p>
            </div>
            <Link to="/signup" className="btn-primary shrink-0">
              <PlusCircleIcon /> Add preferences
            </Link>
          </div>
        </section>

        {/* Free counselling CTA */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 px-6 py-9 text-white sm:px-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  <MessageSquare className="h-4 w-4" /> Free counselling
                </span>
                <h2 className="mt-3 text-xl font-extrabold leading-tight sm:text-2xl">
                  Confused about which college or exam to opt for?
                </h2>
                <p className="mt-1.5 text-sm text-blue-100">
                  Chat with our counsellor and get a personalised list of colleges
                  and exams matching your preferences.
                </p>
              </div>
              <Link
                to="/signup"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-blue-50"
              >
                Get free counselling <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Seats */}
        <section id="seats" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Seats"
            title={`${college.shortName} ${detail.courseGroup} Seats`}
          />
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-extrabold text-dark">
                    {detail.seatsTotal}
                  </p>
                  <p className="text-xs text-slate-500">Total seats available</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Seat intake across {detail.programmes.length} programmes
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Course</th>
                    <th className="px-5 py-3 text-right font-semibold">Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleSeats.map((programme) => (
                    <tr key={programme.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-slate-700">
                        {programme.title}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-dark">
                        {programme.seats}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {detail.programmes.length > 5 && (
              <div className="border-t border-slate-100 p-3 text-center">
                <button
                  onClick={() => setShowAllSeats(!showAllSeats)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  {showAllSeats ? "Show less" : "View more"}
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      showAllSeats ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Online courses */}
        {detail.onlineCourses.length > 0 && (
          <section id="online-courses" className="scroll-mt-36">
            <SectionTitle
              eyebrow="Online learning"
              title={`Top online ${detail.courseGroup} courses`}
              description="Flexible online programmes from leading institutes."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {detail.onlineCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:gap-5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="h-7 w-7" />
                  </span>
                  <div className="mt-3 min-w-0 flex-1 sm:mt-0">
                    <p className="text-sm font-bold text-dark">{course.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {course.provider}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span>{course.degree}</span>
                      <span>Total fees: {course.fees}</span>
                      <span>Duration: {course.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      downloadBrochure(course.title, [
                        ["Provider", course.provider],
                        ["Degree", course.degree],
                        ["Total fees", course.fees],
                        ["Duration", course.duration],
                      ])
                    }
                    className="mt-3 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:mt-0"
                  >
                    <Download className="h-3.5 w-3.5" /> Brochure
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/courses" className="btn-outline">
                View all courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Comparison */}
        <section id="compare" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Compare"
            title={`Compare ${detail.courseGroup} at ${college.shortName}`}
            description="See how this college compares with similar institutions on fees, salary and ranking."
          />
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">College</th>
                  <th className="px-5 py-3 font-semibold">Median salary</th>
                  <th className="px-5 py-3 font-semibold">Total tuition fees</th>
                  <th className="px-5 py-3 font-semibold">Ranking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detail.comparison.map((row, index) => (
                  <tr
                    key={row.name}
                    className={index === 0 ? "bg-primary/5" : "hover:bg-slate-50"}
                  >
                    <td className="px-5 py-3 font-semibold text-dark">
                      {row.name}
                    </td>
                    <td className="px-5 py-3 text-slate-600">{row.medianSalary}</td>
                    <td className="px-5 py-3 text-slate-600">{row.fees}</td>
                    <td className="px-5 py-3 text-slate-600">{row.ranking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-outline mt-4">
            <Layers className="h-4 w-4" /> View detailed comparison
          </button>
        </section>

        {/* Explore other courses */}
        <section>
          <SectionTitle
            eyebrow="Explore"
            title={`Explore other courses at ${college.shortName}`}
          />
          <div className="flex flex-wrap gap-2">
            {detail.otherCourses.map((course) => (
              <Link
                key={course}
                to="/courses"
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
              >
                {course}
              </Link>
            ))}
            <Link
              to="/courses"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
            >
              View all courses <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Q&A */}
        <section id="qna" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Q&A"
            title={`${college.shortName} Student Forum`}
            description="Ask questions and read answers from students, alumni and education experts."
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!question.trim()) return;
              setNewQuestions([
                {
                  id: `new-${Date.now()}`,
                  question: question.trim(),
                  author: user?.name || "Guest",
                  level: user ? "Student" : "Guest",
                  time: "Just now",
                  answer: null,
                },
                ...newQuestions,
              ]);
              setQuestion("");
            }}
            className="mb-5 flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row"
          >
            <div className="relative flex-1">
              <MessageSquare className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Anything you would want to ask experts?"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm placeholder-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0">
              <Send className="h-4 w-4" /> Post question
            </button>
          </form>

          <div className="space-y-4">
            {forumItems.map((item) => (
              <ForumItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Page rating */}
        <section>
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-dark">
                Your opinion matters to us!
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Rate your experience using this page so far.
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setPageRating(rating)}
                  aria-label={`Rate ${rating} out of 5`}
                  className="rounded p-1 transition hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating <= pageRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              {pageRating > 0 && (
                <span className="ml-2 text-xs font-semibold text-emerald-600">
                  Thanks for rating!
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Trending private colleges */}
        {detail.trending.length > 0 && (
          <section>
            <SectionTitle
              eyebrow="Trending"
              title="Explore popular private colleges"
              description={`Students looking for ${detail.courseGroup} courses have shown interest in these colleges.`}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleTrending.map((item) => (
                <RecommendedCard
                  key={item.id}
                  item={item}
                  onDownload={() =>
                    downloadBrochure(item.name, [
                      ["Location", item.location],
                      ["Courses", item.courses],
                      ["Total fees", item.fees],
                      ...(item.rating
                        ? [["Rating", `${item.rating} / 5`]]
                        : []),
                    ])
                  }
                />
              ))}
            </div>
            {detail.trending.length > 8 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllTrending(!showAllTrending)}
                  className="btn-outline"
                >
                  {showAllTrending
                    ? "Show fewer colleges"
                    : `View all ${detail.trending.length} colleges`}
                </button>
              </div>
            )}
          </section>
        )}

        {/* Author + bottom breadcrumb */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 sm:items-center">
            <User className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 sm:mt-0" />
            <span>
              Content authored by{" "}
              <span className="font-semibold text-dark">{detail.author}</span> ·
              Updated on {detail.updated}
            </span>
          </p>
          <nav className="flex flex-wrap items-center gap-1.5">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/colleges" className="hover:text-primary">
              Colleges in {college.location.split(",")[0]}
            </Link>
            <span>/</span>
            <Link
              to={`/colleges/${college.id}`}
              className="hover:text-primary"
            >
              {college.shortName}
            </Link>
            <span>/</span>
            <span className="font-medium text-dark">{detail.courseGroup}</span>
          </nav>
        </div>
      </div>

      {/* Floating compare bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-4 w-4" />
          </span>
          <p className="min-w-0 flex-1 text-xs font-semibold text-dark">
            {compareIds.length} course{compareIds.length > 1 ? "s" : ""} selected
          </p>
          <a
            href="#compare"
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
          >
            Compare
          </a>
          <button
            onClick={() => setCompareIds([])}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-dark"
            aria-label="Clear comparison"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// Small inline icon to avoid an extra import
const PlusCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const CollegeDetail = () => {
  const { id } = useParams();
  const college = colleges.find((item) => item.id === id);

  if (!college) return <NotFound />;

  return <CollegeDetailContent college={college} />;
};

export default CollegeDetail;
