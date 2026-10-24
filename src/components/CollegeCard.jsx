import { Link } from "react-router-dom";
import { Star, MapPin, IndianRupee, ArrowUpRight } from "lucide-react";

const CollegeCard = ({ college }) => (
  <Link to={`/colleges/${college.id}`} className="card group flex flex-col">
    <div className="relative h-44 overflow-hidden">
      <img
        src={college.image}
        alt={college.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <span className="rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-dark shadow-sm backdrop-blur">
          NIRF #{college.nirfRank}
        </span>
        <span className="flex items-center gap-1 rounded-md bg-dark/70 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {college.rating}
        </span>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
          {college.type}
        </span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500">Est. {college.established}</span>
      </div>

      <h3 className="text-base font-bold leading-snug text-dark transition group-hover:text-primary">
        {college.name}
      </h3>

      <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5" /> {college.location}
      </p>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {college.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {college.courses.slice(0, 3).map((course) => (
          <span
            key={course}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
          >
            {course}
          </span>
        ))}
        {college.courses.length > 3 && (
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            +{college.courses.length - 3}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">Fees</p>
          <p className="flex items-center gap-0.5 text-sm font-bold text-dark">
            <IndianRupee className="h-3.5 w-3.5" />
            {college.fees.replace("₹", "")}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          View <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </Link>
);

export default CollegeCard;
