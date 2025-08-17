import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/images/logo.png";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="relative flex items-center bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-10 px-7 sticky top-0 z-30">
      {/* Left menu button */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Centered logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img
          src={logo}
          alt="Task Manager Logo"
          className="w-28 h-28 object-contain"
        />
      </div>

      {/* Side menu when open */}
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
