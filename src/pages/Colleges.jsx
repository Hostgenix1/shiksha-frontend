import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Building2 } from "lucide-react";
import CollegeCard from "../components/CollegeCard";
import { colleges } from "../data/mockData";

const types = ["Government", "Private", "Autonomous"];
const sortOptions = [
  { value: "rank", label: "NIRF ranking" },
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviewed" },
];

const Colleges = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("rank");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = colleges.filter((college) => {
      const matchesQuery =
        !query ||
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.location.toLowerCase().includes(query.toLowerCase());
      const matchesType = !type || college.type === type;
      return matchesQuery && matchesType;
    });

    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    else list = [...list].sort((a, b) => a.nirfRank - b.nirfRank);

    return list;
  }, [query, type, sort]);

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-dark">College type</h3>
        <div className="mt-3 space-y-1">
          <button
            onClick={() => setType("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              !type ? "bg-primary/10 font-semibold text-primary" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All types
          </button>
          {types.map((item) => (
            <button
              key={item}
              onClick={() => setType(type === item ? "" : item)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                type === item
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-dark">Location</h3>
        <div className="mt-3 space-y-1">
          {["Delhi", "Gujarat", "Karnataka", "Rajasthan"].map((city) => (
            <button
              key={city}
              onClick={() => setQuery(city)}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setQuery("");
          setType("");
          setSort("rank");
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
      >
        <X className="h-4 w-4" /> Clear all filters
      </button>
    </div>
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
            <span className="font-medium text-dark">Colleges</span>
          </nav>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl">
            Top colleges in India
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            {filtered.length} college{filtered.length === 1 ? "" : "s"} matching your
            preferences.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by college name or city"
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-dark"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-primary focus:outline-none sm:w-52"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-8 py-8 lg:grid-cols-4">
        <aside className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5">
            <Filters />
          </div>
        </aside>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white py-20 text-center">
              <Building2 className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-dark">No colleges found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try a different city or clear the filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setType("");
                }}
                className="btn-primary mt-5"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-dark/50 lg:hidden"
          onClick={() => setFiltersOpen(false)}
        >
          <div
            className="ml-auto h-full w-full max-w-sm overflow-y-auto bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-dark">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <Filters />
          </div>
        </div>
      )}
    </div>
  );
};

export default Colleges;
