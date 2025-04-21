// server/controllers/registrationController.js
import Registration from '../models/RegistrationModel.js';
import Event from "../models/EventModel.js"
import QRCode from 'qrcode';

export const registerForEvent = async (req, res) => {
  const { eventId } = req.body;
   const userId = req.user.id;

  try {


    const event = await Event.findById(eventId);
    if(!event) return res.status(404).json({ message: "Event not found" });

    if (event.registered.includes(userId)) {
      return res.status(400).json({ message: "Already registered" });

    }

    event.registered.push(userId);
    await event.save();

    await Registration.create({ eventId, userId });

 
    res.json({ message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }

};
export const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user.id }).populate('eventId');

    if (!registrations || registrations.length === 0) {
      return res.status(200).json([]); // Return empty array if no registrations
    }

    registrations.forEach((reg) => {
      console.log("Event ID:", reg.eventId); // Log each eventId
    });

    console.log("Registrations:", registrations);
    res.status(200).json(registrations);

  } catch (err) {
    console.error("Error fetching registrations:", err);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

