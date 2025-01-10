import PropTypes from "prop-types"; // Import PropTypes for prop validation
import MovieCard from "./MovieCard";
import "./MovieList.css"; // Import the stylesheet for styling

const MovieList = ({ movies }) => {
  return (
    <div className="movie-page-container">
      

      {/* Main content area for movies */}
      <div className="movies-section">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// Define the expected prop types for MovieList
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string,
      Poster: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;
