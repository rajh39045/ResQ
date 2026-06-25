import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getNotifications,
  markAsRead,
} from "../services/notification.service.js";

export const getUserNotifications =
  asyncHandler(
    async (req, res) => {
      const notifications =
        await getNotifications(
          req.user._id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          notifications,
          "Notifications fetched"
        )
      );
    }
  );

export const readNotification =
  asyncHandler(
    async (req, res) => {
      const notification =
        await markAsRead(
          req.params.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          notification,
          "Notification marked as read"
        )
      );
    }
  );