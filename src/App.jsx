import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Services from "./components/ServicePage/Services";
import DomeGallery from "./components/DomeGallery";
import AboutUs from "./components/AboutUs";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import { fetchFaqs } from "./services/fetchFaqs";
import { fetchReviews } from "./services/fetchReviews";
import { fetchServices } from "./services/fetchServices";
import { fetchGallery } from "./services/fetchGallery";
import { fetchTeam } from "./services/fetchTeam";
import Forms from "./components/Forms/Forms";
import LashExtensionForm from "./components/Forms/lashes/LashExtensionForm";
import ScrollToTop from "./common/ScrollToTop";

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
      <ScrollToTop />
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
                <Route path="gallery" element={<DomeGallery />} />
                <Route path="forms" element={<Forms />} />
                <Route
                  path="forms/lash-extension"
                  element={<LashExtensionForm />}
                />
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
