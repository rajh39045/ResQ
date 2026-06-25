import Mechanic from "../models/Mechanic.js";
import ApiError from "../utils/ApiError.js";

const createMechanicProfile = async (
  userId,
  profileData
) => {
  const existingProfile =
    await Mechanic.findOne({
      user: userId,
    });

  if (existingProfile) {
    throw new ApiError(
      409,
      "Mechanic profile already exists"
    );
  }

  const mechanic =
    await Mechanic.create({
      ...profileData,
      user: userId,
    });

  return mechanic;
};

const getMechanicProfile = async (
  userId
) => {
  const mechanic =
    await Mechanic.findOne({
      user: userId,
    }).populate(
      "user",
      "name email phone profileImage"
    );

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic profile not found"
    );
  }

  return mechanic;
};

const updateMechanicProfile = async (
  userId,
  updateData
) => {
  const mechanic =
    await Mechanic.findOneAndUpdate(
      {
        user: userId,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic profile not found"
    );
  }

  return mechanic;
};

const updateMechanicLocation = async (
  userId,
  longitude,
  latitude
) => {
  const mechanic =
    await Mechanic.findOneAndUpdate(
      {
        user: userId,
      },
      {
        currentLocation: {
          type: "Point",
          coordinates: [
            longitude,
            latitude,
          ],
        },
      },
      {
        new: true,
      }
    );

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic profile not found"
    );
  }

  return mechanic;
};

const getNearbyMechanics = async (
  longitude,
  latitude,
  maxDistance = 10000
) => {
  return await Mechanic.find({
    verified: true,
    status: "ONLINE",
    currentLocation: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [
            longitude,
            latitude,
          ],
        },
        $maxDistance: maxDistance,
      },
    },
  })
    .populate(
      "user",
      "name phone profileImage"
    )
    .sort({
      rating: -1,
    });
};

export {
  createMechanicProfile,
  getMechanicProfile,
  updateMechanicProfile,
  updateMechanicLocation,
  getNearbyMechanics,
};