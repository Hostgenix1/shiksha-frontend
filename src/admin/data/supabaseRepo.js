import { supabase } from "../lib/supabaseClient";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const fail = (label, error) => {
  throw new Error(`${label}: ${error?.message || error}`);
};

const expect = (result, label) => {
  if (result.error) fail(label, result.error);
  return result.data;
};

const text = (value) => (value === undefined || value === null ? "" : String(value));
const dateOrNull = (value) => {
  const string = text(value).trim();
  return string ? string.slice(0, 10) : null;
};
const stampOrNow = (value) => {
  const string = text(value).trim();
  return string || new Date().toISOString();
};
const list = (value) => (Array.isArray(value) ? value : []);
const number = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

// ---------------------------------------------------------------------------
// Row <-> app shape mappers
// ---------------------------------------------------------------------------
const leadFromRow = (row) => ({
  id: row.id,
  name: text(row.name),
  email: text(row.email),
  phone: text(row.phone),
  city: text(row.city),
  source: text(row.source),
  interest: text(row.interest),
  college: text(row.college),
  stage: text(row.stage) || "New",
  temperature: text(row.temperature) || "Warm",
  owner: text(row.owner),
  score: number(row.score),
  value: number(row.value),
  createdAt: row.created_at || new Date().toISOString(),
  nextFollowUp: text(row.next_follow_up),
  lastContact: text(row.last_contact),
  notes: list(row.notes),
});

const leadToRow = (lead) => ({
  id: lead.id,
  name: lead.name,
  email: lead.email || null,
  phone: lead.phone || null,
  city: lead.city || "",
  source: lead.source || "Website",
  interest: lead.interest || "",
  college: lead.college || "",
  stage: lead.stage || "New",
  temperature: lead.temperature || "Warm",
  owner: lead.owner || "Aarav Mehta",
  score: number(lead.score) || 60,
  value: number(lead.value),
  created_at: stampOrNow(lead.createdAt),
  next_follow_up: dateOrNull(lead.nextFollowUp),
  last_contact: lead.lastContact || "",
  notes: list(lead.notes),
});

const taskFromRow = (row) => ({
  id: row.id,
  title: text(row.title),
  leadId: text(row.lead_id),
  leadName: text(row.lead_name) || "General task",
  due: text(row.due),
  priority: text(row.priority) || "Medium",
  type: text(row.type) || "Call",
  owner: text(row.owner),
  done: Boolean(row.done),
});

const taskToRow = (task) => ({
  id: task.id,
  title: task.title,
  lead_id: task.leadId || "",
  lead_name: task.leadName || "General task",
  due: dateOrNull(task.due),
  priority: task.priority || "Medium",
  type: task.type || "Call",
  owner: task.owner || "Aarav Mehta",
  done: Boolean(task.done),
});

const studentFromRow = (row) => ({
  id: row.id,
  name: text(row.name),
  email: text(row.email),
  phone: text(row.phone),
  course: text(row.course),
  college: text(row.college),
  year: text(row.year) || "2026",
  status: text(row.status) || "Onboarding",
  feeStatus: text(row.fee_status) || "Pending",
  admissionDate: text(row.admission_date),
});

const studentToRow = (student) => ({
  id: student.id,
  name: student.name,
  email: student.email || null,
  phone: student.phone || null,
  course: student.course || null,
  college: student.college || null,
  year: student.year || "2026",
  status: student.status || "Onboarding",
  fee_status: student.feeStatus || "Pending",
  admission_date: dateOrNull(student.admissionDate),
});

const applicationFromRow = (row) => ({
  id: row.id,
  leadId: text(row.lead_id),
  studentName: text(row.student_name),
  course: text(row.course),
  college: text(row.college),
  stage: text(row.stage) || "Draft",
  submitted: text(row.submitted),
  counsellor: text(row.counsellor),
  docsVerified: Boolean(row.docs_verified),
  amount: number(row.amount),
});

const applicationToRow = (application) => ({
  id: application.id,
  lead_id: application.leadId || "",
  student_name: application.studentName,
  course: application.course || null,
  college: application.college || null,
  stage: application.stage || "Draft",
  submitted: application.submitted || "",
  counsellor: application.counsellor || "Aarav Mehta",
  docs_verified: Boolean(application.docsVerified),
  amount: number(application.amount),
});

const invoiceFromRow = (row) => ({
  id: row.id,
  studentId: text(row.student_id),
  studentName: text(row.student_name),
  course: text(row.course),
  amount: number(row.amount),
  paid: number(row.paid),
  dueDate: text(row.due_date),
  status: text(row.status) || "Pending",
  payments: [],
});

const invoiceToRow = (invoice) => ({
  id: invoice.id,
  student_id: invoice.studentId || null,
  student_name: invoice.studentName,
  course: invoice.course || null,
  amount: number(invoice.amount),
  paid: number(invoice.paid),
  due_date: dateOrNull(invoice.dueDate),
  status: invoice.status || "Pending",
});

const paymentFromRow = (row) => ({
  id: row.id,
  date: text(row.date),
  amount: number(row.amount),
  method: text(row.method) || "UPI",
  reference: text(row.reference),
});

const contentFromRow = (row) => ({
  id: row.id,
  title: text(row.title),
  type: text(row.type) || "Article",
  category: text(row.category) || "General",
  author: text(row.author),
  status: text(row.status) || "Draft",
  updatedAt: text(row.updated_at),
});

const contentToRow = (item) => ({
  id: item.id,
  title: item.title,
  type: item.type || "Article",
  category: item.category || "General",
  author: item.author || "Aarav Mehta",
  status: item.status || "Draft",
  updated_at: dateOrNull(item.updatedAt) || new Date().toISOString().slice(0, 10),
});

export const profileFromRow = (row) => ({
  id: row.id,
  name: text(row.name),
  email: text(row.email),
  role: text(row.role) || "Counsellor",
  status: text(row.status) || "Active",
  lastActive: text(row.last_active) || "Invite pending",
  phone: text(row.phone),
});

const profileToRow = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role || "Counsellor",
  status: user.status || "Active",
  last_active: user.lastActive || "Invite pending",
  phone: user.phone || "",
});

const collegeFromRow = (row) => ({
  id: row.id,
  name: text(row.name),
  shortName: text(row.short_name),
  location: text(row.location),
  type: text(row.type) || "Government",
  rating: number(row.rating),
  reviews: number(row.reviews),
  courses: list(row.courses),
  nirfRank: row.nirf_rank === null || row.nirf_rank === undefined ? "" : number(row.nirf_rank),
  fees: text(row.fees),
  established: row.established === null || row.established === undefined ? "" : number(row.established),
  examsAccepted: list(row.exams_accepted),
  image: text(row.image),
  description: text(row.description),
  status: text(row.status) || "Published",
  updatedAt: text(row.updated_at),
});

const collegeToRow = (college) => ({
  id: college.id,
  name: college.name,
  short_name: college.shortName || null,
  location: college.location || null,
  type: college.type || "Government",
  rating: number(college.rating) || 4.2,
  reviews: number(college.reviews),
  courses: list(college.courses),
  nirf_rank: college.nirfRank === "" || college.nirfRank === undefined ? null : number(college.nirfRank),
  fees: college.fees || null,
  established:
    college.established === "" || college.established === undefined
      ? null
      : number(college.established),
  exams_accepted: list(college.examsAccepted),
  image: college.image || null,
  description: college.description || null,
  status: college.status || "Published",
  updated_at: dateOrNull(college.updatedAt) || new Date().toISOString().slice(0, 10),
});

const courseFromRow = (row) => ({
  id: row.id,
  title: text(row.title),
  category: text(row.category) || "Engineering",
  level: text(row.level) || "Undergraduate",
  duration: text(row.duration),
  fee: text(row.fee),
  rating: number(row.rating),
  students: text(row.students),
  image: text(row.image),
  description: text(row.description),
  eligibility: text(row.eligibility),
  status: text(row.status) || "Published",
  updatedAt: text(row.updated_at),
});

const courseToRow = (course) => ({
  id: course.id,
  title: course.title,
  category: course.category || "Engineering",
  level: course.level || "Undergraduate",
  duration: course.duration || null,
  fee: course.fee || null,
  rating: number(course.rating) || 4.5,
  students: course.students || null,
  image: course.image || null,
  description: course.description || null,
  eligibility: course.eligibility || null,
  status: course.status || "Published",
  updated_at: dateOrNull(course.updatedAt) || new Date().toISOString().slice(0, 10),
});

const examFromRow = (row) => ({
  id: row.id,
  slug: text(row.slug),
  name: text(row.name),
  fullName: text(row.full_name),
  conductingBody: text(row.conducting_body),
  category: text(row.category) || "Engineering",
  examDate: text(row.exam_date),
  applyStart: text(row.apply_start),
  applyEnd: text(row.apply_end),
  level: text(row.level) || "Undergraduate",
  applicationFee: text(row.application_fee),
  image: text(row.image),
  status: text(row.status) || "Published",
  updatedAt: text(row.updated_at),
});

const examToRow = (exam) => ({
  id: exam.id,
  slug: exam.slug || null,
  name: exam.name,
  full_name: exam.fullName || null,
  conducting_body: exam.conductingBody || null,
  category: exam.category || "Engineering",
  exam_date: exam.examDate || null,
  apply_start: exam.applyStart || null,
  apply_end: exam.applyEnd || null,
  level: exam.level || "Undergraduate",
  application_fee: exam.applicationFee || null,
  image: exam.image || null,
  status: exam.status || "Published",
  updated_at: dateOrNull(exam.updatedAt) || new Date().toISOString().slice(0, 10),
});

const settingsFromRow = (row) => ({
  organisation: text(row.organisation) || "Shiksha",
  supportEmail: text(row.support_email),
  supportPhone: text(row.support_phone),
  academicSession: text(row.academic_session),
  leadSlaHours: text(row.lead_sla_hours),
  autoAssignLeads: Boolean(row.auto_assign_leads),
  duplicateCheck: Boolean(row.duplicate_check),
  emailAlerts: Boolean(row.email_alerts),
  dailyDigest: Boolean(row.daily_digest),
});

export const catalogTables = {
  colleges: { table: "colleges", fromRow: collegeFromRow, toRow: collegeToRow, label: "College" },
  courses: { table: "courses", fromRow: courseFromRow, toRow: courseToRow, label: "Course" },
  exams: { table: "exams", fromRow: examFromRow, toRow: examToRow, label: "Exam" },
};

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------
export const fetchAdminData = async () => {
  if (!supabase) throw new Error("Supabase is not configured.");
  const results = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: true }),
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase.from("tasks").select("*").order("id", { ascending: true }),
    supabase.from("students").select("*").order("id", { ascending: true }),
    supabase.from("applications").select("*").order("id", { ascending: true }),
    supabase.from("invoices").select("*").order("id", { ascending: true }),
    supabase.from("payments").select("*").order("date", { ascending: false }),
    supabase.from("content").select("*").order("id", { ascending: true }),
    supabase.from("colleges").select("*").order("id", { ascending: true }),
    supabase.from("courses").select("*").order("id", { ascending: true }),
    supabase.from("exams").select("*").order("id", { ascending: true }),
    supabase.from("org_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  const [
    profileRows,
    leadRows,
    taskRows,
    studentRows,
    applicationRows,
    invoiceRows,
    paymentRows,
    contentRows,
    collegeRows,
    courseRows,
    examRows,
    settingsRow,
  ] = results.map((result, index) =>
    expect(result, `Load ${["profiles", "leads", "tasks", "students", "applications", "invoices", "payments", "content", "colleges", "courses", "exams", "settings"][index]}`)
  );

  const paymentsByInvoice = new Map();
  for (const row of paymentRows) {
    const entries = paymentsByInvoice.get(row.invoice_id) || [];
    entries.push(paymentFromRow(row));
    paymentsByInvoice.set(row.invoice_id, entries);
  }

  return {
    users: profileRows.map(profileFromRow),
    leads: leadRows.map(leadFromRow),
    tasks: taskRows.map(taskFromRow),
    students: studentRows.map(studentFromRow),
    applications: applicationRows.map(applicationFromRow),
    invoices: invoiceRows.map((row) => ({
      ...invoiceFromRow(row),
      payments: paymentsByInvoice.get(row.id) || [],
    })),
    content: contentRows.map(contentFromRow),
    catalog: {
      colleges: collegeRows.map(collegeFromRow),
      courses: courseRows.map(courseFromRow),
      exams: examRows.map(examFromRow),
    },
    settings: settingsRow ? settingsFromRow(settingsRow) : settingsFromRow({}),
  };
};

export const fetchProfileForAuthUser = async (authUserId) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", authUserId)
    .maybeSingle();
  if (error) fail("Profile", error);
  return data ? profileFromRow(data) : null;
};

// ---------------------------------------------------------------------------
// Writes (each returns a promise; callers fire-and-forget with error toasts)
// ---------------------------------------------------------------------------
export const saveLead = async (lead) => {
  if (!supabase) return;
  const { error } = await supabase.from("leads").upsert(leadToRow(lead));
  if (error) fail("Lead", error);
};

export const saveTask = async (task) => {
  if (!supabase) return;
  const { error } = await supabase.from("tasks").upsert(taskToRow(task));
  if (error) fail("Task", error);
};

export const saveStudent = async (student) => {
  if (!supabase) return;
  const { error } = await supabase.from("students").upsert(studentToRow(student));
  if (error) fail("Student", error);
};

export const saveApplication = async (application) => {
  if (!supabase) return;
  const { error } = await supabase.from("applications").upsert(applicationToRow(application));
  if (error) fail("Application", error);
};

export const saveInvoice = async (invoice) => {
  if (!supabase) return;
  const { error } = await supabase.from("invoices").upsert(invoiceToRow(invoice));
  if (error) fail("Invoice", error);
};

export const savePayment = async (invoiceId, payment, paid) => {
  if (!supabase) return;
  const { error: paymentError } = await supabase.from("payments").insert({
    id: payment.id,
    invoice_id: invoiceId,
    amount: number(payment.amount),
    method: payment.method || "UPI",
    reference: payment.reference || "",
    date: dateOrNull(payment.date) || new Date().toISOString().slice(0, 10),
  });
  if (paymentError) fail("Payment", paymentError);

  const { error: invoiceError } = await supabase
    .from("invoices")
    .update({ paid: number(paid) })
    .eq("id", invoiceId);
  if (invoiceError) fail("Invoice", invoiceError);
};

export const saveContent = async (item) => {
  if (!supabase) return;
  const { error } = await supabase.from("content").upsert(contentToRow(item));
  if (error) fail("Content", error);
};

export const saveProfile = async (user) => {
  if (!supabase) return;
  const { error } = await supabase.from("profiles").upsert(profileToRow(user));
  if (error) fail("Team member", error);
};

export const updateProfile = async (id, patch) => {
  if (!supabase) return;
  const row = {};
  if ("name" in patch) row.name = patch.name;
  if ("email" in patch) row.email = patch.email;
  if ("role" in patch) row.role = patch.role;
  if ("status" in patch) row.status = patch.status;
  if ("lastActive" in patch) row.last_active = patch.lastActive;
  if ("phone" in patch) row.phone = patch.phone;
  if (!Object.keys(row).length) return;
  const { error } = await supabase.from("profiles").update(row).eq("id", id);
  if (error) fail("Team member", error);
};

export const saveSettings = async (settings) => {
  if (!supabase) return;
  const { error } = await supabase.from("org_settings").upsert({
    id: 1,
    organisation: settings.organisation,
    support_email: settings.supportEmail,
    support_phone: settings.supportPhone,
    academic_session: settings.academicSession,
    lead_sla_hours: settings.leadSlaHours,
    auto_assign_leads: Boolean(settings.autoAssignLeads),
    duplicate_check: Boolean(settings.duplicateCheck),
    email_alerts: Boolean(settings.emailAlerts),
    daily_digest: Boolean(settings.dailyDigest),
    updated_at: new Date().toISOString(),
  });
  if (error) fail("Settings", error);
};

export const saveCatalogItem = async (type, item) => {
  if (!supabase) return;
  const config = catalogTables[type];
  if (!config) return;
  const { error } = await supabase.from(config.table).upsert(config.toRow(item));
  if (error) fail(config.label, error);
};

export const deleteCatalogItem = async (type, id) => {
  if (!supabase) return;
  const config = catalogTables[type];
  if (!config) return;
  const { error } = await supabase.from(config.table).delete().eq("id", id);
  if (error) fail(config.label, error);
};
