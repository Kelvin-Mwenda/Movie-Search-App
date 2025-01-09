import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import './styles.css';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${query}`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
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

  return (
    <div>
      <h1>Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
