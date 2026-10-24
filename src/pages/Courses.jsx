import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Filter, Search, ArrowLeft, X } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { categories, courses } from "../data/mockData";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let result = courses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category) {
      result = result.filter((c) => c.category === category);
    }
    setFilteredCourses(result);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-medium hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> वापस
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-dark">
                {category || search ? "खोज परिणाम" : "सभी कोर्सेज़"}
              </h1>
              <p className="text-gray-600 text-sm">
                {filteredCourses.length} कोर्सेज़ मिले
                {category ? ` — ${category}` : ""}
              </p>
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition w-fit"
            >
              <Filter className="w-4 h-4" /> फ़िल्टर
            </button>
          </div>
        </div>
      </div>

      {filterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white p-6 shadow-2xl ml-auto overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-dark">कैटेगरी से फ़िल्टर करें</h3>
              <button onClick={() => setFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilterOpen(false);
                    navigate(`/courses?category=${encodeURIComponent(cat.name)}`);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition ${
                    category === cat.name
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setFilterOpen(false);
                navigate("/courses");
              }}
              className="mt-6 w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              फ़िल्टर हटाएं
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-bold text-dark mb-2">कोई कोर्स नहीं मिला</h3>
            <p className="text-gray-600 mb-6">अपना खोज शब्द बदलकर फिर कोशिश करें।</p>
            <Link
              to="/courses"
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition inline-block"
            >
              सभी कोर्सेज़ देखें
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
