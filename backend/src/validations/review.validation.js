import { body } from "express-validator";

export const createReviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("review")
    .trim()
    .notEmpty()
    .withMessage("Review is required")
    .isLength({ min: 5 })
    .withMessage("Review must be at least 5 characters"),
];