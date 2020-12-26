import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../const';

export const usePopularMoviesFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPopularMovies = async (endpoint) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search('page');

    try {
      const movieResult = await (
        await fetch(endpoint)
      ).json();
      const randomIndex = Math.floor(Math.random() * 20);

      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...movieResult.results]
            : [...movieResult.results],
        heroImage:
          prev.heroImage ||
          movieResult.results[randomIndex],
        currentPage: movieResult.page,
        totalPages: movieResult.total_pages,
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
