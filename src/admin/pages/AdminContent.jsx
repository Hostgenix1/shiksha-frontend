import { useMemo, useState } from "react";
import {
  Check,
  Download,
  FileText,
  Image,
  MessageSquare,
  Newspaper,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  EmptyState,
  FormField,
  Modal,
  PageHeader,
  SearchField,
  SelectInput,
  StatCard,
  StatusBadge,
  TextInput,
} from "../components/AdminUI";
import { cn, downloadCsv, formatDate } from "../lib/utils";

const typeIcons = {
  Article: FileText,
  Review: Star,
  Forum: MessageSquare,
  Banner: Image,
};

const contentTypes = ["Article", "Review", "Forum", "Banner"];
const contentStatuses = ["All", "Published", "Pending", "Draft", "Rejected"];

const emptyContent = {
  title: "",
  type: "Article",
  category: "",
  author: "Aarav Mehta",
  status: "Draft",
};

const AdminContent = () => {
  const { content, addContent, updateContent, notify } = useAdminData();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyContent);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return content.filter(
      (item) =>
        (!term ||
          [item.title, item.category, item.author, item.type]
            .join(" ")
            .toLowerCase()
            .includes(term)) &&
        (type === "All" || item.type === type) &&
        (status === "All" || item.status === status)
    );
  }, [content, search, type, status]);

  const pending = content.filter((item) => item.status === "Pending");

  const setContentStatus = (item, next) => {
    updateContent(item.id, { status: next });
    notify(
      next === "Published"
        ? `“${item.title}” is now published.`
        : next === "Rejected"
        ? `“${item.title}” was rejected.`
        : `“${item.title}” moved to ${next.toLowerCase()}.`
    );
  };

  const submitContent = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      notify("Add a title for this content item.", "error");
      return;
    }
    addContent(form);
    setForm(emptyContent);
    setModalOpen(false);
  };

  const exportContent = () => {
    downloadCsv(
      "shiksha-content.csv",
      filtered.map((item) => ({
        ID: item.id,
        Title: item.title,
        Type: item.type,
        Category: item.category,
        Author: item.author,
        Status: item.status,
        Updated: item.updatedAt,
      }))
    );
    notify(`Exported ${filtered.length} content records.`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Content & moderation"
        description="Review student contributions, publish editorial content and keep the public site fresh."
        breadcrumb={["Admin", "Content", "Content & moderation"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportContent}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New content
            </AdminButton>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total content"
          value={content.length}
          helper="Articles, reviews and banners"
          icon={Newspaper}
          tone="blue"
        />
        <StatCard
          label="Published"
          value={content.filter((item) => item.status === "Published").length}
          helper="Live on the public site"
          icon={Check}
          tone="emerald"
        />
        <StatCard
          label="Awaiting review"
          value={pending.length}
          helper="Needs a moderation decision"
          icon={MessageSquare}
          tone="amber"
        />
        <StatCard
          label="Drafts"
          value={content.filter((item) => item.status === "Draft").length}
          helper="Work in progress"
          icon={FileText}
          tone="violet"
        />
      </div>

      {pending.length > 0 && (
        <section className="mt-5 overflow-hidden rounded-xl border border-amber-200 bg-amber-50/50 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70 px-5 py-3.5">
            <div>
              <h2 className="text-sm font-bold text-dark">Moderation queue</h2>
              <p className="text-[11px] text-amber-700/80">
                {pending.length} item{pending.length > 1 ? "s" : ""} waiting for approval
              </p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200">
              Action required
            </span>
          </div>
          <div className="divide-y divide-amber-200/60 bg-white/70">
            {pending.map((item) => {
              const Icon = typeIcons[item.type] || FileText;
              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-3 px-5 py-3"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-dark">{item.title}</p>
                    <p className="text-[10px] text-slate-400">
                      {item.type} · {item.category} · by {item.author}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setContentStatus(item, "Rejected")}
                      className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-rose-600 transition hover:bg-rose-50"
                    >
                      <X className="h-3 w-3" /> Reject
                    </button>
                    <button
                      onClick={() => setContentStatus(item, "Published")}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-[10px] font-bold text-white transition hover:bg-emerald-700"
                    >
                      <Check className="h-3 w-3" /> Approve
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="mt-5 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-3.5">
          <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {["All", ...contentTypes].map((item) => (
              <button
                key={item}
                onClick={() => setType(item)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition",
                  type === item
                    ? "bg-primary text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-dark"
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder="Search content or authors…"
              className="w-full sm:max-w-sm"
            />
            <SelectInput
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="!w-auto py-2 text-xs sm:ml-auto"
            >
              {contentStatuses.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All statuses" : item}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="No content matches these filters"
            description="Try another type, status or search term."
            action={
              <AdminButton variant="outline" onClick={() => setModalOpen(true)}>
                <Plus className="h-4 w-4" /> Create content
              </AdminButton>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Content</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                  <th className="px-4 py-3 font-semibold">Updated</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const Icon = typeIcons[item.type] || FileText;
                  return (
                    <tr key={item.id} className="transition hover:bg-slate-50/70">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="max-w-[340px] truncate text-xs font-semibold text-dark">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-slate-400">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{item.category}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{item.author}</td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {formatDate(item.updatedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} dot />
                      </td>
                      <td className="px-5 py-3 text-right">
                        {item.status === "Pending" ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setContentStatus(item, "Rejected")}
                              className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                              title="Reject"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setContentStatus(item, "Published")}
                              className="rounded-md p-1.5 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                              title="Approve"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setContentStatus(
                                item,
                                item.status === "Published" ? "Draft" : "Published"
                              )
                            }
                            className={cn(
                              "rounded-md px-2.5 py-1.5 text-[10px] font-bold transition",
                              item.status === "Published"
                                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            )}
                          >
                            {item.status === "Published" ? "Unpublish" : "Publish"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500">
          <span>
            Showing <strong className="text-dark">{filtered.length}</strong> of {content.length}{" "}
            content items
          </span>
          <span>{pending.length} awaiting moderation</span>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create content"
        description="Draft an article, review, forum post or homepage banner."
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitContent}>Save content</AdminButton>
          </>
        }
      >
        <form onSubmit={submitContent} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Title" required className="sm:col-span-2">
            <TextInput
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="e.g. JEE Advanced 2027: what changed this year"
              required
            />
          </FormField>
          <FormField label="Content type">
            <SelectInput
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value })}
            >
              {contentTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Category">
            <TextInput
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              placeholder="e.g. Exam news"
            />
          </FormField>
          <FormField label="Author">
            <TextInput
              value={form.author}
              onChange={(event) => setForm({ ...form, author: event.target.value })}
            />
          </FormField>
          <FormField label="Initial status">
            <SelectInput
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
            >
              <option>Draft</option>
              <option>Pending</option>
              <option>Published</option>
            </SelectInput>
          </FormField>
        </form>
      </Modal>
    </div>
  );
};

export default AdminContent;
