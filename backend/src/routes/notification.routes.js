import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  getUserNotifications,
  readNotification,
} from "../controllers/notification.controller.js";

const router = Router();

router.use(protect);

router.get(
  "/",
  getUserNotifications
);

router.patch(
  "/:id/read",
  readNotification
);

export default router;