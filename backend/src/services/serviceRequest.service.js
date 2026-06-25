import ServiceRequest from "../models/ServiceRequest.js";
import Vehicle from "../models/Vehicle.js";
import Mechanic from "../models/Mechanic.js";
import ApiError from "../utils/ApiError.js";

const createServiceRequest = async (
  userId,
  requestData
) => {
  const {
    vehicle,
    serviceType,
    address,
    breakdownLocation,
  } = requestData;

  const vehicleDoc =
    await Vehicle.findOne({
      _id: vehicle,
      user: userId,
    });

  if (!vehicleDoc) {
    throw new ApiError(
      404,
      "Vehicle not found"
    );
  }

  const request =
    await ServiceRequest.create({
      user: userId,
      vehicle,
      serviceType,
      breakdownLocation: {
        type: "Point",
        coordinates:
          breakdownLocation.coordinates,
      },
      address,
    });

  return request;
};

const getUserRequests = async (
  userId
) => {
  return await ServiceRequest.find({
    user: userId,
  })
    .populate("vehicle")
    .populate({
      path: "mechanic",
      populate: {
        path: "user",
        select:
          "name email phone",
      },
    })
    .sort({
      createdAt: -1,
    });
};

const getRequestById = async (
  requestId
) => {
  const request =
    await ServiceRequest.findById(
      requestId
    )
      .populate(
        "user",
        "name email phone"
      )
      .populate("vehicle")
      .populate({
        path: "mechanic",
        populate: {
          path: "user",
          select:
            "name email phone",
        },
      });

  if (!request) {
    throw new ApiError(
      404,
      "Service request not found"
    );
  }

  return request;
};

const assignMechanic = async (
  requestId,
  mechanicId
) => {
  const request =
    await ServiceRequest.findById(
      requestId
    );

  if (!request) {
    throw new ApiError(
      404,
      "Service request not found"
    );
  }

  const mechanic =
    await Mechanic.findById(
      mechanicId
    );

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic not found"
    );
  }

  request.mechanic =
    mechanicId;

  request.status =
    "ACCEPTED";

  await request.save();

  return request;
};

const updateRequestStatus =
  async (
    requestId,
    status
  ) => {
    const request =
      await ServiceRequest.findById(
        requestId
      );

    if (!request) {
      throw new ApiError(
        404,
        "Service request not found"
      );
    }

    request.status =
      status;

    await request.save();

    return request;
  };

export {
  createServiceRequest,
  getUserRequests,
  getRequestById,
  assignMechanic,
  updateRequestStatus,
};