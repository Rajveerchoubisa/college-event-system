import jsPDF from "jspdf";
import QRCode from "qrcode";

export async function generateTicketPDF({ event, userId }) {
  try {
    if (!userId) {
      alert("User ID is missing. Cannot generate ticket.");
      return;
    }

    const doc = new jsPDF();

    // Set font and page layout
    doc.setFont("helvetica");

    // Header: Event E-Ticket
    doc.setFontSize(26);
    doc.setTextColor(72, 61, 140); // Dark Slate Blue
    doc.text("Event E-Ticket", 60, 20);

    // Outer box
    doc.setDrawColor(100, 149, 237); // Cornflower Blue
    doc.setLineWidth(1);
    doc.rect(10, 30, 190, 140);

    // Event Details box
    doc.setFillColor(224, 255, 255); // Light Cyan
    doc.rect(15, 38, 180, 45, 'F'); // filled rect

    doc.setFontSize(14);
    doc.setTextColor(25, 25, 112); // Midnight Blue
    doc.text("Event Details", 20, 45);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(`Name: ${event.title}`, 20, 55);
    doc.text(`Date: ${new Date(event.date).toLocaleDateString()}`, 20, 63);
    doc.text(`Venue: ${event.venue}`, 20, 71);

    // Student Info box
    doc.setFillColor(255, 228, 225); // Misty Rose
    doc.rect(15, 88, 180, 25, 'F');

    doc.setFontSize(14);
    doc.setTextColor(199, 21, 133); // Medium Violet Red
    doc.text("Student Info", 20, 95);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Student ID: ${userId}`, 20, 103);

    // QR divider line
    doc.setDrawColor(200);
    doc.line(15, 120, 195, 120);

    // QR Title
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Scan this QR at entry:", 70, 130);

    // QR Code generation
    const qrData = JSON.stringify({ eventId: event._id, userId });
    const qrImage = await QRCode.toDataURL(qrData);
    doc.addImage(qrImage, "PNG", 80, 135, 50, 50);

    // Save PDF
    doc.save(`${event.title.replace(/\s+/g, "_")}_ticket.pdf`);
  } catch (err) {
    console.error("❌ Ticket Generation Error:", err);
    alert("Failed to generate the ticket. Please try again.");
  }
}
