import React from "react";

const HamburgerButton = ({ isOpen, toggle }) => {
  return (
    <button
      className={`z-50 text-primary_dark focus:outline-none`}
      onClick={toggle}
    >
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );
};

export default HamburgerButton;
