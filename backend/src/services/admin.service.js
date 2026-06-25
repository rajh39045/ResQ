import User from "../models/User.js";
import Mechanic from "../models/Mechanic.js";
import ServiceRequest from "../models/ServiceRequest.js";
import Review from "../models/Review.js";
import ApiError from "../utils/ApiError.js";

const getDashboardStats = async () => {
  const [
    totalUsers,
    totalMechanics,
    totalRequests,
    completedRequests,
    totalReviews,
  ] = await Promise.all([
    User.countDocuments({ role: "USER" }),
    Mechanic.countDocuments(),
    ServiceRequest.countDocuments(),
    ServiceRequest.countDocuments({
      status: "COMPLETED",
    }),
    Review.countDocuments(),
  ]);

  return {
    totalUsers,
    totalMechanics,
    totalRequests,
    completedRequests,
    totalReviews,
  };
};

const getAllUsers = async () => {
  return await User.find()
    .select("-password")
    .sort({ createdAt: -1 });
};

const getAllMechanics = async () => {
  return await Mechanic.find()
    .populate(
      "user",
      "name email phone profileImage"
    )
    .sort({ createdAt: -1 });
};

const verifyMechanic = async (
  mechanicId
) => {
  const mechanic =
    await Mechanic.findByIdAndUpdate(
      mechanicId,
      {
        verified: true,
      },
      {
        new: true,
      }
    );

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic not found"
    );
  }

  return mechanic;
};

const getAllRequests = async () => {
  return await ServiceRequest.find()
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
    })
    .sort({ createdAt: -1 });
};

const removeUser = async (id) => {
  const user =
    await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  return user;
};

export {
  getDashboardStats,
  getAllUsers,
  getAllMechanics,
  verifyMechanic,
  getAllRequests,
  removeUser,
};