import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
const Banner = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=4942b98510b1078ce139cb7667bf7765`,
    fetcher
  );

  const movie = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path } = item;
  return (
    <div className="w-full h-full rounded-lg bg-white relative">
      {/* Phủ bóng đổ lên ảnh */}
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{item.title}</h2>
        <div className="flex item-center gap-x-3 mb-3">
          <div className="py-2 px-4 border border-white rounded-md ">
            Action
          </div>
          <div className="py-2 px-4 border border-white rounded-md ">
            Adventure
          </div>
          <div className="py-2 px-4 border border-white rounded-md ">Drama</div>
        </div>
        <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
}
export default Banner;
