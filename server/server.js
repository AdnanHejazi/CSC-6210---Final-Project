import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';

dotenv.config();

// Initialize the Express application to create our web server.
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Enable CORS and JSON parsing middleware to handle cross-origin requests and incoming JSON payloads.
// This approach allows our API to interact smoothly with various clients.
app.use(cors());
app.use(express.json());

// Establish a connection to MongoDB using the provided URI.
// The promise-based approach helps in logging connection status, aiding in troubleshooting.
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Mount route modules to separate authentication and item-related logic.
// This modular routing strategy enhances code clarity and future maintainability.
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
