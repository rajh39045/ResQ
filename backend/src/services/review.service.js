import Review from "../models/Review.js";
import Mechanic from "../models/Mechanic.js";
import ServiceRequest from "../models/ServiceRequest.js";
import ApiError from "../utils/ApiError.js";

const createReview = async (
  userId,
  reviewData
) => {
  const {
    requestId,
    rating,
    review,
  } = reviewData;

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

  if (
    request.user.toString() !==
    userId.toString()
  ) {
    throw new ApiError(
      403,
      "Not authorized"
    );
  }

  if (
    request.status !==
    "COMPLETED"
  ) {
    throw new ApiError(
      400,
      "Review can only be added after service completion"
    );
  }

  const existingReview =
    await Review.findOne({
      request: requestId,
    });

  if (existingReview) {
    throw new ApiError(
      409,
      "Review already exists"
    );
  }

  const newReview =
    await Review.create({
      request: requestId,
      user: userId,
      mechanic: request.mechanic,
      rating,
      review,
    });

  const reviews =
    await Review.find({
      mechanic: request.mechanic,
    });

  const totalRatings =
    reviews.reduce(
      (sum, item) =>
        sum + item.rating,
      0
    );

  const averageRating =
    totalRatings /
    reviews.length;

  await Mechanic.findByIdAndUpdate(
    request.mechanic,
    {
      rating:
        averageRating.toFixed(1),
      totalReviews:
        reviews.length,
    }
  );

  return newReview;
};

const getMechanicReviews =
  async (mechanicId) => {
    return await Review.find({
      mechanic: mechanicId,
    })
      .populate(
        "user",
        "name profileImage"
      )
      .sort({
        createdAt: -1,
      });
  };

const getMyReviews = async (
  userId
) => {
  return await Review.find({
    user: userId,
  })
    .populate("mechanic")
    .sort({
      createdAt: -1,
    });
};

export {
  createReview,
  getMechanicReviews,
  getMyReviews,
};