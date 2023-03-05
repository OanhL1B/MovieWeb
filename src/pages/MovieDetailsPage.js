import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

//https://api.themoviedb.org/3/movie/{movie_id}?4942b98510b1078ce139cb7667bf7765
const MovieDetailsPage = () => {
  // lấy được thông số
  const { movieId } = useParams();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=4942b98510b1078ce139cb7667bf7765`,
    fetcher
  );
  console.log(data);
  return <div>Movie Details Page</div>;
};

export default MovieDetailsPage;
