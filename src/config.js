export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "4942b98510b1078ce139cb7667bf7765";
const tmdbEndPoint = "https://api.themoviedb.org/3/movie/";
const tmdbEndPointSearch = "https://api.themoviedb.org/3/search/movie";

export const tmdbAPI = {
  // &language=en-US&page=1
  getMovieList: (type, page = 1) =>
    `${tmdbEndPoint}${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdbEndPoint}${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndPoint}${movieId}/${type}?api_key=${apiKey}`,
  // https://api.themoviedb.org/3/search/movie?api_key=4942b98510b1078ce139cb7667bf7765
  getMovieSeach: (query, page) =>
    `${tmdbEndPointSearch}?api_key=${apiKey}&page=${page}&query=${query}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
