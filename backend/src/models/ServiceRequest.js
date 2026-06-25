import mongoose from "mongoose";
import { REQUEST_STATUS } from "../utils/constants.js";

const serviceRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      default: null,
    },

    serviceType: {
      type: String,
      required: true,
    },

    breakdownLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    address: {
      type: String,
      required: true,
    },

    quotedPrice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(REQUEST_STATUS),
      default: REQUEST_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

serviceRequestSchema.index({
  breakdownLocation: "2dsphere",
});

const ServiceRequest = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);

export default ServiceRequest;