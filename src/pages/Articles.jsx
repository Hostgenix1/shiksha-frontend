import { FileText, Clock, User } from "lucide-react";
import { articles } from "../data/mockData";

const Articles = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-dark mb-2">ब्लॉग और आर्टिकल्स</h1>
        <p className="text-gray-600">
          करियर गाइडेंस, एग्जाम टिप्स और कॉलेज जानकारी के लिए हमारे ब्लॉग पढ़ें
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="card hover:shadow-lg transition-shadow group">
            <div className="h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2 uppercase tracking-wider">
                <FileText className="w-3 h-3" />
                {article.category}
              </div>
              <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>Shiksha Team</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
                <span>{article.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default Articles;
