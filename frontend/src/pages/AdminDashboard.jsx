// src/pages/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 drop-shadow">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            onClick={() => navigate("/admin/create-event")}
          >
            + Create New Event
          </button>

          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            onClick={() => navigate("/admin/events")}
           // onClick={() => console.log("Clicked")}
          >
            📅 View All Events
          </button>

          <button
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
            onClick={() => navigate("/admin/checkin")}
          >
            📲 Scan QR for Check-In
          </button>
        </div>
      </div>
    </div>
  );
}
