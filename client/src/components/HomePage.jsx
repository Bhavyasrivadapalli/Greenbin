import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaMapMarkedAlt, FaChartPie } from "react-icons/fa";
import BinDashboard from "./BinDashboard";
import BinTable from "./BinTable";

const HomePage = ({ refreshTrigger, handleRefresh }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  return (
    <div className="max-w-4xl mx-auto pt-50 px-6 text-center">
       <div className="text-green-700 text-5xl font-bold mb-6 flex justify-center items-center gap-3">
        <FaLeaf className="text-4xl" />
        Welcome to GreenBin
      </div>

      <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
        <strong>GreenBin</strong> is an intelligent waste management platform designed to optimize garbage collection in urban areas.
        It uses IoT-enabled smart bins to monitor fill levels in real time, helping municipalities and organizations reduce fuel usage, prevent overflow, and improve sanitation efficiency.
      </p>

      <div className="bg-white rounded-xl shadow p-6">
        <BinTable
          userType={user?.userType}
          onBinUpdated={handleRefresh}
          refreshTrigger={refreshTrigger}
          onDelete={handleRefresh}
        />
      </div>
    </div>
  );
};

export default HomePage;
