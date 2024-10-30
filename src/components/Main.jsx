import React from "react";
import main from "../images/main.jpg";
import logo from "../images/logo.png";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();

  const handleVisitSite = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="absolute inset-0 bg-neutral-400/20 z-10"></div>
      <div
        className="h-screen bg-fixed bg-cover bg-center bg-[#f5eff2]"
        // style={{ backgroundImage: `url(${main})` }}
      >
        {/* Overlay */}

        <div className="relative flex flex-col items-center justify-center space-y-4 self-center top-10">
          {/* <div className="z-20"> */}
          <img
            src={logo}
            alt="logo"
            className="sm:w-full md:w-6/12 lg:w-4/12 z-20"
          />
          {/* </div> */}

          <div className="flex space-x-4 items-center justify-center z-20">
            <button className="bg-[#b68b40] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#a57a36] transition">
              Book Now
            </button>
            <button
              onClick={handleVisitSite}
              className="bg-transparent text-[#b68b40] px-6 py-3 rounded-md text-lg font-semibold border border-[#b68b40] hover:bg-[#b68b40] hover:text-white transition"
            >
              Visit Site
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
