import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Main from "./components/Main/Main";
import ComingSoon from "./components/ComingSoon";
import Home from "./components/Home/Home";
import { fetchGoogleReviews } from "./services/fetchGoogleReviews";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/Gallery";
import Layout from "./components/Layout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoogleReviews());
  }, [dispatch]);
  return (
    <>
      <Routes>
        {/* Main page without Navbar & Footer */}
        <Route path="/" element={<Main />} />

        {/* All other pages wrapped in Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
