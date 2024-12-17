import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/database.js";
import { ENV_VAR } from "./config/envVars.js";

const app = express();

const PORT = ENV_VAR.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
  connectDB();
});
