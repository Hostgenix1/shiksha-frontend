import { CalendarDays, Clock, User } from "lucide-react";

const ArticleCard = ({ article }) => (
  <article className="card group flex flex-col">
    <div className="h-44 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-1 flex-col p-5">
      <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
        {article.category}
      </span>
      <h3 className="mt-3 text-base font-bold leading-snug text-dark transition group-hover:text-primary">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {article.excerpt}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" /> {article.author}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" /> {article.date}
        </span>
        <span className="ml-auto flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {article.readTime}
        </span>
      </div>
    </div>
  </article>
);

export default ArticleCard;
