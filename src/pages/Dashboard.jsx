import { Link, useNavigate } from "react-router-dom";
import { BookOpen, GraduationCap, School, LogOut, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { courses } from "../data/mockData";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const notifications = [
    { id: 1, title: "नया कोर्स लॉन्च", text: "B.Tech कंप्यूटर साइंस के लिए नए एडमिशन खुले", time: "2 घंटे पहले" },
    { id: 2, title: "एग्जाम रिमाइंडर", text: "JEE Main आवेदन की अंतिम तारीख कल है", time: "1 दिन पहले" },
    { id: 3, title: "कॉलेज अलर्ट", text: "डीयू कटऑफ लिस्ट जारी हुई", time: "3 दिन पहले" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-lg font-bold text-dark">डैशबोर्ड</h1>
              <p className="text-xs text-gray-500">आपका व्यक्तिगत शिक्षा पोर्टल</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" /> लॉगआउट
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark mb-1">
            नमस्ते, {user?.name || "यूज़र"} 👋
          </h2>
          <p className="text-gray-600">
            यहाँ आप अपने सेव किए गए कोर्सेज़ और नोटिफिकेशन देख सकते हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "सेव किए कोर्सेज़", value: "12", Icon: BookOpen, color: "bg-blue-100 text-blue-600" },
            { label: "फेवरेट कॉलेजेस", value: "5", Icon: School, color: "bg-green-100 text-green-600" },
            { label: "एग्जाम अलर्ट्स", value: "3", Icon: GraduationCap, color: "bg-purple-100 text-purple-600" },
            { label: "नोटिफिकेशन", value: notifications.length, Icon: Bell, color: "bg-orange-100 text-orange-600" },
          ].map((stat, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-dark">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-dark">अनुशंसित कोर्सेज़</h3>
              <Link to="/courses" className="text-sm text-primary font-medium hover:underline">
                सब देखें →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.slice(0, 4).map((course) => (
                <div key={course.id} className="card p-4">
                  <div className="h-32 overflow-hidden rounded-lg mb-3">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-dark mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{course.category}</p>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    विस्तार से →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-dark mb-6">हाल की नोटिफिकेशन</h3>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Bell className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark">{notif.title}</p>
                      <p className="text-xs text-gray-500">{notif.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
