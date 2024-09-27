import {
  userLogin,
  userLogout,
  registerUser,
} from "../controller/UserController.mjs";
import express from "express";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;
