import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/database.js";
import { ENV_VAR } from "./config/envVars.js";

dotenv.config();
const app = express();

const PORT = ENV_VAR.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
  connectDB();
});
