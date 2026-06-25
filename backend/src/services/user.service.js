import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateUserProfile = async (
  userId,
  updateData
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const deleteUserAccount = async (
  userId
) => {
  const user = await User.findByIdAndDelete(
    userId
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
const updateProfileImage =
  async (
    userId,
    imageUrl
  ) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        profileImage:
          imageUrl,
      },
      {
        new: true,
      }
    );
  };

export {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};