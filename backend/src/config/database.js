import mongoose from "mongoose";
import { ENV_VAR } from "./envVars.js";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENV_VAR.MONGO_URI);
    console.log("MongoDB connected:", connect.connection.host);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};
