import mongoose from 'mongoose';

// We define a schema for items to standardize the data structure for lost and found records.
// This structured model enables consistent storage and querying of items in our MongoDB database.
const itemSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost', 'found'], required: true },
  title: { type: String, required: true },
  description: String,
  contact: String,
  location: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


export default mongoose.model('Item', itemSchema);
