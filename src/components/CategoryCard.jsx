import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => (
  <Link
    to={`/courses?category=${encodeURIComponent(category.name)}`}
    className="card p-6 text-center hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer"
  >
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {category.icon}
    </div>
    <h3 className="text-sm md:text-lg font-bold group-hover:text-white transition-colors">
      {category.name}
    </h3>
    <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-200 mt-2">
      {category.courseCount} कोर्सेज़
    </p>
  </Link>
);

export default CategoryCard;
