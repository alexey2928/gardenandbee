import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import MenuHeader from "../../common/MenuHeader";

const Forms = () => {
  return (
    <>
      <MenuHeader name="FORMS" />
      <div className="my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
        <h3 className="text-2xl lg:text-4xl text-primary_dark my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
          Consent <span className="text-primary">Forms</span>
        </h3>
      </div>
      <ul className="space-y-3">
        <li className="mb-2.5 rounded-[15px] border border-primary bg-white px-3.5 py-5 sm:mb-[18px] sm:pb-[29px] sm:pl-9 sm:pr-[31px] sm:pt-[26px]">
          <Link to="/forms/lash-extension">
            <div className="flex w-full items-center justify-between md:text-2xl">
              Eyelash Extension
              <FaLongArrowAltRight className="text-black" />
            </div>
          </Link>
        </li>
        <li className="mb-2.5 rounded-[15px] border border-primary bg-white px-3.5 py-5 sm:mb-[18px] sm:pb-[29px] sm:pl-9 sm:pr-[31px] sm:pt-[26px]">
          <Link to="/forms/lash-lift">
            <div className="flex w-full items-center justify-between md:text-2xl">
              Eyelash Lift + Tint
              <FaLongArrowAltRight className="text-black" />
            </div>
          </Link>
        </li>
        <li className="mb-2.5 rounded-[15px] border border-primary bg-white px-3.5 py-5 sm:mb-[18px] sm:pb-[29px] sm:pl-9 sm:pr-[31px] sm:pt-[26px]">
          <Link to="/forms/threading-waxing">
            <div className="flex w-full items-center justify-between md:text-2xl">
              Threading and Waxing
              <FaLongArrowAltRight className="text-black" />
            </div>
          </Link>
        </li>
        <li className="mb-2.5 rounded-[15px] border border-primary bg-white px-3.5 py-5 sm:mb-[18px] sm:pb-[29px] sm:pl-9 sm:pr-[31px] sm:pt-[26px]">
          <Link to="/forms/brow-shaping">
            <div className="flex w-full items-center justify-between md:text-2xl">
              Brow Shaping + Tint
              <FaLongArrowAltRight className="text-black" />
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Forms;
