
import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qrCode: String,
  checkedIn: { type: Boolean, default: false },
},{timestamps:true});

export default mongoose.model('Registration', registrationSchema);
