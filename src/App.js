import { Fragment } from "react";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-10">
        <span className="text-primary">Home</span>
        <span>Movie</span>
      </header>
      <section className="banner h-[400px] page-container">
        <div className="w-full h-full rounded-lg bg-white relative">
          {/* Phủ bóng đổ lên ảnh */}
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
          <img
            src="https://vtv1.mediacdn.vn/2019/4/26/poster-payoff-1-1556273680151870157160-crop-1556273779257196175768.jpg"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute left-5 bottom-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-5">Avengers: Endgame</h2>
            <div className="flex item-center gap-x-3 mb-3">
              <div className="py-2 px-4 border border-white rounded-md ">
                Action
              </div>
              <div className="py-2 px-4 border border-white rounded-md ">
                Adventure
              </div>
              <div className="py-2 px-4 border border-white rounded-md ">
                Drama
              </div>
            </div>
            <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
              Watch Now
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
