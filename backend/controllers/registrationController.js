// server/controllers/registrationController.js
import Registration from '../models/RegistrationModel.js';
import QRCode from 'qrcode';

export const registerForEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    // Generate unique QR data (can be encrypted or ID-based)
    const qrData = `${req.user.id}-${eventId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const reg = new Registration({
      event: eventId,
      student: req.user.id,
      qrCode,
    });

    await reg.save();
    res.status(201).json({ message: 'Registered', qrCode });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const getUserRegistrations = async (req, res) => {
  try {
    const regs = await Registration.find({ student: req.user.id }).populate('event');
    res.status(200).json(regs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};
