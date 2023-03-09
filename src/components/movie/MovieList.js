import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";

import MovieCard from "./MovieCard";
import useSWR from "swr";
import { tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

// https://api.themoviedb.org/3/movie/now_playing?api_key=4942b98510b1078ce139cb7667bf7765&language=en-US&page=1
const MovieList = ({ type = "now_playing" }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [movies, setMovies] = useState([]);

  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-50">
      Something went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
