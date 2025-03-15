import express from "express";
import {
  signup,
  login,
  logout,
  getUserProfile,
  addFriend,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import { deleteFriend } from "../controller/user.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUserProfile", secureRoute, getUserProfile);
router.post("/addFriend", secureRoute, addFriend);
router.post("/deleteFriend", secureRoute, deleteFriend);
export default router;
