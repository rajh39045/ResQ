import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createRequest,
  getRequests,
  getRequest,
  acceptRequest,
  changeStatus,
} from "../controllers/serviceRequest.controller.js";

const router = Router();

router.use(protect);

router.post("/", createRequest);

router.get("/", getRequests);

router.get("/:id", getRequest);

router.patch(
  "/:id/accept",
  acceptRequest
);

router.patch(
  "/:id/status",
  changeStatus
);
router.post("/", (req, res, next) => {
  console.log("REQUEST ROUTE HIT");
  next();
}, createRequest);
export default router;