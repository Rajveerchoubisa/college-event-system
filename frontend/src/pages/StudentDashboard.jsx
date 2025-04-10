// src/pages/StudentDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";
import QRCode from "react-qr-code";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await API.get("/events/all");
    setEvents(res.data);
  };

  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/events/my-registrations");
      const ids = res.data.map((r) => r.eventId._id); // Extract eventIds
      setRegisteredEvents(ids);
    } catch (err) {
      console.error("Error fetching registrations", err);
    }
  };

  const register = async (eventId) => {
    try {
      await API.post("/events/register", { eventId });
      alert("Registered! Scroll down to view your QR code.");
      setRegisteredEvents((prev) => [...prev, eventId]);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistrations(); // fetch user's existing registrations
  }, []);

  const userId = localStorage.getItem("userId"); // Ensure userId is saved during login

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-100 to-blue-100">
      <h2 className="text-4xl font-bold mb-8 text-blue-800">🎉 Upcoming Events</h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 space-y-4 border border-gray-200"
          >
            <h3 className="text-2xl font-semibold text-indigo-700">{event.title}</h3>

            <div className="text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" /> {event.description}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                <b>Date:</b> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <b>Venue:</b> {event.venue}
              </p>
            </div>

            {!registeredEvents.includes(event._id) ? (
              <button
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
                onClick={() => register(event._id)}
              >
                🎟 Register
              </button>
            ) : (
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  🎫 You’re registered! Show this QR Code at entry.
                </p>
                <div className="inline-block bg-white p-2 border rounded shadow">
                  <QRCode
                    value={JSON.stringify({
                      eventId: event._id,
                      userId: userId,
                    })}
                    size={128}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
