import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_SOCKET_URL,
  {
    transports: [
      "websocket",
      "polling",
    ],
    withCredentials: true,
  }
);

socket.on(
  "connect",
  () => {
    console.log(
      "Socket Connected:",
      socket.id
    );
  }
);

socket.on(
  "connect_error",
  (error) => {
    console.log(
      "Socket Error:",
      error.message
    );
  }
);

export default socket;