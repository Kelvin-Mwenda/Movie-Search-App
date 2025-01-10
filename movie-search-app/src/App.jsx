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
  const [activeCategory, setActiveCategory] = useState("All"); // Track the active category

  // Fetch movies based on a query (title or category)
  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_ID}&s=${query}`
      );
      if (response.data.Response === "True") {
        const sortedMovies = response.data.Search.sort((a, b) => b.Year - a.Year);
        setMovies(sortedMovies);
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

  // Fetch movies by category
  const fetchMoviesByCategory = async (category) => {
    setActiveCategory(category);
    const query = category === "All" ? "popular" : category; // Default query for "All"
    fetchMovies(query);
  };

  useEffect(() => {
    fetchMovies("popular"); // Fetch popular movies by default
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
