import { useEffect, useState } from "react";
import API from "../api";
import QRCode from "react-qr-code";
import { generateTicketPDF } from "../utlis/generateticket.js";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const userId = localStorage.getItem("userId");

useEffect(() => {
  fetchEvents();
  fetchMyRegistrations();
  // Load registered event IDs from localStorage
  const registeredEventIds = JSON.parse(localStorage.getItem("registeredEventIds")) || [];
  setRegisteredEventIds(registeredEventIds);
}, []);

  
  

  // Fetch all available events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/all");
      setEvents(res.data);
      console.log("Events:", events);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const fetchMyRegistrations = async () => {
    try {
      const res = await fetch("/events/my-registrations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const data = await res.json();
  
      // Map only the event._id into a flat array of strings
      const registeredIds = data.map((reg) => reg.eventId._id);
  
      setRegisteredEventIds(registeredIds);
      localStorage.setItem("registeredEventIds", JSON.stringify(registeredIds));
    } catch (error) {
      console.error("Error fetching registrations", error);
    }
  };
  
  
const register = async (eventId) => {
  try {
    // API call to register the user for the event
    const response = await API.post("/events/register", { eventId });
    
    if (response.data.message === "Successfully registered") {
      alert("✅ Registered Successfully!");

      // Save the registered event ID to localStorage
      const registeredEventIds = JSON.parse(localStorage.getItem("registeredEventIds")) || [];
      if (!registeredEventIds.includes(eventId)) {
        registeredEventIds.push(eventId);
        localStorage.setItem("registeredEventIds", JSON.stringify(registeredEventIds));
      }

      // Update state to trigger re-render
      setRegisteredEventIds((prev) => [...prev, eventId]);
    }
  } catch (err) {
    alert(err.response?.data?.message || "❌ Registration failed");
  }
};

  
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-100 to-blue-100">
      <h2 className="text-4xl font-bold mb-8 text-blue-800">
        🎉 Upcoming Events
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const isRegistered = registeredEventIds.includes(event._id);

          return (
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
                  <b>Date:</b>{" "}
                  {new Date(event.date).toLocaleDateString("en-IN")}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <b>Venue:</b> {event.venue}
                </p>
              </div>

              {!isRegistered ? (
                <button
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
                  onClick={() => register(event._id)}
                >
                  🎟 Register
                </button>
              ) : (
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    🎫 You’re registered! Here’s your ticket 👇
                  </p>

                  <div className="inline-block bg-white p-2 border rounded shadow mb-2">
                    <QRCode
                      value={JSON.stringify({ eventId: event._id, userId })}
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
          );
        })}
      </div>
    </div>
  );
}
