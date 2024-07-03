import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";
import authRoutes from "../routes/auth.routes.js";
import { errorHandler } from "../middlewares/error.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
