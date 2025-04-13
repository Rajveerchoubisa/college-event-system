// src/pages/StudentDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";
import QRCode from "react-qr-code";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { generateTicketPDF } from "../utlis/generateticket.js";

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState({}); // change from array to object
  const [registeredEventIds, setRegisteredEventIds] = useState([]);

  const fetchEvents = async () => {
    const res = await API.get("/events/all");
    setEvents(res.data);
  };
  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/events/my-registrations");
      const ids = {};
      res.data.forEach((r) => {
        // Ensure we're getting the actual event ID (when populated)
        const id = r.eventId._id || r.eventId; // fallback if not populated
        ids[id] = true;
      });
      setRegisteredEvents(ids);
      setRegisteredEventIds(ids);
    } catch (err) {
      console.error("Error fetching registrations", err);
    }
  };
  

  const register = async (eventId) => {
    try {
      await API.post("/events/register", { eventId });
      alert("Registered! Scroll down to view your QR code.");
      setRegisteredEvents((prev) => ({ ...prev, [eventId]: true }));
      setRegisteredEventIds([...registeredEventIds, eventId])
      
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const userId = localStorage.getItem("userId");

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-100 to-blue-100">
      <h2 className="text-4xl font-bold mb-8 text-blue-800">
        🎉 Upcoming Events
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 space-y-4 border border-gray-200"
          >
            <h3 className="text-2xl font-semibold text-indigo-700">
              {event.title}
            </h3>

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

            {!registeredEventIds.includes(event._id)? (
              <button
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
                onClick={() => register(event._id)}
              >
                🎟 Register
              </button>
            ) : (
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  🎫 You’re registered! Download your E-Ticket below.
                </p>

                <div className="inline-block bg-white p-2 border rounded shadow mb-2">
                  <QRCode
                    value={JSON.stringify({
                      eventId: event._id,
                      userId: userId,
                    })}
                    size={128}
                  />
                </div>

                <button
                  onClick={() => generateTicketPDF({ event, userId })}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  ⬇️ Download Ticket
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
