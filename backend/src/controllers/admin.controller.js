import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardStats,
  getAllUsers,
  getAllMechanics,
  verifyMechanic,
  getAllRequests,
  removeUser,
} from "../services/admin.service.js";

export const dashboard =
  asyncHandler(async (req, res) => {
    const stats =
      await getDashboardStats();

    res.status(200).json(
      new ApiResponse(
        200,
        stats,
        "Dashboard data fetched successfully"
      )
    );
  });

export const users =
  asyncHandler(async (req, res) => {
    const users =
      await getAllUsers();

    res.status(200).json(
      new ApiResponse(
        200,
        users,
        "Users fetched successfully"
      )
    );
  });

export const mechanics =
  asyncHandler(async (req, res) => {
    const mechanics =
      await getAllMechanics();

    res.status(200).json(
      new ApiResponse(
        200,
        mechanics,
        "Mechanics fetched successfully"
      )
    );
  });

export const requests =
  asyncHandler(async (req, res) => {
    const requests =
      await getAllRequests();

    res.status(200).json(
      new ApiResponse(
        200,
        requests,
        "Requests fetched successfully"
      )
    );
  });

export const approveMechanic =
  asyncHandler(async (req, res) => {
    const mechanic =
      await verifyMechanic(
        req.params.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        mechanic,
        "Mechanic verified successfully"
      )
    );
  });

export const deleteUser =
  asyncHandler(async (req, res) => {
    const user =
      await removeUser(
        req.params.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        user,
        "User deleted successfully"
      )
    );
  });