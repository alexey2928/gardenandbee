import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Services from "./components/ServicePage/Services";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/Gallery";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import { fetchFaqs } from "./services/fetchFaqs";
import { fetchReviews } from "./services/fetchReviews";
import { fetchServices } from "./services/fetchServices";
import { fetchGallery } from "./services/fetchGallery";
import { fetchTeam } from "./services/fetchTeam";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTeam());
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
