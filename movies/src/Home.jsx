import React, { useState, useEffect } from "react";
import { fetchMovies } from "./api";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Pagination from "./Pagination";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (query) {
      handleSearch(query, type, currentPage);
    }
  }, [currentPage]);

  const handleSearch = async (searchQuery, searchType, page = 1) => {
    setLoading(true);
    setQuery(searchQuery);
    setType(searchType);
    setCurrentPage(page);

    try {
      const data = await fetchMovies(searchQuery, page, searchType);
      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
        setError(null);
      } else {
        setMovies([]);
        setTotalPages(1);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies");
      setMovies([]);
      setTotalPages(1);
    }

    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <MovieList movies={movies} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
