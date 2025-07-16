import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddBinForm from './components/AddBinForm';
import BinMap from './components/BinMap';
import BinTable from './components/BinTable';
import BinAnalytics from './components/BinAnalytics';
import BinDashboard from './components/BinDashboard';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const [user, setUser] = useState(null);

  return (
    <Router>
      {/* Fixed Navbar */}
      <Navbar user={user} setUser={setUser}/>

      {/* Main Content Area */}
      <div className="pt-20 min-h-screen bg-white px-4 sm:px-6">
        <Routes>
          {/* Home Page Layout */}
          

          <Route path="/" element={<HomePage 
                refreshTrigger={refreshTrigger} 
                handleRefresh={handleRefresh} 
              />} />


          {/* Dashboard Page */}
          <Route
            path="/dashboard"
            element={
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
            }
          />

          {/* Map Page */}
          <Route
            path="/map"
            element={
              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                <BinMap refreshTrigger={refreshTrigger} />
              </div>
            }
          />

          {/* Add Bin Page */}
          <Route
            path="/add"
            element={
              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                <AddBinForm onBinAdded={handleRefresh} />
              </div>
            }
          />

          {/* Analytics Page */}
          <Route
            path="/analytics"
            element={
              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                <BinAnalytics refreshTrigger={refreshTrigger} />
              </div>
            }
          />
          {/* Add Bin Page */}
          <Route
            path="/fetch"
            element={
              <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
                <br /><br />
                  <h1>Fetch Route page.</h1>
              </div>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
