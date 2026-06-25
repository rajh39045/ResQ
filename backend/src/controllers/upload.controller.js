import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  uploadToCloudinary,
} from "../services/upload.service.js";

export const uploadImage =
  asyncHandler(
    async (req, res) => {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "File is required",
        });
      }

      const result =
        await uploadToCloudinary(
          req.file,
          "resq"
        );

      res.status(200).json(
        new ApiResponse(
          200,
          {
            url: result.secure_url,
            publicId:
              result.public_id,
          },
          "File uploaded successfully"
        )
      );
    }
  );