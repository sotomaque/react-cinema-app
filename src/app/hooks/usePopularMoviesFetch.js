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
      const randomIndex = Math.floor(Math.random() * 20);
      const movieResults = response?.data?.results;
      const currentPage = response?.data?.page;
      const totalPages = response?.data?.total_pages;
      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...movieResults]
            : [...movieResults],
        heroImage:
          prev.heroImage || movieResults[randomIndex],
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
