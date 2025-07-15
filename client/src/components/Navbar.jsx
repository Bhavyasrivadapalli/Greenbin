import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaChartBar, FaRoute, FaUser, FaTrashAlt } from "react-icons/fa";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
   <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    
    {/* Left - Logo */}
    <div className="flex items-center gap-2">
      <FaTrashAlt className="text-green-600 text-xl" />
      <h1 className="text-2xl font-bold text-green-700">GreenBin</h1>
    </div>

    {/* Center - Nav Links */}
    <div className="flex-1 flex justify-center gap-6">
      <NavLink to="/map" className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium">
        <FaMapMarkedAlt /> Map
      </NavLink>
      <NavLink to="/analytics" className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium">
        <FaChartBar /> Analytics
      </NavLink>
      <NavLink to="/fetch" className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium">
        <FaRoute /> Fetch Route
      </NavLink>
    </div>

    {/* Right - User Info */}
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1 text-green-700 font-medium">
        <FaUser /> {user?.name}
      </span>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-1 border border-green-600 rounded hover:bg-green-100 text-green-600"
      >
        Logout
      </button>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
