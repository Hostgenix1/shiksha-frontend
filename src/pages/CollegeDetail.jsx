import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, Building2 } from "lucide-react";
import { colleges } from "../data/mockData";

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = colleges.find((c) => c.id === id);

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">कॉलेज नहीं मिला</h2>
          <Link
            to="/colleges"
            className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition inline-block"
          >
            वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-2">
        <button
          onClick={() => navigate("/colleges")}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> सभी कॉलेजेस
        </button>
        <span className="text-xs text-gray-400">/</span>
        <span className="text-sm text-gray-600">{college.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-700 text-xs font-bold rounded">
                  NIRF #{college.nirfRank}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  {college.type}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-dark mb-2">{college.name}</h1>
                <p className="text-gray-600">{college.location}</p>
              </div>
              <div className="flex items-center gap-1 text-primary font-bold text-lg">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{college.rating}</span>
                <span className="ml-1 text-xs text-gray-400">({college.reviews} समीक्षाएँ)</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{college.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-dark">कॉलेज विवरण</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">प्रकार</span>
                    <span className="font-medium">{college.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">स्थान</span>
                    <span className="font-medium">{college.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">NIRF रैंक</span>
                    <span className="font-medium">#{college.nirfRank}</span>
                  </div>
                </div>
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary">📚</span>
                  <h3 className="font-bold text-dark">प्रमुख कोर्सेज़</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {college.courses.map((course, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-dark mb-6">संपर्क करें</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">पता</p>
                    <p className="text-sm font-medium">{college.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">📞</span>
                  <div>
                    <p className="text-sm text-gray-500">फोन</p>
                    <p className="text-sm font-medium">+91 11 2345 6789</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-secondary mt-0.5">✉️</span>
                  <div>
                    <p className="text-sm text-gray-500">ईमेल</p>
                    <p className="text-sm font-medium break-all">
                      admission@{college.id}.edu.in
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:bg-opacity-90 transition">
                आवेदन करें
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
