import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    services: [
      {
        type: String,
        required: true,
      },
    ],

    pricing: {
      breakdownRepair: {
        type: Number,
        default: 0,
        min: 0,
      },

      towing: {
        type: Number,
        default: 0,
        min: 0,
      },

      batteryJumpStart: {
        type: Number,
        default: 0,
        min: 0,
      },

      flatTireRepair: {
        type: Number,
        default: 0,
        min: 0,
      },

      fuelDelivery: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    currentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verificationDocuments: [
      {
        type: String,
      },
    ],

    profileImage: {
      type: String,
      default: "",
    },

    serviceRadius: {
      type: Number,
      default: 20,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalJobsCompleted: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE", "BUSY"],
      default: "OFFLINE",
    },
  },
  {
    timestamps: true,
  }
);

mechanicSchema.index({
  currentLocation: "2dsphere",
});

mechanicSchema.index({
  verified: 1,
  status: 1,
});

const Mechanic = mongoose.model(
  "Mechanic",
  mechanicSchema
);

export default Mechanic;