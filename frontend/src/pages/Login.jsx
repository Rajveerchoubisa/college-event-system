// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  const handleSignUp = () => {
    navigate("/register")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      const userData = {
        email: res.data.user.email,
        role: res.data.user.role,
      };

      // Store token & user in localStorage and context
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
  

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 px-4">
      <form
        className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">Welcome Back 👋</h2>
        <p className="text-center text-gray-500">Please login to continue</p>

        {/* Email Field */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-blue-400">
          <FaEnvelope className="text-gray-500 mr-3" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-blue-400">
          <FaLock className="text-gray-500 mr-3" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-white font-semibold py-3 rounded-lg shadow"
        >
          <FaSignInAlt />
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <span onClick={handleSignUp} className="text-indigo-600 font-medium cursor-pointer hover:underline">Sign up</span>
        </p>
      </form>
    </div>
  );
}
