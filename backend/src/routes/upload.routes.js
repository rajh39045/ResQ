import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  uploadImage,
} from "../controllers/upload.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/image",
  upload.single("image"),
  uploadImage
);

export default router;