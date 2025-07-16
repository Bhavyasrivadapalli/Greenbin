import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <br /><br />
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Login</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input name="email" type="email" placeholder="Email" required className="input" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required className="input" onChange={handleChange} />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">Login</button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
      Don’t have an account?{" "}
      <Link to="/register" className="text-green-600 hover:underline">
        Register here
      </Link>
    </p>
    </div>
  );
};

export default Login;
