import { useState } from "react";
import { QrReader } from "react-qr-reader";
import API from "../api";

export default function AdminCheckIn() {
  const [scannedData, setScannedData] = useState(null);
  const [message, setMessage] = useState("");

  const handleScan = async (result) => {
    if (result?.text) {
      setScannedData(result.text);

      const [eventIdPart, userTokenPart] = result.text.split(",");
      const eventId = eventIdPart.split(":")[1];
      const userToken = userTokenPart.split(":")[1];

      try {
        const res = await API.post("/events/checkin", {
          eventId,
          userId: userToken, // Make sure backend interprets this token properly or decode it.
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || "Check-in failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">📲 Scan QR to Check-In</h2>

      <div className="flex flex-col items-center gap-4">
        <div className="w-80 h-80 bg-white shadow-lg rounded-xl overflow-hidden">
          <QrReader
             onResult={handleScan}
             constraints={{ facingMode: "environment" }}
             videoContainerStyle={{ width: "100%", height: "100%" }}
             containerStyle={{ width: "100%", height: "100%" }}
             videoStyle={{ width: "100%", height: "100%" }}
             style={{ width: "100%", height: "100%" }}
          />
        </div>

        {scannedData && (
          <div className="text-center">
            <p className="font-medium text-gray-700">Scanned: {scannedData}</p>
            <p className={`mt-2 text-lg font-bold ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
