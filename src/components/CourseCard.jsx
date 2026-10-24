import { Link } from "react-router-dom";
import { Star, Clock, Users, IndianRupee, ArrowUpRight } from "lucide-react";

const CourseCard = ({ course }) => (
  <Link to={`/courses/${course.id}`} className="card group flex flex-col">
    <div className="relative h-40 overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
        {course.level}
      </span>
      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-dark shadow-sm backdrop-blur">
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
        {course.rating}
      </span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {course.category}
      </p>
      <h3 className="mt-1.5 text-base font-bold leading-snug text-dark transition group-hover:text-primary">
        {course.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {course.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" /> {course.students} enrolled
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="flex items-center gap-0.5 text-sm font-bold text-dark">
          <IndianRupee className="h-3.5 w-3.5" />
          {course.fee.replace("₹", "").replace(" / year", "")}
          <span className="text-xs font-normal text-slate-500">/ year</span>
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Details <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </Link>
);

export default CourseCard;
