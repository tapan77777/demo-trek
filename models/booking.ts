import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  trek: String,
  payment_id: String,
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
