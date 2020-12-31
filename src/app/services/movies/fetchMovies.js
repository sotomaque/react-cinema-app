import axios from 'axios';

import { API_URL, API_KEY } from 'app/const';

const fetchMovies = async ({
  type = 'popular',
  page = '1',
}) => {
  // TODO: VARIABLE LANGUAGE
  const LINK = `${API_URL}movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`;
  const response = await axios.get(LINK);
  return response;
};

export default fetchMovies;
