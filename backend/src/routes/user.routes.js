import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/user.controller.js";

const router = Router();

router.use(protect);

router.get(
  "/profile",
  getProfile
);

router.put(
  "/profile",
  updateProfile
);

router.delete(
  "/profile",
  deleteAccount
);

export default router;