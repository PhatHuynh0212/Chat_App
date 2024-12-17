import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/envVars.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VAR.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt-chatApp", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VAR.NODE_ENV !== "development",
  });

  return token;
};
