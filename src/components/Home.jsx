import React from "react";
import { useNavigate } from "react-router";
import { LINK_BOOK_NOW } from "../helpers/links";

const Home = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-semibold">Garden and bee is coming soon!</h1>

      <div className="flex space-x-4 items-center justify-center text-base md:text-lg lg:text-xl">
        <a
          href={LINK_BOOK_NOW}
          className="bg-[#704415] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#b68b40] transition whitespace-nowrap"
        >
          Book Now
        </a>
        <button
          onClick={handleGoBack}
          className="bg-transparent text-[#704415] px-6 py-3 rounded-md font-semibold border border-[#704415] hover:bg-[#b68b40] hover:text-white transition whitespace-nowrap"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Home;
