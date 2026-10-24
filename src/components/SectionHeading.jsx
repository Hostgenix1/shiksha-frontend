import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SectionHeading = ({ eyebrow, title, description, viewAllTo, viewAllLabel }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-subtitle max-w-2xl">{description}</p>}
    </div>
    {viewAllTo && (
      <Link
        to={viewAllTo}
        className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
      >
        {viewAllLabel || "View all"} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

export default SectionHeading;
