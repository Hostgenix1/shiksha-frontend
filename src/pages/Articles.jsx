import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { articles } from "../data/mockData";

const articleCategories = ["All", ...new Set(articles.map((a) => a.category))];

const Articles = () => {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((article) => article.category === category),
    [category]
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
            <span className="font-medium text-dark">Articles</span>
          </nav>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-dark sm:text-3xl">
            Guides &amp; articles
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-600">
            Exam strategies, career advice, rankings and admission updates from our
            education experts.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {articleCategories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  category === item
                    ? "bg-primary text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
