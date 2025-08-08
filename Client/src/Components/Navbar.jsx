import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Byte-2-Bite.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl rounded-2xl shadow-lg bg-white/70 backdrop-blur-md border border-[#ffd6e0] flex items-center justify-center py-2 px-6">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Byte-2-Bite Logo"
          className="w-10 h-10 rounded-full object-contain bg-white border-2 border-[#ffe5b4] shadow"
        />
        <span className="text-xl font-extrabold text-[#ff7043] tracking-tight drop-shadow-sm select-none">
          Byte-2-Bite
        </span>
      </div>
      <div className="flex-1" />
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-lg font-semibold px-3 py-1 rounded-full transition 
              ${
                location.pathname === item.path
                  ? "bg-[#ff7043] text-white shadow"
                  : "text-[#ff7043] hover:bg-[#ffe0b2] hover:text-[#ff5722]"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
