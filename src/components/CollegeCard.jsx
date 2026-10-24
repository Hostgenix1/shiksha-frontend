import { Link } from "react-router-dom";
import { Star, MapPin, Building2 } from "lucide-react";

const CollegeCard = ({ college }) => (
  <Link to={`/colleges/${college.id}`} className="card group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3 bg-white text-dark px-2.5 py-1 rounded text-xs font-bold shadow-lg">
        NIRF #{college.nirfRank}
      </div>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
          {college.type}
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <MapPin className="w-3 h-3" /> {college.location.split(",")[0]}
        </div>
      </div>
      <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition">
        {college.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{college.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <Building2 className="w-3 h-3" />
          <span className="ml-1">{college.courses.length} कोर्सेज़</span>
        </div>
        <div className="flex items-center gap-1 text-primary font-bold">
          <Star className="w-3 h-3 fill-yellow-400" />
          <span className="ml-0.5">{college.rating}</span>
          <span className="ml-1 text-xs text-gray-400">({college.reviews})</span>
        </div>
      </div>
    </div>
  </Link>
);

export default CollegeCard;
