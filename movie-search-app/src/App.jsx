import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Categories from "./components/Categories";
import './styles.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch movies based on a query (title or broader search)
  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_ID}&s=${query}`
      );
      if (response.data.Response === "True") {
        const moviesWithDetails = await Promise.all(
          response.data.Search.map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details };
          })
        );

        setMovies(moviesWithDetails.sort((a, b) => b.Year - a.Year)); // Sort by year
        setError("");
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  // Fetch detailed information about a specific movie (to access genre, plot, etc.)
  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_ID}&i=${imdbID}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return {};
    }
  };

  // Fetch movies by category (genre)
  const fetchMoviesByCategory = async (category) => {
    setActiveCategory(category);

    if (category === "All") {
      fetchMovies("movie");
      return;
    }

    try {
      // Fetch movies based on a broader query
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_ID}&s=${category}`
      );

      if (response.data.Response === "True") {
        const moviesWithDetails = await Promise.all(
          response.data.Search.map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details };
          })
        );

        // Filter movies by genre
        const filteredMovies = moviesWithDetails.filter((movie) =>
          movie.Genre?.toLowerCase().includes(category.toLowerCase())
        );

        // Sort by release year (descending order)
        setMovies(filteredMovies.sort((a, b) => b.Year - a.Year));
        setError("");
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchMovies("movie"); // Fetch popular movies by default
  }, []);

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      <div className="content">
        <aside className="sidebar">
          <Categories 
            activeCategory={activeCategory} 
            onCategoryClick={fetchMoviesByCategory} 
          />
        </aside>
        <main className="main-content">
          {error && <p className="error">{error}</p>}
          <MovieList 
            movies={movies} 
            expandedCard={expandedCard} 
            setExpandedCard={setExpandedCard} 
          />
        </main>
      </div>
    </div>
  );
};

export default App;
