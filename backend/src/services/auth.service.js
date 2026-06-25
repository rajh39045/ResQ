import User from "../models/User.js";
import Mechanic from "../models/Mechanic.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

const registerUser = async (userData) => {
  const {
    name,
    email,
    phone,
    password,
    role,
  } = userData;

  /* Check Email */
  const existingEmail =
    await User.findOne({
      email,
    });

  if (existingEmail) {
    throw new ApiError(
      409,
      "Email already exists"
    );
  }

  /* Check Phone */
  const existingPhone =
    await User.findOne({
      phone,
    });

  if (existingPhone) {
    throw new ApiError(
      409,
      "Phone number already exists"
    );
  }

  /* Create User */
  const user =
    await User.create({
      name,
      email,
      phone,
      password,
      role,
    });

  /* Auto Create Mechanic Profile */
  if (role === "MECHANIC") {
    await Mechanic.create({
      user: user._id,

      shopName: `${name}'s Garage`,

      experience: 0,

      services: [
        "Breakdown Repair",
      ],

      pricing: {
        breakdownRepair: 0,
        towing: 0,
        batteryJumpStart: 0,
        flatTireRepair: 0,
        fuelDelivery: 0,
      },

      currentLocation: {
        type: "Point",
        coordinates: [0, 0],
      },

      verified: false,

      serviceRadius: 20,

      rating: 0,

      totalReviews: 0,

      totalJobsCompleted: 0,

      status: "OFFLINE",
    });
  }

  const token =
    generateToken({
      id: user._id,
      role: user.role,
    });

  return {
    user,
    token,
  };
};

const loginUser = async (
  email,
  password
) => {
  const user =
    await User.findOne({
      email,
    }).select("+password");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  const isPasswordMatched =
    await user.comparePassword(
      password
    );

  if (!isPasswordMatched) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  user.lastLogin =
    new Date();

  await user.save();

  const token =
    generateToken({
      id: user._id,
      role: user.role,
    });

  return {
    user,
    token,
  };
};

const getCurrentUser =
  async (userId) => {
    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  };

export {
  registerUser,
  loginUser,
  getCurrentUser,
};