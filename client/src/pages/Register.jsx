import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role: "user",
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">

        {/* Instructions */}
        <div className="bg-white shadow-lg rounded-xl p-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-700 mb-4">📝 Registration Tips</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>👤 Enter your <strong>Name</strong> clearly.</li>
            <li>📧 Provide a valid <strong>Email Address</strong>.</li>
            <li>🔐 Choose a strong <strong>Password</strong> you remember.</li>
            <li>✅ You’ll be registered as a <strong>user</strong> by default.</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-xl px-8 py-10 animate-fade-in">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Register</h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handleChange}
              />
              <div
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:from-green-400 hover:to-green-600 text-white font-semibold rounded-md shadow"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
