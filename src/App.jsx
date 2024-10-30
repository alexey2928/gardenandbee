import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Main from "./components/Main";
import Home from "./components/Home";

const App = () => {
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };
    preloadImage(require("./images/liliya.jpeg"));
    preloadImage(require("./images/logo.png"));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
