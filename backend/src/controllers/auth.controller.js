import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

export const register = asyncHandler(
  async (req, res) => {
    const result = await registerUser(req.body);

    res.status(201).json(
      new ApiResponse(
        201,
        result,
        "User registered successfully"
      )
    );
  }
);

export const login = asyncHandler(
  async (req, res) => {
    const result = await loginUser(
      req.body.email,
      req.body.password
    );

    res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Login successful"
      )
    );
  }
);

export const me = asyncHandler(
  async (req, res) => {
    const user = await getCurrentUser(
      req.user._id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        user,
        "User profile fetched"
      )
    );
  }
);