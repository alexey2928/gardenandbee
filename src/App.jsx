import React, { useEffect, useState } from "react";
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
import ScrollToTop from "./common/ScrollToTop";
import LashExtensionForm from "./components/Forms/lashExt/LashExtensionForm";
import LashLiftForm from "./components/Forms/lashLift/LashLiftForm";
import AdminPage from "./components/Admin/AdminPage";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminLogin from "./components/Admin/AdminLogin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchConsents } from "./services/fetchConsents";
import ThreadingWaxingForm from "./components/Forms/threadingWaxing/ThreadingWaxingForm";
import BrowShapingForm from "./components/Forms/browShaping/BrowShapingForm";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    dispatch(fetchConsents());
  }, [dispatch]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdTokenResult(true);
        setUser({
          ...currentUser,
          claims: token.claims,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main page without Navbar & Footer */}
        <Route path="/" element={<Main />} />
        <Route path="/admin-login" element={<AdminLogin />} />

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
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute user={user}>
                      <AdminPage user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route path="forms" element={<Forms />} />
                <Route
                  path="forms/lash-extension"
                  element={<LashExtensionForm />}
                />
                <Route path="forms/lash-lift" element={<LashLiftForm />} />
                <Route
                  path="forms/threading-waxing"
                  element={<ThreadingWaxingForm />}
                />
                <Route
                  path="forms/brow-shaping"
                  element={<BrowShapingForm />}
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
