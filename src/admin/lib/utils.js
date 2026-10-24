export const leadStages = [
  "New",
  "Contacted",
  "Qualified",
  "Counselling",
  "Application",
  "Admitted",
];

export const leadTemperatures = ["Hot", "Warm", "Cold"];

export const leadSources = [
  "College page",
  "Course page",
  "Exam page",
  "Article",
  "Google Ads",
  "Instagram",
  "Referral",
  "Walk-in",
];

export const applicationStages = [
  "Draft",
  "Submitted",
  "Under review",
  "Documents verification",
  "Offer issued",
  "Offer accepted",
  "Enrolled",
  "Rejected",
];

export const counsellorNames = [
  "Aarav Mehta",
  "Neha Kapoor",
  "Rohan Verma",
  "Priya Iyer",
];

export const adminRoles = [
  "Super Admin",
  "Senior Counsellor",
  "Counsellor",
  "Admissions Officer",
  "Finance Officer",
  "Content Editor",
  "Viewer",
];

export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "NA";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export const formatCompactCurrency = (value) => {
  const amount = Number(value) || 0;
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}k`;
  return formatCurrency(amount);
};

export const formatDate = (value, options = {}) => {
  if (!value) return "—";
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  });
};

export const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const nowLabel = () =>
  new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const todayISO = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};

export const daysFromToday = (value) => {
  if (!value) return null;
  const target = new Date(`${value}T00:00:00`);
  const today = new Date(`${todayISO()}T00:00:00`);
  return Math.round((target - today) / 86400000);
};

export const invoiceStatus = (invoice) => {
  if (invoice.paid >= invoice.amount) return "Paid";
  if (invoice.dueDate && invoice.dueDate < todayISO()) return "Overdue";
  if (invoice.paid > 0) return "Partial";
  return "Pending";
};

export const downloadCsv = (filename, rows) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.map(escape).join(","),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export const percent = (value, total) =>
  total ? Math.round((value / total) * 100) : 0;
