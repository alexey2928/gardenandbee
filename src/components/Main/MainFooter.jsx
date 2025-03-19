import React from "react";
import { FaFacebook, FaGoogle, FaInstagram, FaTiktok } from "react-icons/fa";
import {
  LINK_FACEBOOK,
  LINK_GOOGLE_MAPS,
  LINK_INSTAGRAM,
  LINK_LEAVE_A_REVIEW,
  LINK_TIKTOK,
  PHONE_NUMBER,
} from "../../common/links";

const MainFooter = () => {
  return (
    <footer className="flex flex-col items-center justify-center p-4 text-primary_dark w-full ">
      <div className="flex items-center w-full max-w-xl my-4">
        <div className="flex-grow border-t border-primary_dark"></div>
        <span className="px-3 text-sm font-semibold">BUZZ INTO BEAUTY</span>
        <div className="flex-grow border-t border-primary_dark"></div>
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
          href={LINK_FACEBOOK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-[#B68B41] transition"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href={LINK_LEAVE_A_REVIEW}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Review"
          className="hover:text-[#B68B41] transition"
        >
          <FaGoogle size={24} />
        </a>
      </div>

      <div className="text-sm mt-3">
        <a href={PHONE_NUMBER} className="hover:underline">
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

export default MainFooter;
