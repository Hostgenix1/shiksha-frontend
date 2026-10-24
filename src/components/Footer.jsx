import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const socials = [
  { label: "FB", href: "#" },
  { label: "TW", href: "#" },
  { label: "IG", href: "#" },
  { label: "IN", href: "#" },
  { label: "YT", href: "#" },
];

const Footer = () => (
  <footer className="bg-dark text-gray-300">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-white tracking-tight">
              Shiksha<span className="text-primary">.com</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            भारत का सबसे विश्वसनीय एजुकेशन पोर्टल। कोर्सेज़, कॉलेजेस, एग्जाम्स और करियर गाइडेंस एक ही जगह।
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold hover:bg-primary transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">तेज़ लिंक</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-primary transition">होम</Link></li>
            <li><Link to="/courses" className="hover:text-primary transition">कोर्सेज़</Link></li>
            <li><Link to="/colleges" className="hover:text-primary transition">कॉलेजेस</Link></li>
            <li><Link to="/exams" className="hover:text-primary transition">एग्जाम्स</Link></li>
            <li><Link to="/articles" className="hover:text-primary transition">आर्टिकल्स</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">कैटेगरीज़</h4>
          <ul className="space-y-3">
            <li><Link to="/courses?category=Engineering" className="hover:text-primary transition">इंजीनियरिंग</Link></li>
            <li><Link to="/courses?category=Medical" className="hover:text-primary transition">मेडिकल</Link></li>
            <li><Link to="/courses?category=Management" className="hover:text-primary transition">मैनेजमेंट</Link></li>
            <li><Link to="/courses?category=Law" className="hover:text-primary transition">लॉ</Link></li>
            <li><Link to="/courses?category=Commerce" className="hover:text-primary transition">कॉमर्स</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">संपर्क करें</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">📞</span>
              <div>
                <p className="text-sm text-white">हेल्पलाइन</p>
                <p className="text-sm">1800-123-4567</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary mt-0.5">✉️</span>
              <div>
                <p className="text-sm text-white">ईमेल</p>
                <p className="text-sm">support@shiksha.com</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">📍</span>
              <div>
                <p className="text-sm text-white">पता</p>
                <p className="text-sm">नई दिल्ली, भारत</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Shiksha.com. सर्वाधिकार सुरक्षित.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-white transition">निजता नीति</Link>
            <Link to="/" className="hover:text-white transition">सेवा की शर्तें</Link>
            <Link to="/" className="hover:text-white transition">कुकी नीति</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
