import Vehicle from "../models/Vehicle.js";
import ApiError from "../utils/ApiError.js";

const createVehicle = async (userId, vehicleData) => {
  const vehicle = await Vehicle.create({
    ...vehicleData,
    user: userId,
  });

  return vehicle;
};

const getUserVehicles = async (userId) => {
  return await Vehicle.find({ user: userId }).sort({
    createdAt: -1,
  });
};

const getVehicleById = async (vehicleId, userId) => {
  const vehicle = await Vehicle.findOne({
    _id: vehicleId,
    user: userId,
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicle;
};

const updateVehicle = async (
  vehicleId,
  userId,
  updateData
) => {
  const vehicle = await Vehicle.findOneAndUpdate(
    {
      _id: vehicleId,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicle;
};

const deleteVehicle = async (
  vehicleId,
  userId
) => {
  const vehicle = await Vehicle.findOneAndDelete({
    _id: vehicleId,
    user: userId,
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicle;
};

export {
  createVehicle,
  getUserVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};