import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  updateLocation,
  getTrackingHistory,
  getCurrentLocation,
} from "../services/tracking.service.js";

export const updateMechanicLocation =
  asyncHandler(
    async (req, res) => {
      const {
        requestId,
        longitude,
        latitude,
      } = req.body;

      const tracking =
        await updateLocation(
          req.user._id,
          requestId,
          longitude,
          latitude
        );

      res.status(200).json(
        new ApiResponse(
          200,
          tracking,
          "Location updated successfully"
        )
      );
    }
  );

export const getTracking =
  asyncHandler(
    async (req, res) => {
      const tracking =
        await getTrackingHistory(
          req.params.requestId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          tracking,
          "Tracking history fetched successfully"
        )
      );
    }
  );

export const getCurrentTracking =
  asyncHandler(
    async (req, res) => {
      const tracking =
        await getCurrentLocation(
          req.params.requestId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          tracking,
          "Current location fetched successfully"
        )
      );
    }
  );