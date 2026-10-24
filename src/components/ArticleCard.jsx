import { Clock, Folder } from "lucide-react";

const ArticleCard = ({ article }) => (
  <article className="card group">
    <div className="h-48 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2 uppercase tracking-wider">
        <Folder className="w-3 h-3" />
        {article.category}
      </div>
      <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition line-clamp-2">
        {article.title}
      </h3>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{article.readTime}</span>
        </div>
        <span>{article.date}</span>
      </div>
    </div>
  </article>
);

export default ArticleCard;
