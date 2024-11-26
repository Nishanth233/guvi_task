import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <img
      src={movie.Poster}
      alt={movie.Title}
      className="w-full h-48 rounded-md mb-4 border border-black"
    />
    <h2 className="text-xl font-bold mb-2">{movie.Title}</h2>
    <p className="text-gray-700 mb-2">{movie.Year}</p>
    <Link
      to={`/movie/${movie.imdbID}`}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Details
    </Link>
  </div>
);

export default MovieCard;
