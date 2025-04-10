// src/pages/AdminQRScanner.jsx
import { useState } from "react";
import QRReader from "react-qr-reader";
import API from "../api";

export default function AdminQRScanner() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const handleScan = async (data) => {
    if (data && data !== result) {
      setResult(data);

      try {
        const [eventId, userToken] = data.split(",");
        const userId = userToken.split(":")[1]; // "User:xyz" -> "xyz"

        const res = await API.post("/events/checkin", {
          eventId: eventId.split(":")[1],
          userId,
        });

        setStatus(res.data.message);
      } catch (err) {
        setStatus(err.response?.data?.message || "Scan failed");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setStatus("Scanner error");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>

      <QRReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px" }}
      />

      <div className="mt-6 p-4 bg-white rounded shadow-md text-lg">
        {status && <p><strong>Status:</strong> {status}</p>}
      </div>
    </div>
  );
}
