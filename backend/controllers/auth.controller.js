import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { errorHandler } from "../middlewares/error.js";
import jwt from "jsonwebtoken";

export const signup = async (request, response, next) => {
  try {
    const { first_name, last_name, email, password, role } = request.body;

    if (!first_name || !last_name || !email || !password) {
      return response.status(400).send({
        message:
          "Send all the required fields: first_name, last_name, email, password",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return response.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send({
        message: "Send all the required fields  email, password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not Found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user._email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const options = {
      httpOnly: true,
    };

    const loggedInUser = await User.findById(user._id).select("-password ");

    return response
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(loggedInUser);
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

export const signout = (request, response) => {
  response.clearCookie("accessToken").status(200).json("Signout success!");
};
