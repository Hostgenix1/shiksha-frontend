import { Link } from "react-router-dom";
import {
  Cog,
  HeartPulse,
  Briefcase,
  Scale,
  Palette,
  FlaskConical,
  Calculator,
  GraduationCap,
} from "lucide-react";

const iconMap = {
  engineering: Cog,
  medical: HeartPulse,
  management: Briefcase,
  law: Scale,
  arts: Palette,
  science: FlaskConical,
  commerce: Calculator,
  education: GraduationCap,
};

const tones = {
  engineering: "bg-blue-50 text-blue-600",
  medical: "bg-rose-50 text-rose-600",
  management: "bg-violet-50 text-violet-600",
  law: "bg-amber-50 text-amber-600",
  arts: "bg-pink-50 text-pink-600",
  science: "bg-emerald-50 text-emerald-600",
  commerce: "bg-cyan-50 text-cyan-600",
  education: "bg-indigo-50 text-indigo-600",
};

const CategoryCard = ({ category }) => {
  const Icon = iconMap[category.icon] || GraduationCap;

  return (
    <Link
      to={`/courses?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
          tones[category.icon] || "bg-slate-100 text-slate-600"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 text-sm font-bold text-dark group-hover:text-primary">
        {category.name}
      </h3>
      <p className="mt-0.5 text-xs text-slate-500">{category.courseCount} courses</p>
    </Link>
  );
};

export default CategoryCard;
