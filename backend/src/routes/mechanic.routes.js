import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createProfile,
  getProfile,
  updateProfile,
  updateLocation,
  nearbyMechanics,
  getAvailableRequests,
  getActiveJobs,
  startJob,
  completeJob,
} from "../controllers/mechanic.controller.js";

const router = Router();

/* Public Routes */
router.get(
  "/nearby",
  nearbyMechanics
);

/* Protected Routes */
router.use(protect);

router.get(
  "/requests",
  getAvailableRequests
);

router.get(
  "/active-jobs",
  getActiveJobs
);

router.patch(
  "/jobs/:id/start",
  startJob
);

router.patch(
  "/jobs/:id/complete",
  completeJob
);

router.post(
  "/profile",
  createProfile
);

router.get(
  "/profile",
  getProfile
);

router.put(
  "/profile",
  updateProfile
);

router.patch(
  "/location",
  updateLocation
);

export default router;