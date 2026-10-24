import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import CourseCard from "../components/CourseCard";
import CollegeCard from "../components/CollegeCard";
import ArticleCard from "../components/ArticleCard";
import {
  categories,
  featuredCourses,
  featuredColleges,
  articles,
} from "../data/mockData";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-dark">लोकप्रिय कैटेगरीज़</h2>
            <button
              onClick={() => navigate("/courses")}
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              सब देखें <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-dark">फ़ीचर्ड कोर्सेज़</h2>
            <Link
              to="/courses"
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              सब कोर्सेज़ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-dark">टॉप कॉलेजेस</h2>
            <Link
              to="/colleges"
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              सब कॉलेजेस <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">शिक्षा.कॉम क्यों चुनें?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-white">विश्वसनीय जानकारी</h3>
                    <p className="text-gray-300 text-sm">सत्यापित कॉलेज और कोर्स डेटा</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-white">नि:शुल्क मार्गदर्शन</h3>
                    <p className="text-gray-300 text-sm">एक्सपर्ट काउंसलिंग और सलाह</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <h3 className="font-semibold text-white">नियमित अपडेट</h3>
                    <p className="text-gray-300 text-sm">एग्जाम डेट्स और रिजल्ट की तुरंत जानकारी</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 w-full max-w-sm">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl">📞</span>
                  <h3 className="text-xl font-bold">फ्री काउंसलिंग बुक करें</h3>
                </div>
                <p className="text-gray-200 text-sm mb-6">
                  हमारे एजुकेशन एक्सपर्ट से बात करें और सही कोर्स चुनें।
                </p>
                <button className="w-full bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                  काउंसलिंग बुक करें
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-dark">नवीनतम आर्टिकल्स</h2>
            <Link
              to="/articles"
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              सब आर्टिकल्स <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
