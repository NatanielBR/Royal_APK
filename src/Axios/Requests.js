const API_KEY = '5a7e859a062b26ef282595be083f07fb';

const TMDBrequests = {
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=pt`,

  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=pt-BR`,

  fetchAnime: `/keyword/210024/movies?api_key=${API_KEY}&language=pt-BR&include_adult=true`,

  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,

  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=pt-BR`,

  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=pt-BR`,

  fetchGenre: `/discover/movie?api_key=${API_KEY}&with_genres=`,

  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=pt-BR`,

  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=pt-BR`,

  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=pt-BR`,

  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=pt-BR`,

  fetchBackImg: `/movie/634649?api_key=${API_KEY}&language=pt-BR`,

  fetchMovieById: `?api_key=${API_KEY}&language=pt-BR`,
};

export default TMDBrequests;
