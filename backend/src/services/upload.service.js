import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

const uploadToCloudinary = async (
  file,
  folder = "resq"
) => {
  try {
    if (!file) {
      throw new ApiError(
        400,
        "No file provided"
      );
    }

    const fileBase64 =
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result =
      await cloudinary.uploader.upload(
        fileBase64,
        {
          folder,
          resource_type: "auto",
        }
      );

    return result;
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "File upload failed"
    );
  }
};

const deleteFromCloudinary =
  async (publicId) => {
    try {
      return await cloudinary.uploader.destroy(
        publicId
      );
    } catch (error) {
      throw new ApiError(
        500,
        error.message
      );
    }
  };

export {
  uploadToCloudinary,
  deleteFromCloudinary,
};