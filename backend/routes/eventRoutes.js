import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

import { registerForEvent, getUserRegistrations } from '../controllers/registrationController.js';
import jwt from 'jsonwebtoken';

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
  

export default router;

