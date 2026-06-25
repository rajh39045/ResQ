import { body } from "express-validator";

export const createRequestValidation = [
  body("vehicleId")
    .notEmpty()
    .withMessage("Vehicle ID is required"),

  body("serviceType")
    .notEmpty()
    .withMessage("Service type is required"),

  body("location.lat")
    .isFloat()
    .withMessage("Valid latitude is required"),

  body("location.lng")
    .isFloat()
    .withMessage("Valid longitude is required"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),
];