import express from 'express';
import { createEvent, getAllEvents,updateEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

import { registerForEvent, getUserRegistrations } from '../controllers/registrationController.js';
import jwt from 'jsonwebtoken';
import Event from '../models/EventModel.js';


import PDFDocument from 'pdfkit'

import Registration from '../models/RegistrationModel.js';


import User from "../models/UserModel.js"

const router = express.Router();

router.post('/create', verifyToken, createEvent);
router.get('/all', getAllEvents);

router.post('/register', verifyToken, registerForEvent);
router.get('/my-registrations', verifyToken, getUserRegistrations);

router.post("/checkin", async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Decode userId if it's a token
    const decoded = jwt.verify(userId, process.env.JWT_SECRET);
    const actualUserId = decoded.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.registered.includes(actualUserId)) {
      return res.status(403).json({ message: "User not registered" });
    }

    if (event.checkIns.includes(actualUserId)) {
      return res.status(400).json({ message: "Already checked in" });
    }

    event.checkIns.push(actualUserId);
    await event.save();

    res.json({ message: "Check-in successful" });
  } catch (err) {
    res.status(500).json({ message: "Check-in failed", error: err.message });
  }
});


router.put("/update/:eventId",verifyToken,updateEvent)


router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🧨 Delete Request for ID:", id); // Log the incoming ID

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Event ID format" });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("✅ Event Deleted:", deletedEvent);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
  



router.get("/download-ticket/:eventId",  async (req, res) => {
  const userId = req.user.id; // from decoded token
  const { eventId } = req.params;

  try {
    // Validate user registration
    const registration = await Registration.findOne({ userId, eventId });
    if (!registration) {
      return res.status(403).json({ message: "You are not registered for this event" });
    }

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    // PDF generation
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");

    doc.pipe(res);

    doc.fontSize(24).text("Event E-Ticket", { align: "center" });
    doc.moveDown();
    doc.fontSize(18).text(`Name: ${user.name}`);
    doc.text(`Event: ${event.name}`);
    doc.text(`Date: ${event.date}`);
    doc.text(`Venue: ${event.venue}`);
    doc.text(`Registration ID: ${registration._id}`);
    doc.text(`Email: ${user.email}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "Failed to generate ticket" });
  }
});





export default router;

