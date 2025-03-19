import React from "react";
import { NavLink } from "react-router-dom";

const Navlink = ({ url, name }) => {
  return (
    <NavLink
      to={`/${url}`}
      className={({ isActive }) =>
        `cursor-pointer pb-1 transition-all ${
          isActive ? "border-b-2 border-primary_dark" : ""
        }`
      }
    >
      {name}
    </NavLink>
  );
};

export default Navlink;
