import React, { useEffect, useState } from "react";
import { MdEvent, MdLogout } from "react-icons/md";
import { LINK_BOOK_NOW } from "../common/links";
import { PRIMARY_BUTTON } from "../common/styles";
import HamburgerButton from "./HamburgerButton";
import HamburgerMenu from "./HamburgerMenu";
import Navlink from "../common/Navlink";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFooter, setIsFooter] = useState(false);
  const [height, setHeight] = useState("auto");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
    window.scrollTo(0, 0);
  };

  // 🧭 Detect if on /admin route
  const isAdminRoute = location.pathname === "/admin";

  // 🔐 Check if user has admin claim
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(!!token.claims.admin);
      } else {
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // 🧩 Handle responsive height & body scroll
  useEffect(() => {
    const updateStyles = () => {
      const isMobile = window.innerWidth < 1024;
      const isTallEnough = window.innerHeight > 600;

      if (isOpen && isMobile && isTallEnough) {
        document.body.style.overflow = "hidden";
        setIsFooter(true);
        setHeight("calc(100vh - 240px)");
      } else {
        document.body.style.overflow = "";
        setIsFooter(false);
        setHeight("auto");
      }
    };

    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const isTooShort = window.innerHeight < 600;

      if (!isMobile || isTooShort) {
        document.body.style.overflow = "";
        setIsFooter(false);
        setHeight("auto");
      } else {
        setIsFooter(true);
        setHeight("calc(100vh - 240px)");
      }
    };

    updateStyles();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      <header className="bg-transparent w-full max-h-40 bg-cover flex items-center justify-start">
        <div className="max-w-xl">
          <img
            src={`${process.env.PUBLIC_URL}/images/text.png`}
            alt="Garden and Bee"
            loading="eager"
          />
          <h1 className="hidden">Garden and Bee Beauty Salon</h1>
        </div>
      </header>

      <header className="sticky top-0 h-20 w-full flex items-center justify-between py-3 z-[100] bg-background">
        {/* Left navigation */}
        <div className="hidden lg:flex">
          <ul className="flex items-center justify-center xl:text-xl text-primary_dark">
            <li className="mr-2 xl:mr-4">
              <Navlink url="home" name="HOME" />
            </li>
            <li className="mx-2 xl:mx-4">
              <Navlink url="services" name="SERVICES" />
            </li>
            <li className="mx-2 xl:mx-4">
              <Navlink url="gallery" name="GALLERY" />
            </li>
            <li className="mx-2 xl:mx-4">
              <Navlink url="forms" name="FORMS" />
            </li>
            <li className="ml-2 xl:ml-4">
              <Navlink url="about" name="ABOUT US" />
            </li>
          </ul>
        </div>

        {/* Hamburger for mobile */}
        <div className="lg:hidden" onClick={handleHamburgerClick}>
          <HamburgerButton isOpen={isOpen} />
        </div>

        {/* Center logo */}
        <div className="absolute left-[50%] translate-x-[-50%]">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon.png`}
            alt="Garden and Bee"
            className="h-20"
            loading="eager"
          />
        </div>

        {/* Right side button */}
        <div className="hidden md:flex xl:text-xl">
          {isAdminRoute && isAdmin ? (
            <button onClick={handleLogout} className={PRIMARY_BUTTON}>
              Logout
            </button>
          ) : (
            <a
              href={LINK_BOOK_NOW}
              className={PRIMARY_BUTTON}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          )}
        </div>

        {/* Mobile icon */}
        <div className="md:hidden text-primary">
          {isAdminRoute && isAdmin ? (
            <MdLogout
              className="w-8 h-8 cursor-pointer"
              onClick={handleLogout}
            />
          ) : (
            <a href={LINK_BOOK_NOW} target="_blank" rel="noopener noreferrer">
              <MdEvent className="w-8 h-8" />
            </a>
          )}
        </div>
      </header>

      {/* Mobile menu */}

      <div className="lg:hidden">
        <HamburgerMenu
          isOpen={isOpen}
          handleHamburgerClick={handleHamburgerClick}
          isFooter={isFooter}
          height={height}
        />
      </div>
    </>
  );
};

export default Navbar;
