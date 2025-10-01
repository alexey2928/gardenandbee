import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import MenuHeader from "../../common/MenuHeader";

const Forms = () => {
  return (
    <>
      <MenuHeader name="FORMS" />
      <div className="my-4 lg:mt-20 lg:mb-10 text-center h-10 lg:h-12 w-full">
        <h2 className="text-center text-[35px] font-medium leading-normal text-black sm:text-4xl sm:leading-[78px] lg:text-[60px]">
          Consent <span className="text-primary">Forms</span>
        </h2>
      </div>
      <ul className="space-y-3">
        <li className="mb-2.5 rounded-[15px] border border-primary bg-white px-3.5 py-5 sm:mb-[18px] sm:pb-[29px] sm:pl-9 sm:pr-[31px] sm:pt-[26px]">
          <Link to="/forms/lash-extension">
            <div className="flex w-full items-center justify-between">
              Lash Extension Consent + Patch Test Form
              <FaLongArrowAltRight className="text-black" />
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Forms;
