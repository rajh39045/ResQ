import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createVehicle,
  getUserVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicle.service.js";

export const addVehicle = asyncHandler(
  async (req, res) => {
    const vehicle = await createVehicle(
      req.user._id,
      req.body
    );

    res.status(201).json(
      new ApiResponse(
        201,
        vehicle,
        "Vehicle added successfully"
      )
    );
  }
);

export const getVehicles = asyncHandler(
  async (req, res) => {
    const vehicles = await getUserVehicles(
      req.user._id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        vehicles,
        "Vehicles fetched successfully"
      )
    );
  }
);

export const getVehicle = asyncHandler(
  async (req, res) => {
    const vehicle = await getVehicleById(
      req.params.id,
      req.user._id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        vehicle,
        "Vehicle fetched successfully"
      )
    );
  }
);

export const editVehicle = asyncHandler(
  async (req, res) => {
    const vehicle = await updateVehicle(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        200,
        vehicle,
        "Vehicle updated successfully"
      )
    );
  }
);

export const removeVehicle = asyncHandler(
  async (req, res) => {
    await deleteVehicle(
      req.params.id,
      req.user._id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Vehicle deleted successfully"
      )
    );
  }
);