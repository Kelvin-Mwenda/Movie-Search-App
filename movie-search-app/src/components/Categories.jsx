import PropTypes from "prop-types";
import "./Categories.css";

const Categories = ({ activeCategory, onCategoryClick }) => {
  const categories = ["All", "Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul className="categories-list">
        {categories.map((category) => (
          <li 
            key={category} 
            className={`category-item ${activeCategory === category ? "active" : ""}`}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default Categories;
