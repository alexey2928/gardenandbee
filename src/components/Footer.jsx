import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import {
  LINK_GOOGLE_MAPS,
  LINK_INSTAGRAM,
  LINK_TIKTOK,
} from "../helpers/links";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-4 text-[#704415] w-full ">
      <div className="flex items-center w-full max-w-lg my-4">
        <div className="flex-grow border-t border-[#704415]"></div>
        <span className="px-3 text-sm font-semibold">BUZZ INTO BEAUTY</span>
        <div className="flex-grow border-t border-[#704415]"></div>
      </div>

      <div className="flex space-x-6 mt-4">
        <a
          href={LINK_INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-[#B68B41] transition"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href={LINK_TIKTOK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="hover:text-[#B68B41] transition"
        >
          <FaTiktok size={24} />
        </a>
        <a
          href={LINK_GOOGLE_MAPS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Location"
          className="hover:text-[#B68B41] transition"
        >
          <SiGooglemaps size={24} />
        </a>
      </div>

      <div className="text-sm mt-3">
        <a href="tel:7327590070" className="hover:underline">
          732.759.0070
        </a>
      </div>
      <div className="text-sm mt-3">
        <a
          href={LINK_GOOGLE_MAPS}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Location"
          className="hover:underline"
        >
          10A Main St, Eatontown, NJ, 07724
        </a>
      </div>
    </footer>
  );
};

export default Footer;
