import Quotation from "../models/Quotation.js";
import ServiceRequest from "../models/ServiceRequest.js";
import Mechanic from "../models/Mechanic.js";
import ApiError from "../utils/ApiError.js";

import {
  notifyNewQuotation,
  notifyQuotationAccepted,
} from "./notification.service.js";

const createQuotation = async (
  mechanicUserId,
  quotationData
) => {
  const {
    requestId,
    amount,
    estimatedArrivalTime,
  } = quotationData;

  const mechanic =
    await Mechanic.findOne({
      user: mechanicUserId,
    });

  if (!mechanic) {
    throw new ApiError(
      404,
      "Mechanic profile not found"
    );
  }

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

  const existingQuotation =
    await Quotation.findOne({
      request: requestId,
      mechanic: mechanic._id,
    });

  if (existingQuotation) {
    throw new ApiError(
      409,
      "Quotation already submitted"
    );
  }

  const quotation =
    await Quotation.create({
      request: requestId,
      mechanic: mechanic._id,
      amount,
      estimatedArrivalTime,
    });

  console.log(
    "✅ Quotation Created:",
    quotation._id
  );

  console.log(
    "📩 User To Notify:",
    request.user.toString()
  );

  await notifyNewQuotation(
    request.user.toString(),
    {
      quotationId:
        quotation._id.toString(),
      requestId,
      mechanicId:
        mechanic._id.toString(),
      amount,
      estimatedArrivalTime,
      message:
        "New quotation received from a mechanic",
    }
  );

  console.log(
    "🚀 New Quotation Notification Sent"
  );

  return quotation;
};

const getRequestQuotations =
  async (requestId) => {
    return await Quotation.find({
      request: requestId,
    })
      .populate({
        path: "mechanic",
        populate: {
          path: "user",
          select:
            "name phone profileImage",
        },
      })
      .sort({
        amount: 1,
      });
  };

const acceptQuotation = async (
  quotationId
) => {
  const quotation =
    await Quotation.findById(
      quotationId
    )
      .populate({
        path: "mechanic",
        populate: {
          path: "user",
          select:
            "_id name phone",
        },
      })
      .populate(
        "request"
      );

  if (!quotation) {
    throw new ApiError(
      404,
      "Quotation not found"
    );
  }

  await Quotation.updateMany(
    {
      request:
        quotation.request._id,
    },
    {
      isAccepted: false,
    }
  );

  quotation.isAccepted = true;

  await quotation.save();

  const updatedRequest =
    await ServiceRequest.findByIdAndUpdate(
      quotation.request._id,
      {
        mechanic:
          quotation.mechanic._id,
        quotedPrice:
          quotation.amount,
        status: "ACCEPTED",
      },
      {
        new: true,
      }
    );

  console.log(
    "✅ Quotation Accepted:",
    quotation._id
  );

  await notifyQuotationAccepted(
    quotation.mechanic.user._id.toString(),
    {
      requestId:
        quotation.request._id.toString(),
      quotationId:
        quotation._id.toString(),
      amount:
        quotation.amount,
      message:
        "Your quotation has been accepted",
    }
  );

  console.log(
    "🚀 Quotation Accepted Notification Sent"
  );

  return updatedRequest;
};

export {
  createQuotation,
  getRequestQuotations,
  acceptQuotation,
};