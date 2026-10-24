import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Download,
  Mail,
  Phone,
  Plus,
  Users,
  X,
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
  StatusBadge,
  TextInput,
} from "../components/AdminUI";
import {
  cn,
  counsellorNames,
  downloadCsv,
  formatCompactCurrency,
  formatDate,
  leadSources,
  leadStages,
  todayISO,
} from "../lib/utils";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  source: "College page",
  interest: "",
  college: "",
  temperature: "Warm",
  owner: "Aarav Mehta",
  score: "",
  value: "",
  nextFollowUp: todayISO(),
  notes: "",
};

const AdminLeads = () => {
  const { leads, updateLead, addLead, notify } = useAdminData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [stage, setStage] = useState("All");
  const [source, setSource] = useState("All");
  const [owner, setOwner] = useState("All");
  const [selected, setSelected] = useState([]);
  const [bulkOwner, setBulkOwner] = useState("");
  const [bulkStage, setBulkStage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch !== null) setSearch(urlSearch);
    if (searchParams.get("new") === "1") setModalOpen(true);
  }, [searchParams]);

  const closeModal = () => {
    setModalOpen(false);
    setForm(emptyForm);
    if (searchParams.get("new")) {
      const next = new URLSearchParams(searchParams);
      next.delete("new");
      setSearchParams(next, { replace: true });
    }
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads
      .filter((lead) => {
        const matchesTerm =
          !term ||
          [lead.name, lead.email, lead.phone, lead.id, lead.interest, lead.college, lead.owner]
            .join(" ")
            .toLowerCase()
            .includes(term);
        return (
          matchesTerm &&
          (stage === "All" || lead.stage === stage) &&
          (source === "All" || lead.source === source) &&
          (owner === "All" || lead.owner === owner)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [leads, search, stage, source, owner]);

  const stageFilters = ["All", ...leadStages, "Lost"];

  const stageCount = (value) =>
    value === "All"
      ? leads.length
      : leads.filter((lead) => lead.stage === value).length;

  const allSelected =
    filtered.length > 0 && filtered.every((lead) => selected.includes(lead.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((current) =>
        current.filter((id) => !filtered.some((lead) => lead.id === id))
      );
    } else {
      setSelected((current) => [
        ...new Set([...current, ...filtered.map((lead) => lead.id)]),
      ]);
    }
  };

  const toggleSelected = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const applyBulk = () => {
    if (!bulkOwner && !bulkStage) {
      notify("Choose an owner or a stage first.", "info");
      return;
    }
    selected.forEach((id) => {
      const patch = {};
      if (bulkOwner) patch.owner = bulkOwner;
      if (bulkStage) patch.stage = bulkStage;
      updateLead(id, patch);
    });
    notify(`${selected.length} lead${selected.length > 1 ? "s" : ""} updated.`);
    setSelected([]);
    setBulkOwner("");
    setBulkStage("");
  };

  const submitLead = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      notify("Name, email and phone are required.", "error");
      return;
    }
    const lead = addLead(form);
    closeModal();
    navigate(`/admin/leads/${lead.id}`);
  };

  const exportLeads = () => {
    downloadCsv(
      "shiksha-leads.csv",
      filtered.map((lead) => ({
        "Lead ID": lead.id,
        Name: lead.name,
        Email: lead.email,
        Phone: lead.phone,
        City: lead.city,
        Source: lead.source,
        Interest: lead.interest,
        College: lead.college,
        Stage: lead.stage,
        Temperature: lead.temperature,
        Owner: lead.owner,
        Score: lead.score,
        "Potential value": lead.value,
        "Next follow-up": lead.nextFollowUp,
        Created: lead.createdAt,
      }))
    );
    notify(`Exported ${filtered.length} leads.`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="CRM"
        title="Leads & enquiries"
        description="Every enquiry, owner and follow-up — in one clean workspace."
        breadcrumb={["Admin", "CRM", "Leads"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportLeads}>
              <Download className="h-4 w-4" /> Export CSV
            </AdminButton>
            <AdminButton onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> New lead
            </AdminButton>
          </>
        }
      />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {stageFilters.map((item) => (
          <button
            key={item}
            onClick={() => setStage(item)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition",
              stage === item
                ? "border-primary bg-primary text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"
            )}
          >
            {item}
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px]",
                stage === item ? "bg-white/15" : "bg-slate-100 text-slate-500"
              )}
            >
              {stageCount(item)}
            </span>
          </button>
        ))}
      </div>

      <SectionCard>
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center">
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder="Search by name, phone, college or lead ID…"
            className="w-full lg:max-w-sm"
          />
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <SelectInput
              value={source}
              onChange={(event) => setSource(event.target.value)}
              className="!w-auto min-w-[132px] py-2 text-xs"
            >
              <option value="All">All sources</option>
              {leadSources.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
            <SelectInput
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              className="!w-auto min-w-[132px] py-2 text-xs"
            >
              <option value="All">All owners</option>
              {counsellorNames.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
            {(search || stage !== "All" || source !== "All" || owner !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStage("All");
                  setSource("All");
                  setOwner("All");
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-dark"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-primary/10 bg-blue-50 px-5 py-2.5">
            <span className="mr-1 text-xs font-bold text-primary">
              {selected.length} selected
            </span>
            <SelectInput
              value={bulkOwner}
              onChange={(event) => setBulkOwner(event.target.value)}
              className="!w-auto min-w-[130px] bg-white py-1.5 text-xs"
            >
              <option value="">Assign owner</option>
              {counsellorNames.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
            <SelectInput
              value={bulkStage}
              onChange={(event) => setBulkStage(event.target.value)}
              className="!w-auto min-w-[130px] bg-white py-1.5 text-xs"
            >
              <option value="">Move stage</option>
              {leadStages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
            <AdminButton size="sm" onClick={applyBulk}>
              Apply
            </AdminButton>
            <button
              onClick={() => {
                setSelected([]);
                setBulkOwner("");
                setBulkStage("");
              }}
              className="ml-1 text-xs font-semibold text-slate-500 hover:text-dark"
            >
              Cancel
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No leads match these filters"
            description="Try clearing the filters or create a new enquiry."
            action={
              <AdminButton variant="outline" onClick={() => {
                setSearch("");
                setStage("All");
                setSource("All");
                setOwner("All");
              }}>
                Clear all filters
              </AdminButton>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        aria-label="Select all leads"
                        className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="px-3 py-3 font-semibold">Lead</th>
                    <th className="px-3 py-3 font-semibold">Contact</th>
                    <th className="px-3 py-3 font-semibold">Interest</th>
                    <th className="px-3 py-3 font-semibold">Source</th>
                    <th className="px-3 py-3 font-semibold">Stage</th>
                    <th className="px-3 py-3 font-semibold">Owner</th>
                    <th className="px-3 py-3 font-semibold">Follow-up</th>
                    <th className="px-3 py-3 text-right font-semibold">Value</th>
                    <th className="w-10 px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((lead) => {
                    const overdue =
                      lead.nextFollowUp &&
                      lead.nextFollowUp < todayISO() &&
                      !["Admitted", "Lost"].includes(lead.stage);
                    return (
                      <tr
                        key={lead.id}
                        className={cn(
                          "group transition hover:bg-slate-50/70",
                          selected.includes(lead.id) && "bg-blue-50/40"
                        )}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selected.includes(lead.id)}
                            onChange={() => toggleSelected(lead.id)}
                            aria-label={`Select ${lead.name}`}
                            className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <Link
                            to={`/admin/leads/${lead.id}`}
                            className="flex items-center gap-2.5"
                          >
                            <Avatar name={lead.name} size="sm" />
                            <div className="min-w-0">
                              <p className="max-w-[150px] truncate text-xs font-semibold text-dark group-hover:text-primary">
                                {lead.name}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {lead.id} · {lead.city}
                              </p>
                            </div>
                          </Link>
                        </td>
                        <td className="px-3 py-3">
                          <p className="flex items-center gap-1 text-[11px] text-slate-600">
                            <Phone className="h-3 w-3 text-slate-400" />
                            {lead.phone}
                          </p>
                          <p className="mt-0.5 flex max-w-[170px] items-center gap-1 truncate text-[10px] text-slate-400">
                            <Mail className="h-3 w-3 shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="max-w-[160px] truncate text-xs font-medium text-slate-700">
                            {lead.interest}
                          </p>
                          <p className="max-w-[160px] truncate text-[10px] text-slate-400">
                            {lead.college}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col items-start gap-1">
                            <StatusBadge status={lead.stage} dot />
                            <StatusBadge status={lead.temperature} />
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <Avatar name={lead.owner} size="sm" />
                            <span className="max-w-[88px] truncate text-[11px] text-slate-600">
                              {lead.owner.split(" ")[0]}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={cn(
                              "flex items-center gap-1 text-[11px] font-medium",
                              overdue ? "text-rose-600" : "text-slate-600"
                            )}
                          >
                            <CalendarDays className="h-3 w-3" />
                            {lead.nextFollowUp
                              ? formatDate(lead.nextFollowUp, { year: undefined })
                              : "—"}
                          </span>
                          {overdue && (
                            <span className="mt-0.5 block text-[9px] font-bold text-rose-500">
                              Overdue
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-right text-xs font-bold text-dark">
                          {formatCompactCurrency(lead.value)}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/admin/leads/${lead.id}`}
                            className="rounded-md p-1 text-slate-300 transition hover:bg-white hover:text-primary"
                            aria-label={`Open ${lead.name}`}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing <strong className="text-dark">{filtered.length}</strong> of{" "}
                {leads.length} leads
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                All data is saved in this browser
              </span>
            </div>
          </>
        )}
      </SectionCard>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Create a new lead"
        description="Capture an enquiry and route it to the right counsellor."
        wide
        footer={
          <>
            <AdminButton variant="outline" onClick={closeModal}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitLead}>
              Create lead <ArrowRight className="h-4 w-4" />
            </AdminButton>
          </>
        }
      >
        <form onSubmit={submitLead} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full name" required>
            <TextInput
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="e.g. Ananya Sharma"
              required
            />
          </FormField>
          <FormField label="Phone number" required>
            <TextInput
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              placeholder="+91 98xxx xxxxx"
              required
            />
          </FormField>
          <FormField label="Email address" required>
            <TextInput
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="student@example.com"
              required
            />
          </FormField>
          <FormField label="City">
            <TextInput
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
              placeholder="e.g. Lucknow"
            />
          </FormField>
          <FormField label="Interested course">
            <TextInput
              value={form.interest}
              onChange={(event) => setForm({ ...form, interest: event.target.value })}
              placeholder="e.g. B.Tech CSE"
            />
          </FormField>
          <FormField label="Preferred college">
            <TextInput
              value={form.college}
              onChange={(event) => setForm({ ...form, college: event.target.value })}
              placeholder="e.g. IIT Patna"
            />
          </FormField>
          <FormField label="Lead source">
            <SelectInput
              value={form.source}
              onChange={(event) => setForm({ ...form, source: event.target.value })}
            >
              {leadSources.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Temperature">
            <SelectInput
              value={form.temperature}
              onChange={(event) => setForm({ ...form, temperature: event.target.value })}
            >
              <option>Hot</option>
              <option>Warm</option>
              <option>Cold</option>
            </SelectInput>
          </FormField>
          <FormField label="Assign to">
            <SelectInput
              value={form.owner}
              onChange={(event) => setForm({ ...form, owner: event.target.value })}
            >
              {counsellorNames.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Potential value (₹)">
            <TextInput
              type="number"
              min="0"
              value={form.value}
              onChange={(event) => setForm({ ...form, value: event.target.value })}
              placeholder="e.g. 500000"
            />
          </FormField>
          <FormField label="Lead score">
            <TextInput
              type="number"
              min="0"
              max="100"
              value={form.score}
              onChange={(event) => setForm({ ...form, score: event.target.value })}
              placeholder="0–100"
            />
          </FormField>
          <FormField label="Next follow-up">
            <TextInput
              type="date"
              value={form.nextFollowUp}
              onChange={(event) => setForm({ ...form, nextFollowUp: event.target.value })}
            />
          </FormField>
          <FormField label="First note" className="sm:col-span-2">
            <TextInput
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              placeholder="What does the student need help with?"
            />
          </FormField>
        </form>
      </Modal>
    </div>
  );
};

export default AdminLeads;
