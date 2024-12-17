import dotenv from "dotenv";

dotenv.config();

export const ENV_VAR = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5001,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
