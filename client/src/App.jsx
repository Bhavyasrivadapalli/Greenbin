import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddBinForm from "./components/AddBinForm";
import BinMap from "./components/BinMap";
import BinTable from "./components/BinTable";
import BinAnalytics from "./components/BinAnalytics";
import BinDashboard from "./components/BinDashboard";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OptimizedRoute from "./components/OptimizedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [user, setUser] = useState(null);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // ✅ Load user from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar
        user={user}
        setUser={(newUser) => {
          setUser(newUser);
          if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
          } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        }}
      />

      <div className="pt-20 min-h-screen bg-white px-4 sm:px-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <HomePage refreshTrigger={refreshTrigger} handleRefresh={handleRefresh} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <div className="max-w-6xl mx-auto grid gap-6">
                  <div className="bg-white rounded-xl shadow p-6">
                    <BinDashboard refreshTrigger={refreshTrigger} />
                  </div>
                  <div className="bg-white rounded-xl shadow p-6">
                    <BinTable
                      onBinUpdated={handleRefresh}
                      refreshTrigger={refreshTrigger}
                      onDelete={handleRefresh}
                    />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute user={user}>
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                  <BinMap refreshTrigger={refreshTrigger} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute user={user}>
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                  <AddBinForm onBinAdded={handleRefresh} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute user={user}>
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                  <BinAnalytics refreshTrigger={refreshTrigger} />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fetch"
            element={
              <ProtectedRoute user={user}>
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                  <OptimizedRoute refreshTrigger={refreshTrigger} />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
