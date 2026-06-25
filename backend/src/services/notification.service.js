import Notification from "../models/Notification.js";
import { getIO } from "../config/socket.js";

/* =====================================
   SOCKET NOTIFICATION HELPER
===================================== */

const sendNotification = (
  room,
  event,
  data
) => {
  try {
    const io = getIO();

    console.log("\n🚀 NOTIFICATION EMIT");
    console.log("Room:", room);
    console.log("Event:", event);
    console.log("Data:", data);

    io.to(room).emit(
      event,
      data
    );

    console.log(
      `✅ Notification sent successfully to ${room}`
    );
  } catch (error) {
    console.error(
      "❌ Notification Error:",
      error.message
    );
  }
};

/* =====================================
   DATABASE NOTIFICATIONS
===================================== */

export const createNotification =
  async (
    userId,
    title,
    message,
    type = "GENERAL"
  ) => {
    const notification =
      await Notification.create({
        user: userId,
        title,
        message,
        type,
      });

    console.log(
      `📩 Notification Saved: ${notification._id}`
    );

    return notification;
  };

export const getNotifications =
  async (userId) => {
    return await Notification.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  };

export const markAsRead =
  async (notificationId) => {
    return await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
  };

/* =====================================
   REAL-TIME NOTIFICATIONS
===================================== */

export const notifyNewRequest =
  async (request) => {
    console.log(
      "📢 New Service Request"
    );

    sendNotification(
      "mechanics",
      "new-request",
      request
    );
  };

export const notifyNewQuotation =
  async (
    userId,
    quotation
  ) => {
    console.log(
      `📢 New Quotation For User: ${userId}`
    );

    await createNotification(
      userId,
      "New Quotation",
      "A mechanic submitted a quotation for your request.",
      "QUOTATION"
    );

    sendNotification(
      `user-${userId}`,
      "new-quotation",
      quotation
    );
  };

export const notifyQuotationAccepted =
  async (
    mechanicId,
    data
  ) => {
    console.log(
      `📢 Quotation Accepted For Mechanic: ${mechanicId}`
    );

    await createNotification(
      mechanicId,
      "Quotation Accepted",
      "Your quotation has been accepted.",
      "QUOTATION_ACCEPTED"
    );

    sendNotification(
      `mechanic-${mechanicId}`,
      "quotation-accepted",
      data
    );
  };

export const notifyMechanicAssigned =
  async (
    userId,
    data
  ) => {
    console.log(
      `📢 Mechanic Assigned To User: ${userId}`
    );

    await createNotification(
      userId,
      "Mechanic Assigned",
      "A mechanic has been assigned to your request.",
      "ASSIGNED"
    );

    sendNotification(
      `user-${userId}`,
      "mechanic-assigned",
      data
    );
  };

export const notifyMechanicArrived =
  async (
    userId,
    data
  ) => {
    console.log(
      `📢 Mechanic Arrived For User: ${userId}`
    );

    await createNotification(
      userId,
      "Mechanic Arrived",
      "Your mechanic has arrived at your location.",
      "ARRIVED"
    );

    sendNotification(
      `user-${userId}`,
      "mechanic-arrived",
      data
    );
  };

export const notifyServiceCompleted =
  async (
    userId,
    data
  ) => {
    console.log(
      `📢 Service Completed For User: ${userId}`
    );

    await createNotification(
      userId,
      "Service Completed",
      "Your roadside assistance request has been completed.",
      "COMPLETED"
    );

    sendNotification(
      `user-${userId}`,
      "service-completed",
      data
    );
  };