import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_KEY, API_URL, IMAGE_URL } from '../const';

/**
 * hook used to make a request to
 * `movie/now_playing` endpoint
 *
 * @returns [{ state, loading, error}, fetchNowPlayingMovies]
 */
export const useNowPlayingMoviesFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNowPlayingMovies = async () => {
    setError(false);
    setLoading(true);

    try {
      const response = await axios.get(
        `${API_URL}movie/now_playing?api_key=${API_KEY}`,
      );
      const tempMovieResults = response?.data?.results;
      const movieResults = [];
      tempMovieResults.forEach((movie) => {
        movieResults.push({
          ...movie,
          url: `${IMAGE_URL}${movie.backdrop_path}`,
        });
      });
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
    fetchNowPlayingMovies(
      `${API_URL}movie/now_playing?api_key=${API_KEY}`,
    );
  }, []);

  return [{ state, loading, error }, fetchNowPlayingMovies];
};
