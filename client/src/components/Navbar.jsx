// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaMapMarkedAlt,
//   FaChartBar,
//   FaRoute,
//   FaUser,
//   FaTrashAlt,
// } from "react-icons/fa";

// const Navbar = ({ user }) => {
//   const navigate = useNavigate();

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 w-full">
//       <div className="w-full px-6 py-3 flex items-center justify-between">

//         {/* Left - Logo */}
//         <div className="flex items-center gap-20 min-w-[150px]">
//           <FaTrashAlt className="text-green-600 text-xl" />
//           <h1 className="text-2xl font-bold text-green-700">GreenBin</h1>
//         </div>

//         {/* Center - Nav Links */}
//         <div className="flex flex-grow justify-center">
//           <div className="flex gap-20">
//             <NavLink
//               to="/map"
//               className="flex items-center gap-20 text-green-600 hover:text-green-800 font-medium transition-colors"
//             >
//               <FaMapMarkedAlt /> Map
//             </NavLink>
//             <NavLink
//               to="/analytics"
//               className="flex items-center gap-20 text-green-600 hover:text-green-800 font-medium transition-colors"
//             >
//               <FaChartBar /> Analytics
//             </NavLink>
//             <NavLink
//               to="/fetch"
//               className="flex items-center gap-20 text-green-600 hover:text-green-800 font-medium transition-colors"
//             >
//               <FaRoute /> Fetch Route
//             </NavLink>
//           </div>
//         </div>

//         {/* Right - User Info */}
//         <div className="flex items-center gap-4 min-w-[180px] justify-end">
//           <span className="flex items-center gap-2 text-green-700 font-medium">
//             <FaUser /> {user?.name}
//           </span>
//           <button
//             onClick={() => navigate("/")}
//             className="px-4 py-1 border border-green-600 rounded hover:bg-green-100 text-green-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaChartBar,
  FaRoute,
  FaUser,
  FaTrashAlt,
} from "react-icons/fa";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/login");
};

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 w-full">
      <div className="w-full px-6 py-3 flex items-center justify-between">

        {/* Left - Logo */}
        <div className="flex items-center gap-3 min-w-[150px]" onClick={() => navigate('/')}>
          <FaTrashAlt className="text-green-600 text-xl" />
          <h1 className="text-2xl font-bold text-green-700 cursor-pointer">GreenBin</h1>
        </div>

        {/* Center - Nav Links */}
        <div className="flex items-center gap-10 justify-around">
          <div className="flex gap-12">
            <NavLink
              to="/map"
              className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              <FaMapMarkedAlt /> Map
            </NavLink>

            <NavLink
              to="/analytics"
              className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              <FaChartBar /> Analytics
            </NavLink>
            <NavLink
              to="/fetch"
              className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              <FaRoute /> Fetch Route
            </NavLink>
            <NavLink
              to="/add"
              className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              ➕ Add Bin
            </NavLink>
          </div>
        </div>

        {/* Right - User Info or Login */}
        <div className="flex items-center gap-4 min-w-[180px] justify-end">
          {user ? (
            <>
              <span className="flex items-center gap-2 text-green-700 font-medium">
                <FaUser /> {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-green-600 rounded hover:bg-green-100 text-green-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 border border-green-600 rounded hover:bg-green-100 text-green-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
