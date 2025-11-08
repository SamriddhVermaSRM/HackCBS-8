import mongoose from 'mongoose';

const counselorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
  },
  experience: {
    type: Number,
  },
  role: {
    type: String,
    default: 'counselor',
  },
}, {
  timestamps: true,
});

const Counselor = mongoose.models.Counselor || mongoose.model('Counselor', counselorSchema);

export default Counselor;