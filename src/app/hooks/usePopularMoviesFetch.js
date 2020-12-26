import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL, API_KEY } from '../const';

/**
 * hook used to make a request to
 * `movie/popular` endpoint
 *
 * @returns [{ state, loading, error}, fetchPopularMovies]
 */
export const usePopularMoviesFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPopularMovies = async (endpoint) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search('page');

    try {
      const response = await axios.get(
        `${API_URL}movie/popular?api_key=${API_KEY}`,
      );
      const movieResults = response?.data?.results;
      const currentPage = response?.data?.page;
      const totalPages = response?.data?.total_pages;
      // Get 5 random images for the slide show
      const randomMovies = movieResults
        .sort(() => Math.random() - Math.random())
        .slice(0, 5);

      // update state with movies, heroImages, currentPage, totalPages
      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...movieResults]
            : [...movieResults],
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
    fetchPopularMovies(
      `${API_URL}movie/popular?api_key=${API_KEY}`,
    );
  }, []);

  return [{ state, loading, error }, fetchPopularMovies];
};
