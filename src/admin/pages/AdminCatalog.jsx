import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Building2,
  Download,
  ExternalLink,
  GraduationCap,
  Pencil,
  Plus,
  Trophy,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  Avatar,
  EmptyState,
  FormField,
  Modal,
  PageHeader,
  SearchField,
  SectionCard,
  SelectInput,
  TextInput,
  Textarea,
} from "../components/AdminUI";
import { cn, downloadCsv, formatDate } from "../lib/utils";

const configs = {
  colleges: {
    title: "Colleges",
    singular: "college",
    description:
      "Manage institutions, fees, approvals and publish state across the public catalog.",
    icon: Building2,
    addLabel: "Add college",
    emptyForm: {
      name: "",
      location: "",
      type: "Government",
      fees: "",
      nirfRank: "",
      rating: "",
      description: "",
      status: "Published",
    },
  },
  courses: {
    title: "Courses",
    singular: "course",
    description:
      "Keep programme details, eligibility, duration and fees up to date.",
    icon: BookOpen,
    addLabel: "Add course",
    emptyForm: {
      title: "",
      category: "Engineering",
      level: "Undergraduate",
      duration: "",
      fee: "",
      students: "",
      description: "",
      status: "Published",
    },
  },
  exams: {
    title: "Exams",
    singular: "exam",
    description:
      "Manage entrance exams, key dates and the information students see.",
    icon: Trophy,
    addLabel: "Add exam",
    emptyForm: {
      name: "",
      fullName: "",
      conductingBody: "",
      category: "Engineering",
      level: "Undergraduate",
      examDate: "",
      applyStart: "",
      applyEnd: "",
      applicationFee: "",
      status: "Published",
    },
  },
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const AdminCatalog = ({ type = "colleges" }) => {
  const { catalog, addCatalogItem, updateCatalogItem, deleteCatalogItem, notify } =
    useAdminData();
  const config = configs[type];
  const items = catalog[type];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(config.emptyForm);

  const getName = (item) => item.name || item.title || "Untitled";
  const getCategory = (item) => item.category || item.type || "—";

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      const values =
        type === "colleges"
          ? [item.name, item.location, item.type]
          : type === "courses"
          ? [item.title, item.category, item.level]
          : [item.name, item.fullName, item.category, item.conductingBody];
      return (
        (!term || values.join(" ").toLowerCase().includes(term)) &&
        (status === "All" || item.status === status)
      );
    });
  }, [items, search, status, type]);

  const published = items.filter((item) => item.status === "Published").length;
  const drafts = items.filter((item) => item.status === "Draft").length;

  const openCreate = () => {
    setEditing(null);
    setForm({ ...config.emptyForm });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const next = {};
    Object.keys(config.emptyForm).forEach((key) => {
      next[key] = item[key] ?? config.emptyForm[key];
    });
    setForm(next);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const saveItem = (event) => {
    event?.preventDefault();
    const name = type === "courses" ? form.title : form.name;
    if (!name?.trim()) {
      notify(`Add a ${type === "courses" ? "course title" : "name"} first.`, "error");
      return;
    }
    if (editing) {
      updateCatalogItem(type, editing.id, form);
      notify(`${type === "courses" ? "Course" : config.singular} updated.`);
    } else {
      const payload = { ...form };
      if (type === "exams") {
        payload.slug = slugify(form.name);
        payload.image =
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=70";
      }
      if (type === "courses") {
        payload.image =
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=70";
      }
      if (type === "colleges") {
        payload.image =
          "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70";
        payload.rating = Number(payload.rating) || 4.2;
        payload.nirfRank = Number(payload.nirfRank) || 99;
      }
      addCatalogItem(type, payload);
    }
    closeModal();
  };

  const toggleStatus = (item) => {
    const next = item.status === "Published" ? "Draft" : "Published";
    updateCatalogItem(type, item.id, { status: next });
    notify(`${getName(item)} is now ${next.toLowerCase()}.`);
  };

  const removeItem = () => {
    if (!editing) return;
    if (!window.confirm(`Delete ${getName(editing)} from the demo catalog?`)) return;
    deleteCatalogItem(type, editing.id);
    closeModal();
  };

  const exportItems = () => {
    downloadCsv(
      `shiksha-${type}.csv`,
      filtered.map((item) => ({
        ID: item.id,
        Name: getName(item),
        Category: getCategory(item),
        Status: item.status,
        Updated: item.updatedAt,
      }))
    );
    notify(`Exported ${filtered.length} ${config.title.toLowerCase()}.`);
  };

  const publicLink = (item) => {
    if (type === "colleges") return `/colleges/${item.id}`;
    if (type === "courses") return `/courses/${item.id}`;
    return `/exams/${item.slug || item.id}`;
  };

  const stats = [
    { label: `Total ${config.title.toLowerCase()}`, value: items.length, tone: "bg-blue-50 text-blue-600", icon: config.icon },
    { label: "Published", value: published, tone: "bg-emerald-50 text-emerald-600", icon: GraduationCap },
    { label: "Drafts", value: drafts, tone: "bg-amber-50 text-amber-600", icon: Pencil },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title={config.title}
        description={config.description}
        breadcrumb={["Admin", "Catalog", config.title]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportItems}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={openCreate}>
              <Plus className="h-4 w-4" /> {config.addLabel}
            </AdminButton>
          </>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", stat.tone)}>
              <stat.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <p className="mt-0.5 text-lg font-extrabold text-dark">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-[11px] leading-relaxed text-slate-600">
        <strong className="text-dark">Publishing workflow:</strong> Draft records stay
        internal. Published records are ready for the public catalog experience. Changes
        are saved automatically in this demo workspace.
      </div>

      <SectionCard>
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder={`Search ${config.title.toLowerCase()}…`}
            className="w-full sm:max-w-sm"
          />
          <SelectInput
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="!w-auto py-2 text-xs sm:ml-auto"
          >
            <option value="All">All statuses</option>
            <option>Published</option>
            <option>Draft</option>
          </SelectInput>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={config.icon}
            title={`No ${config.title.toLowerCase()} found`}
            description="Try a different search or create a new record."
            action={
              <AdminButton variant="outline" onClick={openCreate}>
                <Plus className="h-4 w-4" /> {config.addLabel}
              </AdminButton>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">{config.singular}</th>
                  <th className="px-4 py-3 font-semibold">
                    {type === "colleges" ? "Type" : "Category"}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {type === "colleges" ? "Location" : type === "courses" ? "Level" : "Exam date"}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {type === "colleges" ? "Fee" : type === "courses" ? "Fee" : "Application fee"}
                  </th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <Avatar name={getName(item)} size="md" />
                        )}
                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate text-xs font-semibold text-dark">
                            {getName(item)}
                          </p>
                          <p className="text-[10px] text-slate-400">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                        {getCategory(item)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {type === "colleges"
                        ? item.location || "—"
                        : type === "courses"
                        ? `${item.level || "—"}${item.duration ? ` · ${item.duration}` : ""}`
                        : item.examDate || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                      {type === "colleges"
                        ? item.fees || "—"
                        : type === "courses"
                        ? item.fee || "—"
                        : item.applicationFee || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(item)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 transition",
                          item.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 ring-slate-200 hover:bg-slate-200"
                        )}
                        title="Toggle publish status"
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            item.status === "Published" ? "bg-emerald-500" : "bg-slate-400"
                          )}
                        />
                        {item.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatDate(item.updatedAt)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={publicLink(item)}
                          className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-primary"
                          title="Open public page"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => openEdit(item)}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-primary"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500">
          Showing <strong className="text-dark">{filtered.length}</strong> of {items.length}{" "}
          records
        </div>
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? `Edit ${config.singular}` : config.addLabel}
        description={editing ? `Update ${getName(editing)}` : `Create a new ${config.singular} record.`}
        wide
        footer={
          <>
            {editing && (
              <AdminButton variant="danger" onClick={removeItem} className="mr-auto">
                Delete
              </AdminButton>
            )}
            <AdminButton variant="outline" onClick={closeModal}>
              Cancel
            </AdminButton>
            <AdminButton onClick={saveItem}>
              {editing ? "Save changes" : `Create ${config.singular}`}
            </AdminButton>
          </>
        }
      >
        <form onSubmit={saveItem} className="grid gap-4 sm:grid-cols-2">
          {type === "colleges" && (
            <>
              <FormField label="College name" required className="sm:col-span-2">
                <TextInput
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
              </FormField>
              <FormField label="Location">
                <TextInput
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                  placeholder="City, State"
                />
              </FormField>
              <FormField label="Institution type">
                <SelectInput
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value })}
                >
                  <option>Government</option>
                  <option>Autonomous</option>
                  <option>Private</option>
                  <option>Deemed</option>
                </SelectInput>
              </FormField>
              <FormField label="Annual fee">
                <TextInput
                  value={form.fees}
                  onChange={(event) => setForm({ ...form, fees: event.target.value })}
                  placeholder="₹2,00,000 / year"
                />
              </FormField>
              <FormField label="NIRF rank">
                <TextInput
                  type="number"
                  value={form.nirfRank}
                  onChange={(event) => setForm({ ...form, nirfRank: event.target.value })}
                />
              </FormField>
              <FormField label="Rating">
                <TextInput
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(event) => setForm({ ...form, rating: event.target.value })}
                />
              </FormField>
              <FormField label="Description" className="sm:col-span-2">
                <Textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
              </FormField>
            </>
          )}

          {type === "courses" && (
            <>
              <FormField label="Course title" required className="sm:col-span-2">
                <TextInput
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  required
                />
              </FormField>
              <FormField label="Category">
                <TextInput
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                />
              </FormField>
              <FormField label="Level">
                <SelectInput
                  value={form.level}
                  onChange={(event) => setForm({ ...form, level: event.target.value })}
                >
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>Diploma</option>
                  <option>Doctorate</option>
                </SelectInput>
              </FormField>
              <FormField label="Duration">
                <TextInput
                  value={form.duration}
                  onChange={(event) => setForm({ ...form, duration: event.target.value })}
                  placeholder="e.g. 4 years"
                />
              </FormField>
              <FormField label="Annual fee">
                <TextInput
                  value={form.fee}
                  onChange={(event) => setForm({ ...form, fee: event.target.value })}
                  placeholder="₹1,50,000 / year"
                />
              </FormField>
              <FormField label="Students enrolled">
                <TextInput
                  value={form.students}
                  onChange={(event) => setForm({ ...form, students: event.target.value })}
                  placeholder="e.g. 12k+"
                />
              </FormField>
              <FormField label="Description" className="sm:col-span-2">
                <Textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
              </FormField>
            </>
          )}

          {type === "exams" && (
            <>
              <FormField label="Exam name" required>
                <TextInput
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
              </FormField>
              <FormField label="Full name">
                <TextInput
                  value={form.fullName}
                  onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                />
              </FormField>
              <FormField label="Conducting body">
                <TextInput
                  value={form.conductingBody}
                  onChange={(event) =>
                    setForm({ ...form, conductingBody: event.target.value })
                  }
                />
              </FormField>
              <FormField label="Category">
                <TextInput
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                />
              </FormField>
              <FormField label="Level">
                <SelectInput
                  value={form.level}
                  onChange={(event) => setForm({ ...form, level: event.target.value })}
                >
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                </SelectInput>
              </FormField>
              <FormField label="Exam date">
                <TextInput
                  value={form.examDate}
                  onChange={(event) => setForm({ ...form, examDate: event.target.value })}
                  placeholder="e.g. 18 May 2027"
                />
              </FormField>
              <FormField label="Application opens">
                <TextInput
                  value={form.applyStart}
                  onChange={(event) => setForm({ ...form, applyStart: event.target.value })}
                  placeholder="e.g. 30 Apr 2027"
                />
              </FormField>
              <FormField label="Application closes">
                <TextInput
                  value={form.applyEnd}
                  onChange={(event) => setForm({ ...form, applyEnd: event.target.value })}
                  placeholder="e.g. 08 May 2027"
                />
              </FormField>
              <FormField label="Application fee">
                <TextInput
                  value={form.applicationFee}
                  onChange={(event) =>
                    setForm({ ...form, applicationFee: event.target.value })
                  }
                  placeholder="₹3,200"
                />
              </FormField>
            </>
          )}

          <FormField label="Publish status">
            <SelectInput
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            >
              <option>Published</option>
              <option>Draft</option>
            </SelectInput>
          </FormField>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCatalog;
