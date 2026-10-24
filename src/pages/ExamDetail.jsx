import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Heart,
  IndianRupee,
  Info,
  Layers,
  MapPin,
  MessageSquare,
  Star,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { colleges, exams } from "../data/mockData";
import { getExamDetail } from "../data/examDetails";

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

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {items.map((item, index) => (
        <div key={item.q} className="border-b border-slate-100 last:border-0">
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="text-sm font-semibold text-dark">
              <span className="mr-1 text-primary">Q:</span> {item.q}
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-400 transition ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const parseExamDate = (value) => {
  if (!value) return null;
  const normalized = String(value).replace(/[–—]/g, "-");
  const lastPart = normalized.split("-").pop().trim();
  const timestamp = Date.parse(lastPart);
  return Number.isNaN(timestamp) ? null : timestamp;
};

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
    <Trophy className="h-12 w-12 text-slate-300" />
    <h1 className="mt-4 text-2xl font-bold text-dark">Exam not found</h1>
    <p className="mt-2 text-sm text-slate-500">
      The exam you are looking for may have moved or is not listed yet.
    </p>
    <Link to="/exams" className="btn-primary mt-6">
      Browse all exams
    </Link>
  </div>
);

const ExamDetailContent = ({ exam }) => {
  const detail = useMemo(() => getExamDetail(exam), [exam]);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [tocOpen, setTocOpen] = useState(true);
  const [pageRating, setPageRating] = useState(0);

  const examYear = (exam.examDate.match(/\d{4}/) || ["2027"])[0];
  const matchingColleges = useMemo(
    () => colleges.filter((college) => college.examsAccepted.includes(exam.name)),
    [exam]
  );
  const displayColleges = matchingColleges.length
    ? matchingColleges
    : colleges.slice(0, 3);
  const relatedExams = exams.filter((item) => item.slug !== exam.slug).slice(0, 4);

  const tabs = [
    { label: "Overview", id: "overview" },
    { label: "Important Dates", id: "dates" },
    { label: "Eligibility", id: "eligibility" },
    { label: "Exam Pattern", id: "pattern" },
    { label: "Syllabus", id: "syllabus" },
    { label: "Preparation", id: "preparation" },
    { label: "Colleges", id: "colleges" },
    { label: "FAQs", id: "faqs" },
  ];

  const downloadBrochure = () => {
    const heading = `${exam.name} ${examYear} - Exam Guide`;
    const rows = [
      ["Full name", exam.fullName],
      ["Conducting body", exam.conductingBody],
      ["Category", exam.category],
      ["Level", exam.level],
      ["Exam date", exam.examDate],
      ["Application window", `${exam.applyStart} to ${exam.applyEnd}`],
      ["Application fee", exam.applicationFee],
      ["Mode", detail.mode],
      ["Duration", detail.duration],
      ["Eligibility", detail.eligibility],
    ];
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
    anchor.download = `${exam.slug}-${examYear}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-x py-6">
          <nav className="flex items-center gap-1.5 overflow-hidden text-xs text-slate-500">
            <Link to="/" className="shrink-0 hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link to="/exams" className="shrink-0 hover:text-primary">
              Exams
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-medium text-dark">{exam.name}</span>
          </nav>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                  {exam.category}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                  {exam.level}
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
                  {examYear}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-dark sm:text-3xl">
                {exam.name} {examYear}
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {exam.fullName}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Exam date: <strong className="text-dark">{exam.examDate}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  {exam.conductingBody}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  Apply by <strong className="text-dark">{exam.applyEnd}</strong>
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
                onClick={downloadBrochure}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:text-sm"
              >
                <Download className="h-4 w-4" /> Brochure
              </button>
              {detail.officialWebsite && (
                <a
                  href={detail.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:text-sm"
                >
                  <ExternalLink className="h-4 w-4" /> Official website
                </a>
              )}
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
                href={`#${tab.id}`}
                onClick={() => setActiveTab(tab.label)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
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
                  eyebrow="Exam overview"
                  title={`About ${exam.name}`}
                  description={`Key dates, eligibility, exam pattern and preparation tips for ${exam.name} ${examYear}.`}
                />
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-bold text-dark">
                      <Layers className="h-4 w-4 text-primary" /> On this page
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition ${
                        tocOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {tocOpen && (
                    <div className="mt-3 grid gap-1.5 border-t border-slate-100 pt-3 sm:grid-cols-2">
                      {tabs.map((tab) => (
                        <a
                          key={tab.id}
                          href={`#${tab.id}`}
                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary"
                        >
                          <ChevronRight className="h-3.5 w-3.5 text-primary" />
                          {tab.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                  {detail.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <Timer className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Mode of exam
                    </p>
                    <p className="mt-1 text-sm font-bold text-dark">{detail.mode}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <Clock className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Duration
                    </p>
                    <p className="mt-1 text-sm font-bold text-dark">
                      {detail.duration}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Frequency
                    </p>
                    <p className="mt-1 text-sm font-bold text-dark">
                      {detail.frequency}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <Award className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Counselling
                    </p>
                    <p className="mt-1 text-sm font-bold text-dark">
                      {detail.counselling}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-800">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Dates and fees are indicative. Always verify the latest
                    information on the official exam website before applying.
                  </p>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img
                  src={exam.image}
                  alt={exam.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Exam date
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-dark">
                    {exam.examDate}
                  </p>
                  <dl className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <dt className="text-slate-500">Application window</dt>
                      <dd className="text-right font-semibold text-dark">
                        {exam.applyStart} – {exam.applyEnd}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-500">Application fee</dt>
                      <dd className="font-semibold text-dark">
                        {exam.applicationFee}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-slate-500">Level</dt>
                      <dd className="font-semibold text-dark">{exam.level}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <dt className="text-slate-500">Conducted by</dt>
                      <dd className="text-right font-semibold text-dark">
                        {exam.conductingBody}
                      </dd>
                    </div>
                  </dl>

                  {detail.officialWebsite ? (
                    <a
                      href={detail.officialWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary mt-4 w-full"
                    >
                      Apply now <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link to="/signup" className="btn-primary mt-4 w-full">
                      Get exam alerts <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <button
                    onClick={downloadBrochure}
                    className="btn-outline mt-2 w-full"
                  >
                    <Download className="h-4 w-4" /> Download brochure
                  </button>
                  <Link
                    to="/signup"
                    className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Get free counselling <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-dark">Need help with your form?</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Our counsellors can help you understand eligibility, deadlines
                  and the right college choices for your score.
                </p>
                <Link
                  to="/signup"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Talk to a counsellor <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Important dates */}
        <section id="dates" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Important dates"
            title={`${exam.name} ${examYear} important dates`}
            description="Application windows, admit card releases, exam day and result dates at a glance."
          />
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Event</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detail.importantDates.map((item) => {
                  const timestamp = parseExamDate(item.date);
                  const isPast = timestamp !== null && timestamp < Date.now();
                  const isExam = item.event.toLowerCase().includes("exam");
                  const isResult = item.event.toLowerCase().includes("result");
                  const status = isPast
                    ? "Completed"
                    : isExam
                    ? "Exam day"
                    : isResult
                    ? "Result"
                    : "Upcoming";
                  return (
                    <tr key={`${item.event}-${item.date}`} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-dark">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          {item.event}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-semibold text-slate-700">
                        {item.date}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            isPast
                              ? "bg-slate-100 text-slate-500"
                              : isExam
                              ? "bg-primary/10 text-primary"
                              : isResult
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Eligibility"
            title={`${exam.name} eligibility criteria`}
            description="Check the academic requirements, age limit and number of attempts before you apply."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-bold text-dark">
                Academic qualification
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {detail.eligibility}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-bold text-dark">Age limit</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {detail.ageLimit}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-bold text-dark">
                Number of attempts
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {detail.attempts}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-dark">
              <FileText className="h-4 w-4 text-primary" /> Documents to keep ready
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Class 10 and Class 12 mark sheets",
                "Entrance exam scorecard",
                "Category certificate (if applicable)",
                "Photo ID proof",
                "Recent passport-size photographs",
                "Signature and migration certificate",
              ].map((document) => (
                <p
                  key={document}
                  className="flex items-start gap-2 text-xs text-slate-600"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {document}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Exam pattern */}
        <section id="pattern" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Exam pattern"
            title={`${exam.name} exam pattern`}
            description="Question count, marks distribution, duration and marking scheme for the current session."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total questions", value: detail.totalQuestions, icon: FileText },
              { label: "Total marks", value: detail.totalMarks, icon: Award },
              { label: "Duration", value: detail.duration, icon: Clock },
              { label: "Mode", value: detail.mode, icon: Timer },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-lg font-extrabold leading-tight text-dark">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{item.label}</p>
                </div>
              );
            })}
          </div>

          {detail.patternSections.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Section</th>
                    <th className="px-5 py-3 font-semibold">Questions</th>
                    <th className="px-5 py-3 font-semibold">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {detail.patternSections.map((section) => (
                    <tr key={section.section} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-dark">
                        {section.section}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {section.questions}
                      </td>
                      <td className="px-5 py-3 text-slate-600">{section.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              The detailed exam pattern will be published in the official
              information bulletin.
            </div>
          )}

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary/5 px-4 py-3 text-xs text-slate-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              <strong className="text-dark">Marking scheme:</strong>{" "}
              {detail.markingScheme}
            </p>
          </div>
        </section>

        {/* Syllabus */}
        <section id="syllabus" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Syllabus"
            title={`${exam.name} syllabus`}
            description="Subject-wise topics to focus on while preparing for the exam."
            action={
              <Link to="/articles" className="btn-outline w-fit">
                Preparation guides <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          {detail.syllabus.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {detail.syllabus.map((subject) => (
                <div
                  key={subject.subject}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-dark">
                    {subject.subject}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {subject.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              The detailed syllabus is available in the official information
              bulletin.
            </div>
          )}
        </section>

        {/* Preparation */}
        <section id="preparation" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Preparation"
            title={`How to prepare for ${exam.name}`}
            description="A practical approach to planning, practice and revision."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.preparation.map((tip, index) => (
              <div
                key={tip.title}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-sm font-bold text-dark">{tip.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-dark">
                Looking for a study plan?
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Read expert preparation strategies, subject-wise tips and
                previous-year analysis.
              </p>
            </div>
            <Link to="/articles" className="btn-primary shrink-0">
              Read preparation articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Colleges */}
        <section id="colleges" className="scroll-mt-36">
          <SectionTitle
            eyebrow="Colleges"
            title={
              matchingColleges.length
                ? `Colleges accepting ${exam.name}`
                : `Top colleges to explore`
            }
            description={
              matchingColleges.length
                ? `These institutes accept ${exam.name} scores for admission to their programmes.`
                : `Explore top colleges and their admission requirements.`
            }
            action={
              <Link to="/colleges" className="btn-outline w-fit">
                View all colleges <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {displayColleges.map((college) => (
              <div
                key={college.id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md"
              >
                <img
                  src={college.image}
                  alt={college.name}
                  className="h-36 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold leading-snug text-dark">
                      {college.name}
                    </h3>
                    <span className="flex shrink-0 items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {college.rating}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" /> {college.location}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="text-slate-500">
                      NIRF #{college.nirfRank}
                    </span>
                    <span className="font-bold text-dark">{college.fees}</span>
                  </div>
                  <Link
                    to={`/colleges/${college.id}`}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark"
                  >
                    View college <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}

            {displayColleges.length < 2 && (
              <Link
                to="/colleges"
                className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-primary/50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Building2 className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-sm font-bold text-dark">
                  Explore all colleges
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
                  Compare fees, courses, cut-offs and placements across top
                  institutes.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Browse colleges <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="scroll-mt-36">
          <SectionTitle
            eyebrow="FAQs"
            title={`${exam.name} FAQs`}
            description="Quick answers to the questions candidates ask most often."
          />
          <Accordion items={detail.faqs} />
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
                  Not sure which exam or college is right for you?
                </h2>
                <p className="mt-1.5 text-sm text-blue-100">
                  Chat with our counsellor and get a personalised plan based on
                  your goals, eligibility and scores.
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

        {/* Related exams */}
        <section>
          <SectionTitle
            eyebrow="Related exams"
            title="Explore other entrance exams"
            description="Compare dates, eligibility and exam patterns before you decide."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedExams.map((item) => (
              <Link
                key={item.id}
                to={`/exams/${item.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-primary/40 hover:shadow-md"
              >
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  {item.category}
                </span>
                <h3 className="mt-2 text-sm font-bold text-dark group-hover:text-primary">
                  {item.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {item.fullName}
                </p>
                <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-600">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" />
                  {item.examDate}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  View details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
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

        {/* Author + breadcrumb */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 sm:items-center">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 sm:mt-0" />
            <span>
              Content authored by{" "}
              <span className="font-semibold text-dark">
                Shiksha Editorial Team
              </span>{" "}
              · Updated on 24 Oct 2026
            </span>
          </p>
          <nav className="flex flex-wrap items-center gap-1.5">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/exams" className="hover:text-primary">
              Exams
            </Link>
            <span>/</span>
            <span className="font-medium text-dark">{exam.name}</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

const ExamDetail = () => {
  const { slug } = useParams();
  const exam = exams.find((item) => item.slug === slug || item.id === slug);

  if (!exam) return <NotFound />;

  return <ExamDetailContent exam={exam} />;
};

export default ExamDetail;
