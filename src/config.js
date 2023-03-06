export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "4942b98510b1078ce139cb7667bf7765";
const tmdbEndPoint = "https://api.themoviedb.org/3/movie/";

export const tmdbAPI = {
  // &language=en-US&page=1
  getMovieList: (type) => `${tmdbEndPoint}${type}?api_key=${apiKey}`,
  getMovieDetail: (movieId) => `${tmdbEndPoint}${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndPoint}${movieId}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
