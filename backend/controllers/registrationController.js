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

    // const reg = new Registration({
    //   event: eventId,
    //   student: req.user.id,
    //   qrCode,
    // });


    
    res.json({ message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }

  //   await reg.save();
  //   res.status(201).json({ message: 'Registered', qrCode });
  // } catch (err) {
  //   res.status(500).json({ error: 'Registration failed' });
  // }
};

export const getUserRegistrations = async (req, res) => {
  try {
    const registration = await Registration.find({ userId: req.user.id }).populate('eventId');

    console.log("Registrations:", registration);

    

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};
