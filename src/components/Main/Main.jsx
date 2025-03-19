import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LINK_BOOK_NOW } from "../../common/links";
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from "../../common/styles";
import MainFooter from "./MainFooter";

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
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="Garden and Bee"
                className="logo h-auto max-w-full"
                loading="eager"
              />
              <h1 className="hidden">Garden and Bee Beauty Salon</h1>
              <h1 className="text-primary_dark px-3 pb-3 text-sm font-semibold ">
                LASHES | BROWS | MAKEUP | FACIALS
              </h1>
            </div>

            <div>
              <div className="flex space-x-4 items-center justify-center text-base md:text-lg lg:text-xl">
                <a
                  href={LINK_BOOK_NOW}
                  className={PRIMARY_BUTTON}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now
                </a>
                <button onClick={handleVisitSite} className={SECONDARY_BUTTON}>
                  Visit Site
                </button>
              </div>
            </div>
          </div>
          <MainFooter />
        </div>
        <div className="relative hidden lg:block lg:w-1/2 bg-cover bg-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/liliya.jpg?alt=media&token=49aeae4a-03b1-454c-b814-eea8fc313f84"
            alt="Liliya"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-background/10 z-10"></div>
        </div>
      </div>
    </>
  );
};

export default Main;
