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
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="pb-10">
      <div className="w-full h-[600px] relative">
        {/* tạo lớp phủ, phủ lên mờ mờ */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>

      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>

      <h1 className="text-center font-bold text-3xl text-white mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="item-center flex gap-x-5 mb-10 text-white justify-center">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary rounded border text-primary "
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <div className="text-center text-sm leading-relaxed max-w-[600px] mx-auto">
        {overview}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
