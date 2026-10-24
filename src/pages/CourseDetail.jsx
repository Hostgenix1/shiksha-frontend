import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, IndianRupee, Users } from "lucide-react";
import { courses } from "../data/mockData";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">कोर्स नहीं मिला</h2>
          <Link
            to="/courses"
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
          onClick={() => navigate("/courses")}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> सभी कोर्सेज़
        </button>
        <span className="text-xs text-gray-400">/</span>
        <span className="text-sm text-gray-600 truncate max-w-xs">{course.title}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-700 text-xs font-bold rounded">
                  {course.duration}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  {course.rating} ⭐
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-dark mb-2">{course.title}</h1>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase">
                  {course.category}
                </span>
              </div>
              <div className="flex items-center gap-1 text-primary font-bold text-lg">
                <IndianRupee className="w-4 h-4" />
                <span>{course.fee}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>अवधि: {course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{course.students} छात्र नामांकित</span>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-dark mb-4">कोर्स विवरण</h3>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-dark mb-3">इस कोर्स में क्या शामिल है?</h4>
                <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                  <li>व्यापक पाठ्यक्रम और अध्ययन सामग्री</li>
                  <li>उद्योग विशेषज्ञों से लाइव सत्र</li>
                  <li>प्रैक्टिकल असाइनमेंट और प्रोजेक्ट</li>
                  <li>सर्टिफिकेट ऑफ कम्प्लीशन</li>
                  <li>प्लेसमेंट सहायता</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-dark mb-6">कोर्स फीस</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-dark">{course.fee}</span>
              </div>
              <div className="space-y-4 text-sm text-gray-700 mb-8">
                <div className="flex justify-between border-b pb-2">
                  <span>ट्यूशन फीस</span>
                  <span className="font-medium">{course.fee}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>परीक्षा शुल्क</span>
                  <span className="font-medium">शामिल है</span>
                </div>
                <div className="flex justify-between">
                  <span>कुल</span>
                  <span className="font-bold text-dark">{course.fee}</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:bg-opacity-90 transition mb-4">
                नामांकन करें
              </button>
              <button className="w-full border-2 border-primary text-primary px-6 py-2.5 rounded-md font-medium hover:bg-primary hover:text-white transition">
                ब्रोशर डाउनलोड करें
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
