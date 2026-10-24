import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import CollegeCard from "../components/CollegeCard";
import { colleges } from "../data/mockData";

const Colleges = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("search") || "";
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    const result = colleges.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredColleges(result);
  }, [search]);

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
          <h1 className="text-2xl font-bold text-dark">कॉलेजेस</h1>
          <p className="text-gray-600 text-sm">{filteredColleges.length} कॉलेजेस मिले</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-bold text-dark mb-2">कोई कॉलेज नहीं मिला</h3>
            <Link
              to="/colleges"
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition inline-block mt-2"
            >
              सभी कॉलेजेस देखें
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;
