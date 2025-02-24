import mongoose from 'mongoose';

// We define a user schema here to ensure our application has a clear contract for storing user data.
// Enforcing uniqueness on username and email prevents duplicate accounts and improves data integrity.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
