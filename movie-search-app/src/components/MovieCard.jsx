import PropTypes from "prop-types";
import "./MovieCard.css";

const MovieCard = ({ movie, isExpanded, toggleExpand }) => {
  return (
    <div
      className={`movie-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
        className="movie-poster"
      />
      
      <div className="movie-details">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">Year Released: {movie.Year}</p>
        <div className={`movie-synopsis ${isExpanded ? "full" : ""}`}>
          {movie.Plot || "No description available."}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    Plot: PropTypes.string,
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toggleExpand: PropTypes.func.isRequired,
};

export default MovieCard;
