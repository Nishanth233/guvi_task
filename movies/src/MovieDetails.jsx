import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "./api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };
    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className=" h-96 rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
      <p className="text-gray-700 mb-2">{movie.Year}</p>
      <p className="text-gray-600 mb-4">{movie.Plot}</p>
      <p className="text-gray-700 mb-2">
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Director:</strong> {movie.Director}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Ratings:</strong> {movie.imdbRating}
      </p>
    </div>
  );
};

export default MovieDetails;
