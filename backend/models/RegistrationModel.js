
import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qrCode: String,
  checkedIn: { type: Boolean, default: false },
});

export default mongoose.model('Registration', registrationSchema);
