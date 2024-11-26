import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query, type);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="border border-gray-300 p-2 rounded-md"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
      >
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
