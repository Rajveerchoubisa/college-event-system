import { useEffect, useState } from "react";
import API from "../api";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editValues, setEditValues] = useState({});

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/all");
      setEvents(res.data);
      const initialEditState = {};
      res.data.forEach((event) => {
        initialEditState[event._id] = {
          date: event.date.split("T")[0],
          venue: event.venue,
        };
      });
      setEditValues(initialEditState);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleUpdate = async (id) => {
    const { date, venue } = editValues[id];
  
    // Ensure the date is in the correct format before sending it
    const formattedDate = new Date(date).toISOString(); // Convert to ISO string
  
    try {
      await API.put(`/events/update/${id}`, { date: formattedDate, venue });
      alert("Event updated successfully");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      await API.delete(`/events/delete/${id}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">📅 Manage Events</h2>
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 rounded-xl shadow space-y-2 border"
          >
            <h3 className="text-2xl font-semibold text-blue-700">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={editValues[event._id]?.date || ""}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      [event._id]: {
                        ...prev[event._id],
                        date: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Venue</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={editValues[event._id]?.venue || ""}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      [event._id]: {
                        ...prev[event._id],
                        venue: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 mt-3">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleUpdate(event._id)}
              >
                ✏️ Update
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDelete(event._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import API from "../api";

// export default function AdminEvents() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await API.get("/events/all");
//         setEvents(res.data);
//       } catch (err) {
//         console.error("Failed to fetch events:", err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <div className="p-8 bg-slate-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">📅 All Events (Admin View)</h2>

//       {events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white p-4 rounded-xl shadow space-y-2"
//             >
//               <h3 className="text-xl font-semibold">{event.title}</h3>
//               <p>{event.description}</p>
//               <p>
//                 <b>Date:</b>{" "}
//                 {new Date(event.date).toLocaleDateString()}
//               </p>
//               <p>
//                 <b>Venue:</b> {event.venue}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
