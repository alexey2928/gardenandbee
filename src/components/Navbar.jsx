import React from "react";
import { Link } from "react-router-dom";
import { MdEvent } from "react-icons/md";
import { LINK_BOOK_NOW } from "../helpers/links";
import { PRIMARY_BUTTON } from "../helpers/styles";
import HamburgerButton from "./HamburgerButton";

function Navbar() {
  return (
    <>
      <header className="bg-transparent w-full max-h-40 bg-cover flex items-center justify-start ">
        <div className="max-w-xl">
          <img
            src={`${process.env.PUBLIC_URL}/images/text.png`}
            alt="Garden and Bee"
            loading="eager"
          />
          <h1 className="hidden">Garden and Bee Beauty Salon</h1>
        </div>
      </header>
      <header className="sticky top-0 h-20 w-full flex items-center justify-between px-[5%] py-3 z-[100] bg-background">
        <div className="hidden lg:flex">
          <ul className="flex items-center justify-center xl:text-xl text-primary_dark">
            <li className="mr-2 xl:mr-4">
              <Link to="/home" className="cursor-pointer">
                HOME
              </Link>
            </li>
            <li className="mx-2 xl:mx-4">
              <Link to="/services" className="cursor-pointer">
                SERVICES
              </Link>
            </li>
            <li className="mx-2 xl:mx-4">
              <Link to="/gallery" className="cursor-pointer">
                GALLERY
              </Link>
            </li>
            <li className="ml-2 xl:ml-4">
              <Link to="/about" className="cursor-pointer">
                ABOUT US
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:hidden">
          <HamburgerButton />
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
    </>
  );
}

export default Navbar;
