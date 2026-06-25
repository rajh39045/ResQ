import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  dashboard,
  users,
  mechanics,
  requests,
  approveMechanic,deleteUser
} from "../controllers/admin.controller.js";

const router = Router();

router.use(protect);

router.use(authorize("ADMIN"));

router.get(
  "/dashboard",
  dashboard
);

router.get(
  "/users",
  users
);

router.get(
  "/mechanics",
  mechanics
);

router.get(
  "/requests",
  requests
);

router.patch(
  "/mechanics/:id/verify",
  approveMechanic
);
router.delete(
  "/users/:id",
  deleteUser
);

export default router;