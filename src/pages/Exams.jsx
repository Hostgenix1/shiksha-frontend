import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  CalendarDays,
  Clock,
  Building2,
  IndianRupee,
  ArrowRight,
  CalendarRange,
} from "lucide-react";
import { exams } from "../data/mockData";

const Exams = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const filtered = useMemo(
    () =>
      exams.filter(
        (exam) =>
          !query ||
          exam.name.toLowerCase().includes(query.toLowerCase()) ||
          exam.fullName.toLowerCase().includes(query.toLowerCase()) ||
          exam.category.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-x py-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-dark">Exams</span>
          </nav>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl">
            Entrance exams
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-600">
            Application windows, exam dates and conducting bodies for India&apos;s most
            important entrance tests.
          </p>

          <div className="relative mt-5 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exams like JEE, NEET, CAT, CLAT"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>
      </div>

      <div className="container-x py-8">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white py-20 text-center">
            <CalendarRange className="mx-auto h-10 w-10 text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-dark">No exams found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try searching for JEE, NEET, CAT or CLAT.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((exam) => (
              <div key={exam.id} className="card flex flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                    {exam.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {exam.level}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-dark">{exam.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {exam.fullName}
                </p>

                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <CalendarDays className="h-3.5 w-3.5" /> Exam date
                    </span>
                    <span className="font-semibold text-dark">{exam.examDate}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="h-3.5 w-3.5" /> Apply by
                    </span>
                    <span className="font-semibold text-dark">{exam.applyEnd}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Building2 className="h-3.5 w-3.5" /> Conducted by
                    </span>
                    <span className="text-right font-semibold leading-snug text-dark">
                      {exam.conductingBody}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <IndianRupee className="h-3.5 w-3.5" /> Application fee
                    </span>
                    <span className="font-semibold text-dark">{exam.applicationFee}</span>
                  </div>
                </div>

                <button className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
                  Exam details <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Calendar */}
        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold text-dark">Upcoming exam calendar</h2>
            <p className="text-sm text-slate-500">
              Key dates at a glance. Always verify on the official exam website.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Exam</th>
                  <th className="px-6 py-3 font-semibold">Applications open</th>
                  <th className="px-6 py-3 font-semibold">Last date</th>
                  <th className="px-6 py-3 font-semibold">Exam date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-dark">{exam.name}</p>
                      <p className="text-xs text-slate-500">{exam.category}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{exam.applyStart}</td>
                    <td className="px-6 py-4 text-slate-600">{exam.applyEnd}</td>
                    <td className="px-6 py-4 font-medium text-dark">{exam.examDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
