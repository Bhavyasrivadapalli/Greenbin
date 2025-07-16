import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "admin", // Or any default
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", formData);
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };
const handleRegister = async (e) => {
  e.preventDefault();

  // ✅ Basic check for userType
  if (!formData.userType || formData.userType === "") {
    setError("Please select a user type.");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/auth/register", formData);
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Register</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input name="name" type="text" placeholder="Name" required className="input" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required className="input" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="input" onChange={handleChange} />
        <select
  name="userType"
  required
  value={formData.userType}
  onChange={handleChange}
  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
>
  <option value="">Select Role</option>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">Register</button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-green-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
    
  );
};

export default Register;
