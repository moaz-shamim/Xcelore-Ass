import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("Successfully Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection failed !!! ", err);
    process.exit(1);
  }
};

export default connectDB;
