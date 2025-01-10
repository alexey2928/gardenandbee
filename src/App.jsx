import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Main from "./components/Main";
import ComingSoon from "./components/ComingSoon";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
