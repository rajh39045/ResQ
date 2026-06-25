import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  addReview,
  mechanicReviews,
  myReviews,
} from "../controllers/review.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  addReview
);

router.get(
  "/my",
  myReviews
);

router.get(
  "/mechanic/:mechanicId",
  mechanicReviews
);

export default router;