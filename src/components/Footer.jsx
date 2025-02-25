import React from "react";
import {
  EMAIL,
  LINK_FACEBOOK,
  LINK_GOOGLE_MAPS,
  LINK_INSTAGRAM,
  LINK_TIKTOK,
  PHONE_NUMBER,
} from "../helpers/links";
import { MdEmail, MdPhone } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-10 overflow-hidden pt-[130px] sm:mt-24 md:pt-[180px] text-white">
      <div className="absolute top-16 flex w-[102%] -translate-y-4 transform justify-end md:left-0 md:w-full">
        <div className="h-[200px] w-full rotate-[-6deg] transform rounded-tl-[55px] rounded-tr-[35px] bg-secondary md:w-[98%] md:rotate-[-3deg]"></div>
      </div>
      <div className="absolute top-16 flex w-[101%] justify-start md:left-0 md:right-0 md:w-full">
        <div className="h-[200px] w-full rotate-[-6deg] transform rounded-tl-[55px] rounded-tr-[35px] bg-primary md:rotate-[-3deg]"></div>
      </div>
      <div className="relative z-50 bg-primary px-6 pb-7 sm:px-5 md:px-10 2xl:px-28">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="mb-7 lg:mb-0 w-full lg:w-[40%]">
            <h1 className="mb-7 text-xl font-semibold sm:text-5xl">
              Garden and Bee
            </h1>
            <ul>
              <li className="mb-3.5">
                <a
                  href={PHONE_NUMBER}
                  className="flex items-center gap-3 text-lg font-normal"
                >
                  <span className="block w-6">
                    <MdPhone size={24} />
                  </span>
                  <span>732.759.0070</span>
                </a>
              </li>
              <li className="mb-3.5">
                <a
                  href={EMAIL}
                  className="flex items-center gap-3 text-lg font-normal"
                >
                  <span className="block w-6">
                    <MdEmail size={24} />
                  </span>
                  <span>gardenandbee@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href={LINK_GOOGLE_MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Location"
                  className="flex items-center gap-3 text-lg font-normal"
                >
                  <span className="block w-6">
                    <SiGooglemaps size={24} />
                  </span>
                  <span>10A Main Street, Eatontown, NJ, 07724</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-6/12 md:w-4/12 lg:w-[30%]">
            <h5 className="mb-4 text-xl font-medium sm:block">Follow Us</h5>
            <ul className="flex items-center justify-center gap-3.5 sm:justify-start sm:gap-1.5 lg:gap-[14px]">
              <li>
                <a
                  href={LINK_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-primary sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
              <li>
                <a
                  href={LINK_TIKTOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-primary sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]"
                >
                  <FaTiktok size={24} />
                </a>
              </li>
              <li>
                <a
                  href={LINK_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-primary sm:h-9 sm:w-9 md:h-11 md:w-11 lg:h-[50px] lg:w-[50px]"
                >
                  <FaFacebook size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-white/[20%] mt-11 border-t pt-4 sm:mt-16 sm:pt-7">
          <p className="text-center text-base font-normal leading-7 sm:text-left sm:text-sm lg:text-base">
            © 2025 GARDEN AND BEE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
