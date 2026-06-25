import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  submitQuotation,
  getQuotations,
  selectQuotation,
} from "../controllers/quotation.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  submitQuotation
);

router.get(
  "/request/:requestId",
  getQuotations
);

router.patch(
  "/:id/accept",
  selectQuotation
);

export default router;