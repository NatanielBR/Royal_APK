import axios from 'axios';

const TMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const TMDB_Images = axios.create({
  baseURL: 'https://image.tmdb.org/t/p/original',
});

export default TMDB;
