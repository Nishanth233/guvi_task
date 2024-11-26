const API_KEY = "45259d3b";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query, page = 1, type = "") => {
  const response = await fetch(
    `${BASE_URL}?s=${query}&page=${page}&type=${type}&apikey=${API_KEY}`
  );
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  return response.json();
};
