import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full items-stretch">
        
        {/* ✅ Instructions Card */}
        <div className="bg-white shadow-lg rounded-xl px-8 py-10 animate-fade-in h-full min-h-[440px] flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">📝 Welcome to GreenBin!</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>🚀 <strong>Login</strong> with your credentials to access the system.</li>
            <li>🛡️ Only authorized users can add or manage bin data.</li>
            <li>🔒 Your password is protected and hidden by default.</li>
            <li>👁️ Click the eye icon to toggle password visibility.</li>
            <li>🧾 Don’t have an account? You can register easily.</li>
          </ul>
        </div>

        {/* ✅ Login Form Card */}
        <div className="bg-white shadow-lg rounded-xl px-8 py-10 animate-fade-in h-full min-h-[440px] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Login</h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
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
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
