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

    // USER ROOM
    socket.on(
      "join-user-room",
      (userId) => {
        const room =
          `user-${userId}`;

        socket.join(room);

        console.log(
          `✅ User joined room: ${room}`
        );
      }
    );

    // MECHANIC ROOM
    socket.on(
      "join-mechanic-room",
      (mechanicId) => {
        const room =
          `mechanic-${mechanicId}`;

        socket.join(room);

        console.log(
          `✅ Mechanic joined room: ${room}`
        );
      }
    );

    // ADMIN ROOM
    socket.on(
      "join-admin-room",
      (adminId) => {
        const room =
          `admin-${adminId}`;

        socket.join(room);

        console.log(
          `✅ Admin joined room: ${room}`
        );
      }
    );

    // ALL MECHANICS
    socket.on(
      "join-mechanics-room",
      () => {
        socket.join(
          "mechanics"
        );

        console.log(
          "✅ Joined mechanics room"
        );
      }
    );

    // REQUEST ROOM
    socket.on(
      "join-request-room",
      (requestId) => {
        socket.join(
          requestId
        );

        console.log(
          `✅ Joined request room: ${requestId}`
        );
      }
    );

    // LIVE TRACKING
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

    // REQUEST STATUS
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