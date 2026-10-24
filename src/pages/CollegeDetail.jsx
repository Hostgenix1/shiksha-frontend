import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Building2,
  CalendarDays,
  Award,
  IndianRupee,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Download,
  GraduationCap,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Users,
} from "lucide-react";
import { colleges } from "../data/mockData";
import CollegeCard from "../components/CollegeCard";

const admissionSteps = [
  {
    icon: ClipboardCheck,
    title: "Check eligibility",
    text: "Review the entrance exam requirements and minimum marks for your chosen programme.",
  },
  {
    icon: FileText,
    title: "Submit application",
    text: "Complete the online form and upload your academic documents before the deadline.",
  },
  {
    icon: GraduationCap,
    title: "Counselling & admission",
    text: "Attend the counselling round, confirm your seat and pay the admission fee.",
  },
];

const CollegeDetail = () => {
  const { id } = useParams();
  const college = colleges.find((item) => item.id === id);

  if (!college) {
    return (
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
  }

  const similarColleges = colleges
    .filter((item) => item.id !== college.id)
    .slice(0, 3);

  const stats = [
    {
      icon: CalendarDays,
      label: "Established",
      value: college.established,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      icon: Building2,
      label: "College type",
      value: college.type,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Award,
      label: "NIRF ranking",
      value: `#${college.nirfRank}`,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      icon: IndianRupee,
      label: "Annual fees",
      value: college.fees.replace(" / year", ""),
      tone: "bg-violet-50 text-violet-600",
    },
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
          <Link to="/colleges" className="shrink-0 hover:text-primary">
            Colleges
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate font-medium text-dark">{college.name}</span>
        </div>
      </div>

      <div className="container-x py-8">
        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-64 sm:h-80">
            <img
              src={college.image}
              alt={college.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-dark shadow-sm backdrop-blur">
                NIRF #{college.nirfRank}
              </span>
              <span className="rounded-md bg-emerald-500/95 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur">
                {college.type}
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">
                {college.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-200 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {college.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-white">{college.rating}</span>
                  ({college.reviews} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {college.shortName}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.tone}`}
                  >
                    <stat.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-dark">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-dark">About the college</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {college.description}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {college.shortName} offers a wide range of undergraduate and
                postgraduate programmes with a focus on academic rigour, research and
                industry exposure. Students have access to modern laboratories,
                libraries, hostels and an active placement cell.
              </p>
            </section>

            {/* Courses offered */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-dark">
                  <BookOpen className="h-5 w-5 text-primary" /> Courses offered
                </h2>
                <Link
                  to="/courses"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {college.courses.map((course) => (
                  <div
                    key={course}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-primary shadow-sm">
                        <GraduationCap className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-dark">{course}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </section>

            {/* Admission process */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-dark">Admission process</h2>
              <div className="mt-4 space-y-4">
                {admissionSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-4 w-4" />
                      </span>
                      {index < admissionSteps.length - 1 && (
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

              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Accepted entrance exams
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {college.examsAccepted.map((exam) => (
                    <span
                      key={exam}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-primary"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact info */}
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-dark">Contact information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Address</p>
                    <p className="mt-0.5 text-sm font-semibold text-dark">
                      {college.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Phone</p>
                    <p className="mt-0.5 text-sm font-semibold text-dark">
                      +91 11 2345 6789
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Email</p>
                    <p className="mt-0.5 break-all text-sm font-semibold text-dark">
                      admissions@shiksha.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Admission office</p>
                    <p className="mt-0.5 text-sm font-semibold text-dark">
                      Mon – Sat, 9:00 AM – 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Course fees
                </p>
                <p className="mt-1 flex items-center gap-1 text-2xl font-extrabold text-dark">
                  <IndianRupee className="h-5 w-5" />
                  {college.fees.replace("₹", "")}
                </p>

                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Rating</span>
                    <span className="flex items-center gap-1 font-semibold text-dark">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {college.rating} / 5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reviews</span>
                    <span className="font-semibold text-dark">{college.reviews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Courses</span>
                    <span className="font-semibold text-dark">
                      {college.courses.length} programmes
                    </span>
                  </div>
                </div>

                <Link to="/signup" className="btn-accent mt-5 w-full">
                  Apply now <ArrowRight className="h-4 w-4" />
                </Link>
                <button className="btn-outline mt-3 w-full">
                  <Download className="h-4 w-4" /> Download brochure
                </button>

                <div className="mt-5 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Free counselling. No application fee through Shiksha.</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
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
            </div>
          </aside>
        </div>

        {/* Similar colleges */}
        {similarColleges.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  You may also like
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-dark">
                  Similar colleges
                </h2>
              </div>
              <Link
                to="/colleges"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarColleges.map((item) => (
                <CollegeCard key={item.id} college={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CollegeDetail;
