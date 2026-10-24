import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  BookOpen,
  CalendarDays,
  Users,
  Search,
  FileText,
  MessageSquare,
  CheckCircle2,
  Star,
  Quote,
  ShieldCheck,
  Award,
  Clock,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import CategoryCard from "../components/CategoryCard";
import CollegeCard from "../components/CollegeCard";
import CourseCard from "../components/CourseCard";
import ArticleCard from "../components/ArticleCard";
import {
  categories,
  featuredColleges,
  featuredCourses,
  exams,
  articles,
} from "../data/mockData";

const stats = [
  { icon: Building2, value: "5,000+", label: "Colleges & universities" },
  { icon: BookOpen, value: "50,000+", label: "Courses across streams" },
  { icon: CalendarDays, value: "120+", label: "Entrance exams tracked" },
  { icon: Users, value: "1M+", label: "Students guided every year" },
];

const steps = [
  {
    icon: Search,
    title: "Explore",
    text: "Browse colleges and courses by stream, location, fees or ranking.",
  },
  {
    icon: FileText,
    title: "Compare",
    text: "Shortlist options and compare fees, placements, cut-offs and reviews.",
  },
  {
    icon: MessageSquare,
    title: "Connect",
    text: "Talk to expert counsellors and apply to your shortlisted colleges.",
  },
];

const testimonials = [
  {
    name: "Priya Nair",
    role: "B.Tech CSE, IIT Delhi",
    quote:
      "The comparison tool helped me shortlist three colleges in one evening. The counsellor call was genuinely useful, not salesy.",
  },
  {
    name: "Arjun Mehta",
    role: "MBBS, AIIMS Delhi",
    quote:
      "I tracked NEET dates and cut-offs here every week. Everything was accurate and updated well before the official notifications.",
  },
  {
    name: "Sneha Kulkarni",
    role: "MBA, IIM Ahmedabad",
    quote:
      "From CAT preparation articles to interview experiences, this is the first place I checked before every decision.",
  },
];

const Home = () => (
  <div className="bg-white">
    <HeroSection />

    {/* Stats */}
    <section className="border-b border-slate-100 bg-white">
      <div className="container-x grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-extrabold text-dark">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Categories */}
    <section className="bg-slate-50 py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="Browse by stream"
          title="Popular categories"
          description="Start with the field you are interested in and narrow down from there."
          viewAllTo="/courses"
          viewAllLabel="All courses"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>

    {/* Top colleges */}
    <section className="py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="Rankings"
          title="Top colleges in India"
          description="Ranked by NIRF and verified against the latest admissions data."
          viewAllTo="/colleges"
          viewAllLabel="See all colleges"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </div>
    </section>

    {/* Popular courses */}
    <section className="bg-slate-50 py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="Courses"
          title="Most searched courses"
          description="Compare duration, eligibility and fees across India's most popular degrees."
          viewAllTo="/courses"
          viewAllLabel="Browse all courses"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>

    {/* Exams */}
    <section className="py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="Entrance exams"
          title="Exams to watch out for"
          description="Application windows and exam dates, updated as notifications are released."
          viewAllTo="/exams"
          viewAllLabel="Exam calendar"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              to="/exams"
              className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                  {exam.category}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {exam.level}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-dark group-hover:text-primary">
                {exam.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{exam.conductingBody}</p>
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  Exam: <span className="font-semibold text-dark">{exam.examDate}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  Apply by: <span className="font-semibold text-dark">{exam.applyEnd}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="bg-slate-50 py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="From confusion to admission in three steps"
          description="No fees, no spam calls. Just the information and guidance you need to decide well."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-xl border border-slate-200 bg-white p-6"
            >
              <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow">
                {index + 1}
              </span>
              <span className="mt-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-dark">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="Student stories"
          title="Trusted by students across India"
          description="Real feedback from learners who used Shiksha during their admissions journey."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6"
            >
              <Quote className="h-6 w-6 text-primary/30" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-dark">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
                <span className="ml-auto flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* Articles */}
    <section className="bg-slate-50 py-14">
      <div className="container-x">
        <SectionHeading
          eyebrow="Guides & articles"
          title="Latest from our experts"
          description="Exam strategies, career advice and admission updates, written by educators."
          viewAllTo="/articles"
          viewAllLabel="Read all articles"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-14">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-blue-600 px-6 py-12 text-white sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <ShieldCheck className="h-4 w-4" /> Free, no-obligation counselling
              </span>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
                Not sure which college is right for you?
              </h2>
              <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Talk to a Shiksha counsellor. Get a shortlist based on your scores,
                budget and career goals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-blue-50"
              >
                Book a free session <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/colleges"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore colleges
              </Link>
            </div>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-6 text-xs text-blue-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Verified data
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4" /> Expert counsellors
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" /> 1M+ students helped
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
