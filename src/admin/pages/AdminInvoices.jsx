import { useMemo, useState } from "react";
import {
  Download,
  IndianRupee,
  Plus,
  ReceiptText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import {
  AdminButton,
  Avatar,
  EmptyState,
  FormField,
  Modal,
  PageHeader,
  ProgressBar,
  SearchField,
  SelectInput,
  StatCard,
  StatusBadge,
  TextInput,
} from "../components/AdminUI";
import {
  cn,
  downloadCsv,
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  invoiceStatus,
  percent,
  todayISO,
} from "../lib/utils";

const emptyInvoice = {
  studentId: "",
  studentName: "",
  course: "",
  amount: "",
  dueDate: "",
};

const emptyPayment = {
  amount: "",
  method: "UPI",
  date: todayISO(),
  reference: "",
};

const AdminInvoices = () => {
  const {
    invoices,
    payments,
    students,
    recordPayment,
    addInvoice,
    notify,
  } = useAdminData();
  const [tab, setTab] = useState("invoices");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState(emptyInvoice);
  const [paymentFor, setPaymentFor] = useState(null);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);

  const billed = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const collected = invoices.reduce((sum, invoice) => sum + invoice.paid, 0);
  const outstanding = billed - collected;
  const overdueInvoices = invoices.filter(
    (invoice) => invoiceStatus(invoice) === "Overdue"
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const invoiceState = invoiceStatus(invoice);
      return (
        (!term ||
          [invoice.id, invoice.studentName, invoice.course]
            .join(" ")
            .toLowerCase()
            .includes(term)) &&
        (status === "All" || invoiceState === status)
      );
    });
  }, [invoices, search, status]);

  const filteredPayments = useMemo(() => {
    const term = search.trim().toLowerCase();
    return payments.filter(
      (payment) =>
        !term ||
        [payment.id, payment.invoiceId, payment.studentName, payment.reference, payment.method]
          .join(" ")
          .toLowerCase()
          .includes(term)
    );
  }, [payments, search]);

  const openInvoiceModal = () => {
    setInvoiceForm({ ...emptyInvoice, dueDate: "" });
    setInvoiceModal(true);
  };

  const chooseStudent = (studentId) => {
    const student = students.find((item) => item.id === studentId);
    setInvoiceForm((current) => ({
      ...current,
      studentId,
      studentName: student?.name || current.studentName,
      course: student?.course || current.course,
    }));
  };

  const submitInvoice = (event) => {
    event.preventDefault();
    if (!invoiceForm.studentName.trim() || !Number(invoiceForm.amount)) {
      notify("Student name and invoice amount are required.", "error");
      return;
    }
    addInvoice(invoiceForm);
    setInvoiceModal(false);
    setInvoiceForm(emptyInvoice);
  };

  const openPayment = (invoice) => {
    setPaymentFor(invoice);
    setPaymentForm({
      ...emptyPayment,
      amount: String(invoice.amount - invoice.paid),
    });
  };

  const submitPayment = (event) => {
    event.preventDefault();
    if (!Number(paymentForm.amount)) {
      notify("Enter a valid payment amount.", "error");
      return;
    }
    recordPayment(paymentFor.id, paymentForm);
    setPaymentFor(null);
    setPaymentForm(emptyPayment);
  };

  const exportInvoices = () => {
    downloadCsv(
      tab === "invoices" ? "shiksha-invoices.csv" : "shiksha-payments.csv",
      tab === "invoices"
        ? filtered.map((invoice) => ({
            "Invoice ID": invoice.id,
            Student: invoice.studentName,
            Course: invoice.course,
            Amount: invoice.amount,
            Paid: invoice.paid,
            Balance: invoice.amount - invoice.paid,
            "Due date": invoice.dueDate,
            Status: invoiceStatus(invoice),
          }))
        : filteredPayments.map((payment) => ({
            "Payment ID": payment.id,
            Invoice: payment.invoiceId,
            Student: payment.studentName,
            Amount: payment.amount,
            Method: payment.method,
            Reference: payment.reference,
            Date: payment.date,
          }))
    );
    notify("Finance data exported as CSV.");
  };

  const remaining = paymentFor ? paymentFor.amount - paymentFor.paid : 0;

  return (
    <div>
      <PageHeader
        eyebrow="Finance"
        title="Invoices & payments"
        description="Track billed fees, collections and outstanding balances across every student."
        breadcrumb={["Admin", "Finance", "Invoices & payments"]}
        actions={
          <>
            <AdminButton variant="outline" onClick={exportInvoices}>
              <Download className="h-4 w-4" /> Export
            </AdminButton>
            <AdminButton onClick={openInvoiceModal}>
              <Plus className="h-4 w-4" /> New invoice
            </AdminButton>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total billed"
          value={formatCompactCurrency(billed)}
          helper={`${invoices.length} invoices`}
          icon={ReceiptText}
          tone="blue"
        />
        <StatCard
          label="Collected"
          value={formatCompactCurrency(collected)}
          helper={`${percent(collected, billed)}% collection rate`}
          trend="+18.2%"
          icon={IndianRupee}
          tone="emerald"
        />
        <StatCard
          label="Outstanding"
          value={formatCompactCurrency(outstanding)}
          helper="Balance to collect"
          icon={Wallet}
          tone="amber"
        />
        <StatCard
          label="Overdue invoices"
          value={overdueInvoices.length}
          helper={formatCompactCurrency(
            overdueInvoices.reduce(
              (sum, invoice) => sum + (invoice.amount - invoice.paid),
              0
            )
          )}
          icon={TrendingUp}
          tone="rose"
        />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center">
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {[
              { key: "invoices", label: "Invoices" },
              { key: "payments", label: "Payments" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                  tab === item.key
                    ? "bg-white text-dark shadow-sm"
                    : "text-slate-500 hover:text-dark"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <SearchField
            value={search}
            onChange={setSearch}
            placeholder={
              tab === "invoices"
                ? "Search by invoice, student or course…"
                : "Search payments by student or reference…"
            }
            className="w-full lg:ml-auto lg:max-w-sm"
          />
          {tab === "invoices" && (
            <SelectInput
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="!w-auto py-2 text-xs"
            >
              <option value="All">All statuses</option>
              <option>Paid</option>
              <option>Partial</option>
              <option>Pending</option>
              <option>Overdue</option>
            </SelectInput>
          )}
        </div>

        {tab === "invoices" ? (
          filtered.length === 0 ? (
            <EmptyState
              icon={ReceiptText}
              title="No invoices found"
              description="Try another search term or create a new invoice."
              action={
                <AdminButton variant="outline" onClick={openInvoiceModal}>
                  <Plus className="h-4 w-4" /> New invoice
                </AdminButton>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Invoice</th>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Collected</th>
                    <th className="px-4 py-3 font-semibold">Balance</th>
                    <th className="px-4 py-3 font-semibold">Due date</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((invoice) => {
                    const state = invoiceStatus(invoice);
                    const balance = invoice.amount - invoice.paid;
                    const progress = percent(invoice.paid, invoice.amount);
                    return (
                      <tr key={invoice.id} className="transition hover:bg-slate-50/70">
                        <td className="px-5 py-3">
                          <p className="text-xs font-bold text-dark">{invoice.id}</p>
                          <p className="text-[10px] text-slate-400">{invoice.course}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={invoice.studentName} size="sm" />
                            <div>
                              <p className="text-xs font-semibold text-dark">
                                {invoice.studentName}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {invoice.studentId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs font-semibold text-emerald-600">
                            {formatCurrency(invoice.paid)}
                          </p>
                          <ProgressBar
                            value={progress}
                            tone={progress >= 100 ? "bg-emerald-500" : "bg-primary"}
                            className="mt-1.5 h-1"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <p
                            className={cn(
                              "text-xs font-bold",
                              balance > 0 ? "text-rose-600" : "text-slate-400"
                            )}
                          >
                            {balance > 0 ? formatCurrency(balance) : "—"}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {formatDate(invoice.dueDate)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={state} dot />
                        </td>
                        <td className="px-5 py-3 text-right">
                          {balance > 0 ? (
                            <button
                              onClick={() => openPayment(invoice)}
                              className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1.5 text-[10px] font-bold text-primary transition hover:bg-primary hover:text-white"
                            >
                              Record payment
                            </button>
                          ) : (
                            <span className="text-[10px] font-semibold text-emerald-600">
                              Fully paid
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : filteredPayments.length === 0 ? (
          <EmptyState
            icon={IndianRupee}
            title="No payments recorded"
            description="Record a payment from an invoice to see it here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Invoice</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Method</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-5 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="transition hover:bg-slate-50/70">
                    <td className="px-5 py-3 text-xs font-bold text-dark">{payment.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={payment.studentName} size="sm" />
                        <div>
                          <p className="text-xs font-semibold text-dark">
                            {payment.studentName}
                          </p>
                          <p className="text-[10px] text-slate-400">{payment.course}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{payment.invoiceId}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-400">
                      {payment.reference || "—"}
                    </td>
                    <td className="px-5 py-3 text-right text-xs font-extrabold text-emerald-600">
                      {formatCurrency(payment.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {tab === "invoices" ? (
              <>
                Showing <strong className="text-dark">{filtered.length}</strong> invoices ·{" "}
                {formatCurrency(outstanding)} outstanding
              </>
            ) : (
              <>
                Showing <strong className="text-dark">{filteredPayments.length}</strong> payments ·{" "}
                {formatCurrency(collected)} collected
              </>
            )}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Payment ledger is up to date
          </span>
        </div>
      </div>

      <Modal
        open={invoiceModal}
        onClose={() => setInvoiceModal(false)}
        title="Generate a new invoice"
        description="Create a fee invoice against an enrolled or onboarding student."
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setInvoiceModal(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitInvoice}>Generate invoice</AdminButton>
          </>
        }
      >
        <form onSubmit={submitInvoice} className="grid gap-4 sm:grid-cols-2">
          <FormField label="Student" className="sm:col-span-2">
            <SelectInput
              value={invoiceForm.studentId}
              onChange={(event) => chooseStudent(event.target.value)}
            >
              <option value="">Choose a student or enter manually</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} · {student.course}
                </option>
              ))}
            </SelectInput>
          </FormField>
          <FormField label="Student name" required>
            <TextInput
              value={invoiceForm.studentName}
              onChange={(event) =>
                setInvoiceForm({ ...invoiceForm, studentName: event.target.value })
              }
              required
            />
          </FormField>
          <FormField label="Course">
            <TextInput
              value={invoiceForm.course}
              onChange={(event) =>
                setInvoiceForm({ ...invoiceForm, course: event.target.value })
              }
            />
          </FormField>
          <FormField label="Invoice amount (₹)" required>
            <TextInput
              type="number"
              min="1"
              value={invoiceForm.amount}
              onChange={(event) =>
                setInvoiceForm({ ...invoiceForm, amount: event.target.value })
              }
              required
            />
          </FormField>
          <FormField label="Due date">
            <TextInput
              type="date"
              value={invoiceForm.dueDate}
              onChange={(event) =>
                setInvoiceForm({ ...invoiceForm, dueDate: event.target.value })
              }
            />
          </FormField>
        </form>
      </Modal>

      <Modal
        open={Boolean(paymentFor)}
        onClose={() => setPaymentFor(null)}
        title="Record a payment"
        description={
          paymentFor
            ? `${paymentFor.id} · ${paymentFor.studentName} · ${formatCurrency(remaining)} outstanding`
            : ""
        }
        footer={
          <>
            <AdminButton variant="outline" onClick={() => setPaymentFor(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={submitPayment}>Save payment</AdminButton>
          </>
        }
      >
        <form onSubmit={submitPayment} className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Outstanding balance
            </p>
            <p className="mt-1 text-2xl font-extrabold text-dark">
              {formatCurrency(remaining)}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Total {formatCurrency(paymentFor?.amount || 0)} · already paid{" "}
              {formatCurrency(paymentFor?.paid || 0)}
            </p>
          </div>
          <FormField label="Payment amount (₹)" required>
            <TextInput
              type="number"
              min="1"
              max={remaining}
              value={paymentForm.amount}
              onChange={(event) =>
                setPaymentForm({ ...paymentForm, amount: event.target.value })
              }
              required
            />
          </FormField>
          <FormField label="Payment method">
            <SelectInput
              value={paymentForm.method}
              onChange={(event) =>
                setPaymentForm({ ...paymentForm, method: event.target.value })
              }
            >
              <option>UPI</option>
              <option>Bank transfer</option>
              <option>Card</option>
              <option>Cash</option>
              <option>Cheque</option>
            </SelectInput>
          </FormField>
          <FormField label="Payment date">
            <TextInput
              type="date"
              value={paymentForm.date}
              onChange={(event) =>
                setPaymentForm({ ...paymentForm, date: event.target.value })
              }
            />
          </FormField>
          <FormField label="Reference / UTR">
            <TextInput
              value={paymentForm.reference}
              onChange={(event) =>
                setPaymentForm({ ...paymentForm, reference: event.target.value })
              }
              placeholder="e.g. UPI-883421"
            />
          </FormField>
        </form>
      </Modal>
    </div>
  );
};

export default AdminInvoices;
