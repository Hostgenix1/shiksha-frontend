import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  GraduationCap,
  IndianRupee,
  Star,
  Users,
  Briefcase,
  FileText,
  Layers,
  PlayCircle,
} from "lucide-react";
import { courses } from "../data/mockData";
import CourseCard from "../components/CourseCard";

const learningOutcomes = [
  "A comprehensive curriculum designed with academic and industry experts",
  "Hands-on projects, assignments and case studies in every module",
  "Live sessions with faculty, researchers and practising professionals",
  "Internship and placement support through the institute's career cell",
  "A recognised degree or certificate on successful completion",
];

const careerPaths = [
  "Industry roles",
  "Higher studies",
  "Research",
  "Public sector",
  "Entrepreneurship",
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <BookOpen className="h-12 w-12 text-slate-300" />
        <h1 className="mt-4 text-2xl font-bold text-dark">Course not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link to="/courses" className="btn-primary mt-6">
          Browse all courses
        </Link>
      </div>
    );
  }

  const relatedCourses = courses
    .filter((item) => item.id !== course.id)
    .slice(0, 4);

  const highlights = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: GraduationCap, label: "Level", value: course.level },
    { icon: Star, label: "Rating", value: `${course.rating} / 5` },
    { icon: Users, label: "Enrolled", value: course.students },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-x flex items-center gap-1.5 overflow-hidden py-3 text-xs text-slate-500">
          <Link to="/" className="shrink-0 hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <Link to="/courses" className="shrink-0 hover:text-primary">
            Courses
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-medium text-dark">{course.title}</span>
        </div>
      </div>

      <div className="container-x py-8">
        {/* Course header */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-5">
            <div className="relative h-64 lg:col-span-2 lg:h-full">
              <img
                src={course.image}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                {course.level}
              </span>
            </div>

            <div className="p-6 lg:col-span-3 lg:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {course.category}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-dark sm:text-3xl">
                {course.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                {course.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-lg bg-slate-50 p-3">
                    <item.icon className="h-4 w-4 text-primary" />
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-dark">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary">
                  Apply now <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="btn-outline">
                  <Download className="h-4 w-4" /> Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-dark">
                <BookOpen className="h-5 w-5 text-primary" /> About the course
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {course.description} The programme combines classroom teaching with
                practical work, so you graduate with both theoretical understanding and
                hands-on experience.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                You will study a structured curriculum across core subjects and electives,
                with continuous assessment through assignments, projects and semester
                examinations.
              </p>
            </section>

            {/* What you'll learn */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-dark">
                <PlayCircle className="h-5 w-5 text-primary" /> What you&apos;ll learn
              </h2>
              <ul className="mt-4 space-y-3">
                {learningOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="leading-relaxed text-slate-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Eligibility */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-dark">
                <FileText className="h-5 w-5 text-primary" /> Eligibility criteria
              </h2>
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-relaxed text-slate-700">
                  {course.eligibility}
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Eligibility may vary by institute. Always confirm the exact requirements
                on the college&apos;s official admission page before applying.
              </p>
            </section>

            {/* Career paths */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-dark">
                <Briefcase className="h-5 w-5 text-primary" /> Career opportunities
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Graduates pursue a range of paths depending on their specialisation and
                interests.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {careerPaths.map((path) => (
                  <span
                    key={path}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <Layers className="h-3.5 w-3.5 text-primary" />
                    {path}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Course fee
                </p>
                <p className="mt-1 flex items-center gap-1 text-2xl font-extrabold text-dark">
                  <IndianRupee className="h-5 w-5" />
                  {course.fee.replace("₹", "").replace(" / year", "")}
                  <span className="text-sm font-normal text-slate-500">/ year</span>
                </p>

                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Tuition fee</span>
                    <span className="font-semibold text-dark">{course.fee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Exam fee</span>
                    <span className="font-semibold text-emerald-600">Included</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <span className="font-medium text-dark">Total (per year)</span>
                    <span className="font-bold text-dark">{course.fee}</span>
                  </div>
                </div>

                <Link to="/signup" className="btn-accent mt-5 w-full">
                  Enrol now <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="btn-outline mt-3 w-full">
                  <Download className="h-4 w-4" /> Download brochure
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-bold text-dark">Talk to a counsellor</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Get a free comparison of colleges offering this course, along with fee
                  and placement details.
                </p>
                <Link
                  to="/signup"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Book a free call <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related courses */}
        {relatedCourses.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Explore more
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-dark">
                  Similar courses
                </h2>
              </div>
              <Link
                to="/courses"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCourses.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
