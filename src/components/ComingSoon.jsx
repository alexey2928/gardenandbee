import React from "react";
import { useNavigate } from "react-router";
import { LINK_BOOK_NOW } from "../helpers/links";
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from "../helpers/styles";

const ComingSoon = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-semibold">Garden and bee is coming soon!</h1>

      <div className="flex space-x-4 items-center justify-center text-base md:text-lg lg:text-xl">
        <a href={LINK_BOOK_NOW} className={PRIMARY_BUTTON}>
          Book Now
        </a>
        <button onClick={handleGoBack} className={SECONDARY_BUTTON}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
