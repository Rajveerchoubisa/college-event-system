// src/pages/CreateEvent.jsx
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegFileAlt, FaHeading, FaPlus } from "react-icons/fa";
export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/events/create", formData);
      alert("Event Created Successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Failed to create event.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">🎉 Create New Event</h2>

        {/* Event Title */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-blue-400">
          <FaHeading className="text-gray-500 mr-3" />
          <input
            name="title"
            placeholder="Event Title"
            className="w-full outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-start border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-blue-400">
          <FaRegFileAlt className="text-gray-500 mt-1 mr-3" />
          <textarea
            name="description"
            placeholder="Event Description"
            rows="3"
            className="w-full outline-none resize-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Date */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-blue-400">
          <FaCalendarAlt className="text-gray-500 mr-3" />
          <input
            type="date"
            name="date"
            className="w-full outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Venue */}
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 ring-blue-400">
          <FaMapMarkerAlt className="text-gray-500 mr-3" />
          <input
            name="venue"
            placeholder="Event Venue"
            className="w-full outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 rounded-lg shadow"
        >
          <FaPlus />
          Create Event
        </button>
      </form>
    </div>
  );
}
