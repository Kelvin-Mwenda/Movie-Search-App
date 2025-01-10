import { useState } from "react"; 
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  // State to hold the current search query
  const [query, setQuery] = useState("");

  // Function to trigger the search when the user clicks the search button
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); // Call the parent's fetchMovies function with the query
    }
  };

  return (
    <div>
      {/* Input field to capture the search query */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update state on input change
        placeholder="Search for a movie..."
      />
      {/* Button to trigger the search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

// Define prop types for the SearchBar component
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch must be a function and is required
};

export default SearchBar;
