import express from "express";
import {
  handleGetAllUsers,
  handleGetUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/", handleGetAllUsers);
router.get("/:id", handleGetUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.put("/update/:id", verifyToken, updateUser);

export default router;
