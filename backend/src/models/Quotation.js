import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
    },

    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    estimatedArrivalTime: {
      type: Number,
      required: true,
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model(
  "Quotation",
  quotationSchema
);

export default Quotation;