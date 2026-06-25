import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createReview,
  getMechanicReviews,
  getMyReviews,
} from "../services/review.service.js";

export const addReview =
  asyncHandler(
    async (req, res) => {
      const review =
        await createReview(
          req.user._id,
          req.body
        );

      res.status(201).json(
        new ApiResponse(
          201,
          review,
          "Review submitted successfully"
        )
      );
    }
  );

export const mechanicReviews =
  asyncHandler(
    async (req, res) => {
      const reviews =
        await getMechanicReviews(
          req.params.mechanicId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          reviews,
          "Reviews fetched successfully"
        )
      );
    }
  );

export const myReviews =
  asyncHandler(
    async (req, res) => {
      const reviews =
        await getMyReviews(
          req.user._id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          reviews,
          "Reviews fetched successfully"
        )
      );
    }
  );