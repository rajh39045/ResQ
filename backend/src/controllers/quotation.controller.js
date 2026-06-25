import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createQuotation,
  getRequestQuotations,
  acceptQuotation,
} from "../services/quotation.service.js";

export const submitQuotation =
  asyncHandler(
    async (req, res) => {
      const quotation =
        await createQuotation(
          req.user._id,
          req.body
        );

      res.status(201).json(
        new ApiResponse(
          201,
          quotation,
          "Quotation submitted successfully"
        )
      );
    }
  );

export const getQuotations =
  asyncHandler(
    async (req, res) => {
      const quotations =
        await getRequestQuotations(
          req.params.requestId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          quotations,
          "Quotations fetched successfully"
        )
      );
    }
  );

export const selectQuotation =
  asyncHandler(
    async (req, res) => {
      const quotation =
        await acceptQuotation(
          req.params.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          quotation,
          "Quotation accepted successfully"
        )
      );
    }
  );