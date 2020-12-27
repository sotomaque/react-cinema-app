import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL, API_KEY } from '../const';

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
      const movieResults = response?.data?.results;
      // Get 5 random images for the slide show
      const randomMovies = movieResults
        .sort(() => Math.random() - Math.random())
        .slice(0, 5);

      // update state with movies, heroImages
      setState((prev) => ({
        ...prev,
        movies: [...movieResults],
        heroImages: prev.heroImages || [...randomMovies],
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
