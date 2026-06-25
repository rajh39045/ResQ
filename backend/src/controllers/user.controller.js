import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../services/user.service.js";

export const getProfile =
  asyncHandler(async (req, res) => {
    const user =
      await getUserProfile(
        req.user._id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Profile fetched successfully"
      )
    );
  });

export const updateProfile =
  asyncHandler(async (req, res) => {
    const user =
      await updateUserProfile(
        req.user._id,
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        200,
        user,
        "Profile updated successfully"
      )
    );
  });

export const deleteAccount =
  asyncHandler(async (req, res) => {
    await deleteUserAccount(
      req.user._id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Account deleted successfully"
      )
    );
  });