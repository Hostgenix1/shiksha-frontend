import { useEffect } from "react";
import { X, Search, ChevronRight } from "lucide-react";
import { cn, getInitials } from "../lib/utils";

export const buttonStyles = (variant = "primary", size = "md", className = "") => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary:
      "bg-primary text-white shadow-sm hover:bg-primary-dark focus:ring-primary/30",
    secondary:
      "bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus:ring-slate-300",
    outline:
      "border border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary focus:ring-primary/20",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-dark focus:ring-slate-200",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-200",
    amber: "bg-accent text-white hover:bg-accent-dark focus:ring-amber-200",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm",
    icon: "h-9 w-9 p-0",
  };
  return cn(base, variants[variant], sizes[size], className);
};

export const AdminButton = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => (
  <button className={buttonStyles(variant, size, className)} {...props}>
    {children}
  </button>
);

export const PageHeader = ({ eyebrow, title, description, actions, breadcrumb }) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0">
      {breadcrumb && (
        <div className="mb-2 flex flex-wrap items-center gap-1 text-[11px] font-medium text-slate-400">
          {breadcrumb.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3 w-3" />}
              <span className={index === breadcrumb.length - 1 ? "text-slate-600" : ""}>
                {item}
              </span>
            </span>
          ))}
        </div>
      )}
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-dark">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 max-w-3xl text-sm text-slate-500">{description}</p>
      )}
    </div>
    {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
  </div>
);

const toneMap = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  violet: "bg-violet-50 text-violet-700 ring-violet-100",
  rose: "bg-rose-50 text-rose-700 ring-rose-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
};

export const StatCard = ({
  label,
  value,
  helper,
  trend,
  icon: Icon,
  tone = "blue",
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-extrabold tracking-tight text-dark">{value}</p>
      </div>
      {Icon && (
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
            toneMap[tone] || toneMap.blue
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
    </div>
    <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
      {trend ? (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-bold",
            trend.startsWith("-")
              ? "bg-rose-50 text-rose-600"
              : "bg-emerald-50 text-emerald-700"
          )}
        >
          {trend}
        </span>
      ) : (
        <span />
      )}
      {helper && <span className="truncate text-slate-400">{helper}</span>}
    </div>
  </div>
);

const statusStyles = {
  new: "bg-sky-50 text-sky-700 ring-sky-200",
  contacted: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  qualified: "bg-violet-50 text-violet-700 ring-violet-200",
  counselling: "bg-amber-50 text-amber-700 ring-amber-200",
  application: "bg-orange-50 text-orange-700 ring-orange-200",
  admitted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  lost: "bg-rose-50 text-rose-700 ring-rose-200",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  inactive: "bg-slate-100 text-slate-500 ring-slate-200",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  draft: "bg-slate-100 text-slate-600 ring-slate-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  partial: "bg-sky-50 text-sky-700 ring-sky-200",
  overdue: "bg-rose-50 text-rose-700 ring-rose-200",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  submitted: "bg-blue-50 text-blue-700 ring-blue-200",
  "under review": "bg-violet-50 text-violet-700 ring-violet-200",
  "documents verification": "bg-amber-50 text-amber-700 ring-amber-200",
  "offer issued": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "offer accepted": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  enrolled: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  onboarding: "bg-amber-50 text-amber-700 ring-amber-200",
  graduated: "bg-slate-100 text-slate-600 ring-slate-200",
  hots: "bg-rose-50 text-rose-700 ring-rose-200",
  hot: "bg-rose-50 text-rose-700 ring-rose-200",
  warm: "bg-amber-50 text-amber-700 ring-amber-200",
  cold: "bg-sky-50 text-sky-700 ring-sky-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  low: "bg-slate-100 text-slate-600 ring-slate-200",
};

export const StatusBadge = ({ status, dot = false, className = "" }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1",
      statusStyles[String(status || "").toLowerCase()] || statusStyles.draft,
      className
    )}
  >
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    {status}
  </span>
);

export const Avatar = ({ name = "", size = "md", className = "" }) => {
  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-16 w-16 text-lg",
  };
  const tones = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-violet-100 text-violet-700",
    "bg-rose-100 text-rose-700",
  ];
  const tone = tones[(name.charCodeAt(0) || 0) % tones.length];
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold",
        sizes[size],
        tone,
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
};

export const ProgressBar = ({ value, tone = "bg-primary", className = "" }) => (
  <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
    <div
      className={cn("h-full rounded-full transition-all", tone)}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export const MiniBars = ({ items, formatValue = (value) => value, tone = "bg-primary" }) => {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="space-y-3.5">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
            <span className="flex min-w-0 items-center gap-2 font-medium text-slate-600">
              {item.dot && (
                <span className={cn("h-2 w-2 shrink-0 rounded-full", item.dot)} />
              )}
              <span className="truncate">{item.label}</span>
            </span>
            <span className="shrink-0 font-bold text-dark">{formatValue(item.value)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full", item.tone || tone)}
              style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Sparkline = ({ points, className = "" }) => {
  if (!points?.length) return null;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const coords = points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * 100;
      const y = 38 - ((point - min) / range) * 32;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={cn("h-10 w-full", className)}>
      <defs>
        <linearGradient id="adminSparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,40 ${coords} 100,40`} fill="url(#adminSparkFill)" />
      <polyline
        points={coords}
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SectionCard = ({ title, description, action, children, className = "" }) => (
  <section className={cn("rounded-xl border border-slate-200 bg-white shadow-sm", className)}>
    {(title || action) && (
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          {title && <h2 className="text-sm font-bold text-dark">{title}</h2>}
          {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

export const SearchField = ({ value, onChange, placeholder = "Search…", className = "" }) => (
  <div className={cn("relative", className)}>
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
    />
  </div>
);

export const FormField = ({ label, hint, required, children, className = "" }) => (
  <label className={cn("block", className)}>
    <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-slate-600">
      {label}
      {required && <span className="text-rose-500">*</span>}
    </span>
    {children}
    {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
  </label>
);

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

export const TextInput = ({ className = "", ...props }) => (
  <input className={cn(inputClass, className)} {...props} />
);

export const SelectInput = ({ className = "", children, ...props }) => (
  <select className={cn(inputClass, "pr-8", className)} {...props}>
    {children}
  </select>
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea className={cn(inputClass, "min-h-24 resize-y", className)} {...props} />
);

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  wide = false,
}) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl",
          wide ? "max-w-4xl" : "max-w-xl"
        )}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-dark">{title}</h2>
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-dark"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
        {footer && (
          <div className="sticky bottom-0 flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
    {Icon && (
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="h-6 w-6" />
      </span>
    )}
    <h3 className="mt-3 text-sm font-bold text-dark">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const TableEmpty = ({ colSpan, children = "No records found." }) => (
  <tr>
    <td colSpan={colSpan} className="px-5 py-12 text-center text-sm text-slate-500">
      {children}
    </td>
  </tr>
);
