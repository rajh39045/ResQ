import dotenv from "dotenv";
import http from "http";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./config/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});