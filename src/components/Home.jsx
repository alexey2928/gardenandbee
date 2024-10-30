import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="bg-slate/40 h-screen flex flex-col items-center justify-center space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Garden and bee is coming soon!</h1>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 items-center justify-center">
        <button className="bg-[#b68b40] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#a57a36] transition">
          Book Now
        </button>
        <button
          onClick={handleGoBack}
          className="bg-transparent text-[#b68b40] px-6 py-3 rounded-md text-lg font-semibold border border-[#b68b40] hover:bg-[#b68b40] hover:text-white transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Home;
