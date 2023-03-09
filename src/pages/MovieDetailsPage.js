import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "components/movie/MovieCard";
import { tmdbAPI } from "config";

//https://api.themoviedb.org/3/movie/{movie_id}?4942b98510b1078ce139cb7667bf7765

const MovieDetailsPage = () => {
  // lấy được thông số 123456 chính là id của phim
  const { movieId } = useParams();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
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
          src={tmdbAPI.imageOriginal(poster_path)}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>

      <h1 className="text-center font-bold text-4xl text-white mb-10">
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
      <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
  const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10">Casts</h2>
        <div className="mx-20">
          <div className="grid grid-cols-4 gap-x-5">
            {/* splice cắt đổ thành 1 mảng mới 4 người */}
            {cast.splice(0, 4).map((item) => (
              <div className="cast-item" key={item.id}>
                <img
                  src={tmdbAPI.imageOriginal(item.profile_path)}
                  className="w-full h-[350px] object-cover rounded-lg mb-3"
                  alt=""
                />
                <h3 className="text-xl font-medium">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.splice(0, 2).map((item) => (
              <div key={item.id}>
                <h3 className="mb-3 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="942"
                    height="530"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Thị Mầu - Hòa Minzy x Masew | Official Music Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

// function MovieCredits() {
//   const { movieId } = useParams();

//   const fetcher = (...args) => fetch(...args).then((res) => res.json());
//   // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
//   const { data, error } = useSWR(
//     tmdbAPI.getMovieMeta(movieId, "credits"),
//     fetcher
//   );
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h2 className="text-center text-3xl mb-10">Casts</h2>
//       <div className="mx-20">
//         <div className="grid grid-cols-4 gap-x-5">
//           {/* splice cắt đổ thành 1 mảng mới 4 người */}
//           {cast.splice(0, 4).map((item) => (
//             <div className="cast-item" key={item.id}>
//               <img
//                 src={tmdbAPI.imageOriginal(item.profile_path)}
//                 className="w-full h-[350px] object-cover rounded-lg mb-3"
//                 alt=""
//               />
//               <h3 className="text-xl font-medium">{item.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function MovieVideos() {
//   const { movieId } = useParams();

//   const fetcher = (...args) => fetch(...args).then((res) => res.json());
//   // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>
//   const { data, error } = useSWR(
//     tmdbAPI.getMovieMeta(movieId, "videos"),
//     fetcher
//   );
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   //   console.log(data);

//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.splice(0, 2).map((item) => (
//           <div key={item.id}>
//             <h3 className="mb-3 text-xl font-medium p-3 bg-secondary inline-block">
//               {item.name}
//             </h3>
//             <div className="w-full aspect-video">
//               <iframe
//                 width="942"
//                 height="530"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="Thị Mầu - Hòa Minzy x Masew | Official Music Video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//                 className="w-full h-full object-fill"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieSimilar() {
//   const { movieId } = useParams();

//   const fetcher = (...args) => fetch(...args).then((res) => res.json());
//   // https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>
//   const { data, error } = useSWR(
//     tmdbAPI.getMovieMeta(movieId, "similar"),
//     fetcher
//   );

//   if (!data) return null;
//   const { results } = data;
//   if (!results || results <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.map((item) => (
//             <SwiperSlide key={item.id}>
//               <MovieCard item={item}></MovieCard>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }
export default MovieDetailsPage;
