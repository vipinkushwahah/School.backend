import { DATABASE_URL } from "./envs";

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

// ✅ Secure MongoDB Connection

console.log("Connecting to MongoDB...", DATABASE_URL);
mongoose
  .connect(DATABASE_URL as string ??"", )
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', authRoutes); // Add auth routes

// Health Check
app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
