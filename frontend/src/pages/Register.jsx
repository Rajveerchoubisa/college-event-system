// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaUserPlus } from "react-icons/fa";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = () =>{
    navigate("/")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-2">
    <form
      className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-700">Create Account</h2>
      <p className="text-center text-gray-500">Register to get started</p>

      {/* Name Field */}
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-indigo-400">
        <FaUser className="text-gray-500 mr-3" />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full outline-none"
          onChange={handleChange}
          required
        />
      </div>

      {/* Email Field */}
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-indigo-400">
        <FaEnvelope className="text-gray-500 mr-3" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full outline-none"
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Field */}
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-indigo-400">
        <FaLock className="text-gray-500 mr-3" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full outline-none"
          onChange={handleChange}
          required
        />
      </div>

      {/* Role Selector */}
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-indigo-400">
        <FaUserTag className="text-gray-500 mr-3" />
        <select
          name="role"
          onChange={handleChange}
          className="w-full outline-none bg-transparent"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-white font-semibold py-3 rounded-lg shadow"
      >
        <FaUserPlus />
        Register
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <span onClick={handleLogin} className="text-indigo-600 font-medium cursor-pointer hover:underline">Login</span>
      </p>
    </form>
  </div>
  );
}
