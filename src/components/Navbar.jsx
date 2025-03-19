import React, { useEffect, useState } from "react";
import { MdEvent } from "react-icons/md";
import { LINK_BOOK_NOW } from "../common/links";
import { PRIMARY_BUTTON } from "../common/styles";
import HamburgerButton from "./HamburgerButton";
import HamburgerMenu from "./HamburgerMenu";
import Navlink from "../common/Navlink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFooter, setIsFooter] = useState(false);
  const [height, setHeight] = useState("auto");

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
    window.scrollTo(0, 0);
  };

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

    updateStyles(); // Initial check on mount

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
            <li className="ml-2 xl:ml-4">
              <Navlink url="about" name="ABOUT US" />
            </li>
          </ul>
        </div>
        <div className="lg:hidden" onClick={handleHamburgerClick}>
          <HamburgerButton isOpen={isOpen} />
        </div>

        <div className="absolute left-[50%] translate-x-[-50%]">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon.png`}
            alt="Garden and Bee"
            className="h-20"
            loading="eager"
          />
        </div>
        <div className="hidden md:flex xl:text-xl">
          <a
            href={LINK_BOOK_NOW}
            className={PRIMARY_BUTTON}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </a>
        </div>
        <div className="md:hidden text-primary">
          <a href={LINK_BOOK_NOW} target="_blank" rel="noopener noreferrer">
            <MdEvent
              className="w-8 h-8"
              viewBox="0 0 24 24"
              stroke="text-primary"
            />
          </a>
        </div>
      </header>
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
