import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Globe, AtSign, Rss, Send } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Colleges", to: "/colleges" },
      { label: "Courses", to: "/courses" },
      { label: "Entrance Exams", to: "/exams" },
      { label: "Articles", to: "/articles" },
      { label: "Rankings", to: "/colleges" },
    ],
  },
  {
    title: "Popular Streams",
    links: [
      { label: "Engineering", to: "/courses?category=Engineering" },
      { label: "Medical", to: "/courses?category=Medical" },
      { label: "Management", to: "/courses?category=Management" },
      { label: "Law", to: "/courses?category=Law" },
      { label: "Commerce", to: "/courses?category=Commerce" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Contact", to: "/" },
      { label: "Privacy policy", to: "/" },
      { label: "Terms of use", to: "/" },
    ],
  },
];

const socials = [
  { icon: Globe, href: "#" },
  { icon: AtSign, href: "#" },
  { icon: Rss, href: "#" },
  { icon: Send, href: "#" },
];

const Footer = () => (
  <footer className="bg-dark text-slate-400">
    <div className="container-x py-14">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Brand + newsletter */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Shiksha<span className="text-accent">.com</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            India&apos;s trusted education portal. Compare colleges, explore courses and
            stay ahead with exam updates — all in one place.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex max-w-sm overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 flex gap-2">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:bg-primary hover:text-white"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {column.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <p className="text-slate-500">Helpline</p>
              <p className="text-slate-300">1800 123 4567</p>
            </li>
            <li>
              <p className="text-slate-500">Email</p>
              <p className="text-slate-300">support@shiksha.com</p>
            </li>
            <li>
              <p className="text-slate-500">Head office</p>
              <p className="text-slate-300">New Delhi, India</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row">
        <p>© {new Date().getFullYear()} Shiksha.com. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="transition hover:text-white">
            Privacy
          </Link>
          <Link to="/" className="transition hover:text-white">
            Terms
          </Link>
          <Link to="/" className="transition hover:text-white">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
