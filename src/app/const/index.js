// ENV VARIABLES
export const __prod__ =
  process.env.NODE_ENV === 'production';

// GQL DOCKER LINKS
export const HTTP_URL = 'http://localhost:8080/v1/graphql';
export const WS_URL = 'ws://localhost:8080/v1/graphql';
// GQL HASURA CLOUD + AWS LINKS
export const HASURA_SECRET =
  process.env.REACT_APP_HASURA_ADMIN_SECRET;
export const HTTPS_URL = process.env.REACT_APP_HTTPS_URL;
export const WSS_URL = process.env.REACT_APP_WSS_URL;

// TMDB VARIABLES
export const API_KEY =
  process.env.REACT_APP_TMDB_API_SECRET;
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMAGE_URL =
  'https://image.tmdb.org/t/p/original';

// QUERY TYPES
export const QUERY_TYPES = Object.freeze({
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  UPCOMING: 'upcoming',
  NOW_PLAYING: 'now_playing',
});

// PAGINGATION TYPES
export const PAGINATION_TYPES = Object.freeze({
  PREV: 'prev',
  NEXT: 'next',
});

// PAGE NAMES
export const PAGES = Object.freeze({
  HOME: 'Home Page',
  LOGIN: 'Login Page',
  REGISTER: 'Register Page',
});

// LOCALES
export const LOCALES = Object.freeze({
  CANCEL: 'CANCEL',
  ENGLISH: 'ENGLISH',
  LOGIN: 'LOGIN',
  MOVIES: 'MOVIES',
  NEXT: 'NEXT',
  NOW_PLAYING: 'NOW_PLAYING',
  POPULAR: 'POPULAR',
  PREV: 'PREV',
  SEARCH: 'SEARCH',
  SET_PRIMARY_LANGUAGE: 'SET_PRIMARY_LANGUAGE',
  SIGN_UP: 'SIGN_UP',
  SPANISH: 'SPANISH',
  TOP_RATED: 'TOP_RATED',
  UPCOMING: 'UPCOMING',
});
