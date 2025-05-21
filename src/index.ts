import { DATABASE_URL } from "./envs";

import mongoose from "mongoose";
import express from "express";
import cors from "cors";


// ✅ Secure MongoDB Connection
mongoose
  .connect(DATABASE_URL as string ??"", )
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
