import { Server } from "socket.io";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `✅ Socket Connected: ${socket.id}`
    );

    // User Room
    socket.on(
      "join-user-room",
      (userId) => {
        socket.join(
          `user-${userId}`
        );

        console.log(
          `User joined room: user-${userId}`
        );
      }
    );

    // Mechanic Room
    socket.on(
      "join-mechanic-room",
      (mechanicId) => {
        socket.join(
          `mechanic-${mechanicId}`
        );

        console.log(
          `Mechanic joined room: mechanic-${mechanicId}`
        );
      }
    );

    // Mechanics Group
    socket.on(
      "join-mechanics-room",
      () => {
        socket.join(
          "mechanics"
        );

        console.log(
          "Mechanic joined mechanics room"
        );
      }
    );

    // Service Request Room
    socket.on(
      "join-request-room",
      (requestId) => {
        socket.join(requestId);

        console.log(
          `Joined request room: ${requestId}`
        );
      }
    );

    /* =====================================
       REAL TIME TRACKING
    ===================================== */

    socket.on(
      "mechanic-location",
      (data) => {
        console.log(
          "📍 Mechanic Location:",
          data
        );

        io.emit(
          "location-update",
          {
            latitude:
              data.latitude,
            longitude:
              data.longitude,
            mechanicId:
              data.mechanicId,
            updatedAt:
              new Date(),
          }
        );
      }
    );

    /* =====================================
       REQUEST STATUS UPDATES
    ===================================== */

    socket.on(
      "request-status-update",
      (data) => {
        io.to(
          data.requestId
        ).emit(
          "request-status-changed",
          data
        );
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          `❌ Socket Disconnected: ${socket.id}`
        );
      }
    );
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO not initialized"
    );
  }

  return io;
};

export {
  initializeSocket,
  getIO,
};