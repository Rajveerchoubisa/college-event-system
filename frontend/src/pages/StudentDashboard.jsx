// src/pages/StudentDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";
import QRCode from "react-qr-code";

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState(null);

  const fetchEvents = async () => {
    const res = await API.get("/events/all");
    setEvents(res.data);
  };

  const register = async (eventId) => {
    try {
      await API.post(`/events/register/${eventId}`);
      alert("Registered! Scroll down to view your QR code.");
      setRegistered(eventId);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded shadow space-y-2">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
            <p><b>Venue:</b> {event.venue}</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => register(event._id)}
            >
              Register
            </button>

            {registered === event._id && (
              <div className="mt-4">
                <p className="text-sm font-medium">Show this QR Code at entry:</p>
                <div className="w-32 h-32 bg-white p-2">
                  <QRCode value={`Event:${event._id},User:${localStorage.getItem("token")}`} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
