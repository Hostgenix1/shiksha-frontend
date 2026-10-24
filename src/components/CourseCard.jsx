import { Link } from "react-router-dom";
import { Star, Users, IndianRupee } from "lucide-react";

const CourseCard = ({ course }) => (
  <Link to={`/courses/${course.id}`} className="card group">
    <div className="relative h-48 overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded text-xs font-medium shadow-lg flex items-center gap-1">
        {course.rating} <Star className="w-3 h-3 fill-current" />
      </div>
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
        {course.duration}
      </div>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary font-medium text-xs uppercase tracking-wider">
          {course.category}
        </span>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Users className="w-3 h-3" /> {course.students}
        </div>
      </div>
      <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition">
        {course.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-primary font-bold">
          <IndianRupee className="w-4 h-4" /> {course.fee}
        </div>
        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <Star className="w-3 h-3 fill-yellow-400" />
          <span className="font-medium">{course.rating}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default CourseCard;
