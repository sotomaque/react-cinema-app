// ENV VARIABLES
export const __prod__ =
  process.env.NODE_ENV === 'production';

// GQL
export const HTTP_URL = 'http://localhost:8080/v1/graphql';
export const WS_URL = 'ws://localhost:8080/v1/graphql';

// TMDB VARIABLES
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMAGE_URL =
  'https://image.tmdb.org/t/p/original';
export const API_KEY =
  process.env.REACT_APP_TMDB_API_SECRET;
export const HASURA_SECRET =
  process.env.REACT_APP_HASURA_ADMIN_SECRET;
