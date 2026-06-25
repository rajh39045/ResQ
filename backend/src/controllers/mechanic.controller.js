import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ServiceRequest from "../models/ServiceRequest.js";

import {
  createMechanicProfile,
  getMechanicProfile,
  updateMechanicProfile,
  updateMechanicLocation,
  getNearbyMechanics,
} from "../services/mechanic.service.js";

/* ==========================
   PROFILE
========================== */

export const createProfile =
  asyncHandler(async (req, res) => {
    const mechanic =
      await createMechanicProfile(
        req.user._id,
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        mechanic,
        "Mechanic profile created successfully"
      )
    );
  });

export const getProfile =
  asyncHandler(async (req, res) => {
    const mechanic =
      await getMechanicProfile(
        req.user._id
      );

    if (!mechanic) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Mechanic profile not found"
        )
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        mechanic,
        "Mechanic profile fetched successfully"
      )
    );
  });

export const updateProfile =
  asyncHandler(async (req, res) => {
    const mechanic =
      await updateMechanicProfile(
        req.user._id,
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        200,
        mechanic,
        "Mechanic profile updated successfully"
      )
    );
  });

/* ==========================
   LOCATION
========================== */

export const updateLocation =
  asyncHandler(async (req, res) => {
    const {
      longitude,
      latitude,
    } = req.body;

    const mechanic =
      await updateMechanicLocation(
        req.user._id,
        longitude,
        latitude
      );

    res.status(200).json(
      new ApiResponse(
        200,
        mechanic,
        "Location updated successfully"
      )
    );
  });

export const nearbyMechanics =
  asyncHandler(async (req, res) => {
    const {
      longitude,
      latitude,
    } = req.query;

    const mechanics =
      await getNearbyMechanics(
        Number(longitude),
        Number(latitude)
      );

    res.status(200).json(
      new ApiResponse(
        200,
        mechanics,
        "Nearby mechanics fetched successfully"
      )
    );
  });

/* ==========================
   AVAILABLE REQUESTS
========================== */

export const getAvailableRequests =
  asyncHandler(async (req, res) => {
    const requests =
      await ServiceRequest.find({
        status: "PENDING",
      })
        .populate(
          "vehicle",
          "vehicleNumber vehicleType brand model"
        )
        .populate(
          "user",
          "name phone"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      new ApiResponse(
        200,
        requests,
        "Available requests fetched successfully"
      )
    );
  });

/* ==========================
   ACTIVE JOBS
========================== */

export const getActiveJobs =
  asyncHandler(async (req, res) => {
    const jobs =
      await ServiceRequest.find({
        status: {
          $in: [
            "ACCEPTED",
            "IN_PROGRESS",
          ],
        },
      })
        .populate(
          "vehicle",
          "vehicleNumber vehicleType brand model"
        )
        .populate(
          "user",
          "name phone"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      new ApiResponse(
        200,
        jobs,
        "Active jobs fetched successfully"
      )
    );
  });

export const startJob =
  asyncHandler(async (req, res) => {
    const job =
      await ServiceRequest.findByIdAndUpdate(
        req.params.id,
        {
          status: "IN_PROGRESS",
        },
        {
          new: true,
        }
      );

    if (!job) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Job not found"
        )
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        job,
        "Job started successfully"
      )
    );
  });

export const completeJob =
  asyncHandler(async (req, res) => {
    const job =
      await ServiceRequest.findByIdAndUpdate(
        req.params.id,
        {
          status: "COMPLETED",
        },
        {
          new: true,
        }
      );

    if (!job) {
      return res.status(404).json(
        new ApiResponse(
          404,
          null,
          "Job not found"
        )
      );
    }

    res.status(200).json(
      new ApiResponse(
        200,
        job,
        "Job completed successfully"
      )
    );
  });