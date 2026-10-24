import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, GraduationCap, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: "होम", path: "/" },
    { label: "कोर्सेज़", path: "/courses" },
    { label: "कॉलेजेस", path: "/colleges" },
    { label: "एग्जाम्स", path: "/exams" },
    { label: "आर्टिकल्स", path: "/articles" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white px-6 py-1.5 text-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="text-primary">📞</span>
            1800-123-4567
          </span>
          <span className="flex items-center gap-1">
            <span className="text-secondary">✉️</span>
            support@shiksha.com
          </span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span>नमस्ते, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition"
              >
                लॉगआउट
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-dark px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-100 transition"
              >
                लॉगिन
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-opacity-90 transition"
              >
                साइन अप
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenu(false)}
            >
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-dark tracking-tight">
                Shiksha<span className="text-primary">.com</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition"
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="max-w-7xl mx-auto relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="कोर्स, कॉलेज या एग्जाम खोजें..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-3 text-gray-600 hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition"
                >
                  लॉगआउट
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
                  >
                    लॉगिन
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 text-white bg-primary font-medium hover:bg-opacity-90 rounded-lg transition"
                  >
                    साइन अप
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
