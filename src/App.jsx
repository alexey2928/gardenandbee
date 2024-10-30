import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Main from "./components/Main";
import Home from "./components/Home";

const App = () => {
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };

    preloadImage(require("./images/main.jpg")); // Preload the image
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
