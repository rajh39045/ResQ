import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  updateMechanicLocation,
  getTracking,
  getCurrentTracking,
} from "../controllers/tracking.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/location",
  updateMechanicLocation
);

router.get(
  "/history/:requestId",
  getTracking
);

router.get(
  "/current/:requestId",
  getCurrentTracking
);

export default router;