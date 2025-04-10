// src/pages/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          onClick={() => navigate("/admin/create-event")}
        >
          + Create New Event
        </button>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          onClick={() => alert("View Events feature coming soon")}
        >
          View All Events
        </button>
      </div>
    </div>
  );
}
