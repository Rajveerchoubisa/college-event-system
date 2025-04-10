// src/pages/CreateEvent.jsx
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Event</h2>

        <input
          name="title"
          placeholder="Event Title"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="venue"
          placeholder="Venue"
          className="w-full border p-3 rounded"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}
