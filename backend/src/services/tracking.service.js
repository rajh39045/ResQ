import Tracking from "../models/Tracking.js";
import ServiceRequest from "../models/ServiceRequest.js";
import Mechanic from "../models/Mechanic.js";
import ApiError from "../utils/ApiError.js";

const updateLocation = async (
  mechanicUserId,
  requestId,
  longitude,
  latitude
) => {
  const mechanic = await Mechanic.findOne({
    user: mechanicUserId,
  });

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic profile not found"
    );
  }

  const request = await ServiceRequest.findById(
    requestId
  );

  if (!request) {
    throw new ApiError(
      404,
      "Service request not found"
    );
  }

  await Mechanic.findByIdAndUpdate(
    mechanic._id,
    {
      currentLocation: {
        type: "Point",
        coordinates: [
          longitude,
          latitude,
        ],
      },
    }
  );

  const tracking = await Tracking.create({
    request: requestId,
    mechanic: mechanic._id,
    location: {
      type: "Point",
      coordinates: [
        longitude,
        latitude,
      ],
    },
  });

  return tracking;
};

const getTrackingHistory = async (
  requestId
) => {
  return await Tracking.find({
    request: requestId,
  })
    .sort({
      createdAt: 1,
    })
    .populate("mechanic");
};

const getCurrentLocation = async (
  requestId
) => {
  const tracking = await Tracking.findOne({
    request: requestId,
  })
    .sort({
      createdAt: -1,
    })
    .populate("mechanic");

  if (!tracking) {
    throw new ApiError(
      404,
      "Tracking data not found"
    );
  }

  return tracking;
};

export {
  updateLocation,
  getTrackingHistory,
  getCurrentLocation,
};