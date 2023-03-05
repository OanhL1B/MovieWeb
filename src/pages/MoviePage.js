import React, { useEffect, useState } from "react";

import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
//https://api.themoviedb.org/3/search/movie?api_key=4942b98510b1078ce139cb7667bf7765
const MoviePage = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=4942b98510b1078ce139cb7667bf7765"
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilerChage = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  // nếu không có data và không có lỗi sẽ cho loading
  const loading = !data && !error;

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=4942b98510b1078ce139cb7667bf7765&query=${filterDebounce}`
      );
    } else {
      setUrl(
        "https://api.themoviedb.org/3/movie/popular?api_key=4942b98510b1078ce139cb7667bf7765"
      );
    }
  }, [filterDebounce]);
  const movies = data?.results || [];

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search"
            onChange={handleFilerChage}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {loading && (
        <div className="w-10 h-10 rounded-full  border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="flex item-center justify-center mt-10 gap-x-5">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="cursor-pointer inline-block text-slate-900 py-2 px-4 rounded bg-white leading-none">
          1
        </span>

        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
