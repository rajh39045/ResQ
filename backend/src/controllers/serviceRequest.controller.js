import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createServiceRequest,
  getUserRequests,
  getRequestById,
  assignMechanic,
  updateRequestStatus,
} from "../services/serviceRequest.service.js";

export const createRequest =
  asyncHandler(
    async (req, res) => {
      const request =
        await createServiceRequest(
          req.user._id,
          req.body
        );

      res.status(201).json(
        new ApiResponse(
          201,
          request,
          "Service request created successfully"
        )
      );
    }
  );

export const getRequests =
  asyncHandler(
    async (req, res) => {
      const requests =
        await getUserRequests(
          req.user._id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          requests,
          "Requests fetched successfully"
        )
      );
    }
  );

export const getRequest =
  asyncHandler(
    async (req, res) => {
      const request =
        await getRequestById(
          req.params.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          request,
          "Request fetched successfully"
        )
      );
    }
  );

export const acceptRequest =
  asyncHandler(
    async (req, res) => {
      const request =
        await assignMechanic(
          req.params.id,
          req.body.mechanicId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          request,
          "Mechanic assigned successfully"
        )
      );
    }
  );

export const changeStatus =
  asyncHandler(
    async (req, res) => {
      const request =
        await updateRequestStatus(
          req.params.id,
          req.body.status
        );

      res.status(200).json(
        new ApiResponse(
          200,
          request,
          "Status updated successfully"
        )
      );
    }
  );