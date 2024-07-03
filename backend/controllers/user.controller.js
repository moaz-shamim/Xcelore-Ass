import { User } from "../models/user.model.js";

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

export const handleGetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};


export const deleteUser = async (request, response, next) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (user) {
      response.status(200).json({ message: "User has been deleted", user });
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { first_name, last_name, email, role },
      { new: true } 
    );

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};