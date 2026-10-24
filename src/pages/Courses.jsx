import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, BookOpen } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { categories, courses } from "../data/mockData";

const sortOptions = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "fee-low", label: "Fee: low to high" },
];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = courses.filter((course) => {
      const matchesQuery =
        !query ||
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || course.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "fee-low") {
      const fee = (value) => Number(value.replace(/[^\d]/g, ""));
      list = [...list].sort((a, b) => fee(a.fee) - fee(b.fee));
    }
    return list;
  }, [query, category, sort]);

  const applyCategory = (name) => {
    const next = category === name ? "" : name;
    setCategory(next);
    const params = new URLSearchParams();
    if (next) params.set("category", next);
    if (query.trim()) params.set("search", query.trim());
    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setSort("popular");
    setSearchParams({}, { replace: true });
  };

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-dark">Stream</h3>
        <div className="mt-3 space-y-1">
          <button
            onClick={() => applyCategory("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              !category ? "bg-primary/10 font-semibold text-primary" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All streams
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => applyCategory(item.name)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                category === item.name
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{item.name}</span>
              <span className="text-xs text-slate-400">{item.courseCount}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={clearFilters}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
      >
        <X className="h-4 w-4" /> Clear all filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-x py-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-dark">Courses</span>
          </nav>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl">
            {category ? `${category} courses` : "Explore courses"}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            {filtered.length} course{filtered.length === 1 ? "" : "s"} found across
            India&apos;s top institutions.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by course name or stream"
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
              <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-4 text-lg font-bold text-dark">No courses found</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try a different keyword or clear the filters.
              </p>
              <button onClick={clearFilters} className="btn-primary mt-5">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
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

export default Courses;
