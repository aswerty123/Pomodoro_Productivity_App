import React from "react";
import { NavLink } from "react-router-dom";
import { GiTomato } from "react-icons/gi";
import { AiFillDashboard } from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="flex bg-red-500 flex-col w-fit h-screen ">
      <NavLink to="/dashboard">
        <AiFillDashboard className="text-red-900" size={70} />
      </NavLink>
      <NavLink to="/pomodoro-session">
        <GiTomato className="text-red-900" size={70} />
      </NavLink>
    </div>
  );
};

export default NavBar;
