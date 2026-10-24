import { useState } from "react";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/courses?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary to-dark text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary mb-6 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            नए एडमिशन खुले हैं 2026-27 के लिए
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            अपने करियर का सही रास्ता चुनें
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            भारत के टॉप कॉलेजेस, कोर्सेज़ और एग्जाम्स की पूरी जानकारी एक ही जगह। अपना सपना पूरा करें।
          </p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="कोर्स, कॉलेज या एग्जाम खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 justify-center"
            >
              खोजें <Search className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
            <div className="px-4 py-3 bg-white/10 backdrop-blur rounded-xl border border-white/10">
              <div className="text-2xl font-bold">50k+</div>
              <div className="text-sm text-gray-300">कोर्सेज़</div>
            </div>
            <div className="px-4 py-3 bg-white/10 backdrop-blur rounded-xl border border-white/10">
              <div className="text-2xl font-bold">5k+</div>
              <div className="text-sm text-gray-300">कॉलेजेस</div>
            </div>
            <div className="px-4 py-3 bg-white/10 backdrop-blur rounded-xl border border-white/10">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-gray-300">एग्जाम्स</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
