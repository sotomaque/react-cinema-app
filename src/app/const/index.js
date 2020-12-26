export const __prod__ =
  process.env.NODE_ENV === 'production';
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMAGE_URL =
  'https://image.tmdb.org/t/p/original';
export const API_KEY =
  process.env.REACT_APP_TMDB_API_SECRET;
