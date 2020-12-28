import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL, API_KEY, IMAGE_URL } from '../const';

/**
 * hook used to make a request to
 * `movie/top_rated` endpoint
 *
 * @returns [{ state, loading, error}, fetchTopRatedMovies]
 */
export const useTopRatedMoviesFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTopRatedMovies = async () => {
    setError(false);
    setLoading(true);

    try {
      const response = await axios.get(
        `${API_URL}movie/top_rated?api_key=${API_KEY}`,
      );
      const tempMovieResults = response?.data?.results;
      const movieResults = [];
      tempMovieResults.forEach((movie) => {
        movieResults.push({
          ...movie,
          url: `${IMAGE_URL}${movie.backdrop_path}`,
        });
      });
      const currentPage = response?.data?.page;
      const totalPages = response?.data?.total_pages;
      // Get 5 random images for the slide show
      const randomMovies = movieResults
        .sort(() => Math.random() - Math.random())
        .slice(0, 5);

      // update state with movies, heroImages
      setState((prev) => ({
        ...prev,
        movies: [...movieResults],
        heroImages: prev.heroImages || [...randomMovies],
        currentPage,
        totalPages,
      }));
    } catch (error) {
      setError(true);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTopRatedMovies(
      `${API_URL}movie/top_rated?api_key=${API_KEY}`,
    );
  }, []);

  return [{ state, loading, error }, fetchTopRatedMovies];
};
