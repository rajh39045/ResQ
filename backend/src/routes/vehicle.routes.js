import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createVehicleValidation,
  updateVehicleValidation,
} from "../validations/vehicle.validation.js";

import {
  addVehicle,
  getVehicles,
  getVehicle,
  editVehicle,
  removeVehicle,
} from "../controllers/vehicle.controller.js";

const router = Router();

router.use(protect);

router.post(
  "/",
  createVehicleValidation,
  validate,
  addVehicle
);

router.get("/", getVehicles);

router.get("/:id", getVehicle);

router.put(
  "/:id",
  updateVehicleValidation,
  validate,
  editVehicle
);

router.delete("/:id", removeVehicle);

export default router;