// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import { errorHandler } from "./middlewares/error.js";
// dotenv.config({
//   path: "./.env",
// });
// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// const app = express();
// import cookieParser from "cookie-parser";

// mongoose
//   .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
//   .then(() => {
//     console.log("Successfully Connected to MongoDB");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is Listning on PORT:${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection failed !!! ", err);
//   });
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
// // app.use(cookieParser());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use(errorHandler);

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./config/server.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`);
  });
});
