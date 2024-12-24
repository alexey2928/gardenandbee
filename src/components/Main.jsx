import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import logo from "../images/logo.png";
import liliya from "../images/liliya.jpeg";
import Footer from "./Footer";
import { LINK_BOOK_NOW } from "../helpers/links";

const Main = () => {
  const navigate = useNavigate();
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );
  const [isSmallLandscape, setIsSmallLandscape] = useState(
    window.innerWidth < 1024 && isLandscape
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      const landscape = window.matchMedia("(orientation: landscape)").matches;
      setIsLandscape(landscape);
      setIsSmallLandscape(window.innerWidth < 1024 && landscape);
    };
    const handleResize = () => {
      // Update the small landscape state based on both conditions
      setIsSmallLandscape(window.innerWidth < 1024 && isLandscape);
    };
    // Set the initial state
    setIsSmallLandscape(window.innerWidth < 1024 && isLandscape);

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("resize", handleResize);
    // Cleanup the event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLandscape]);

  const handleVisitSite = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full lg:w-1/2 flex flex-col justify-evenly">
          <div
            className={`flex ${
              isSmallLandscape ? "flex-row" : "flex-col"
            } items-center justify-center`}
          >
            <div
              className={`flex flex-col items-center ${
                isSmallLandscape ? "w-1/2" : "w-full mb-10"
              }`}
            >
              <img
                src={logo}
                alt="Garden and Bee"
                className="logo h-auto max-w-full"
              />
              <h1 className="hidden">Garden and Bee Beauty Salon</h1>
              <h1 className="text-[#704415] px-3 pb-3 text-sm font-semibold ">
                LASHES | BROWS | MAKEUP | FACIALS
              </h1>
            </div>

            <div>
              <div className="flex space-x-4 items-center justify-center text-base md:text-lg lg:text-xl">
                <a
                  href={LINK_BOOK_NOW}
                  className="bg-[#704415] text-white px-5 py-3 rounded-md  font-semibold hover:bg-[#b68b40] transition whitespace-nowrap"
                >
                  Book Now
                </a>
                <button
                  onClick={handleVisitSite}
                  className="bg-transparent text-[#704415] px-5 py-3 rounded-md font-semibold border border-[#704415] hover:bg-[#b68b40] hover:text-white transition whitespace-nowrap"
                >
                  Visit Site
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <div className="relative hidden lg:block lg:w-1/2 bg-cover bg-center">
          <img
            src={liliya}
            alt="Liliya"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#F5EFF2]/10 z-10"></div>
        </div>
      </div>
    </>
  );
};

export default Main;
