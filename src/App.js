import { Fragment } from "react";
import Banner from "./components/banner/Banner";
// import { NavLink } from "react-router-dom";
import "swiper/scss";

import MovieList from "./components/movie/MovieList";

function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
        <span className="text-primary">Home</span>
        <span>Movie</span>
      </header>
      <Banner></Banner>
      <section className="movie-layout page-container pb-20 ">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movie-layout page-container pb-20 ">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Top rating
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movie-layout page-container pb-20 ">
        <h2 className="capitalize text-white mb-10 text-2xl font-bold">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
}

export default App;
