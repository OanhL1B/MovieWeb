import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import useSWR from "swr";
// import { fetcher } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=4942b98510b1078ce139cb7667bf7765&language=en-US&page=1
const MovieList = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [movies, setMovies] = useState([]);

  const { data, error } = useSWR(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=4942b98510b1078ce139cb7667bf7765",
    fetcher
  );
  useEffect(() => {
    setMovies(data.results);
  }, [data]);

  console.log(movies);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MovieList;
