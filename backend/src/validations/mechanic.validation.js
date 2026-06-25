import { body } from "express-validator";

export const mechanicProfileValidation = [
  body("shopName")
    .trim()
    .notEmpty()
    .withMessage("Shop name is required"),

  body("experience")
    .isNumeric()
    .withMessage("Experience must be a number"),

  body("services")
    .isArray({ min: 1 })
    .withMessage("At least one service is required"),
];