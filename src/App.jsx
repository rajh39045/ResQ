import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";
import socket from "./socket/socket";

function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (user.role === "USER") {
      socket.emit(
        "join-user-room",
        user._id
      );

    }

    if (user.role === "MECHANIC") {
      socket.emit(
        "join-mechanic-room",
        user._id
      );

      socket.emit(
        "join-mechanics-room"
      );
    }

    if (user.role === "ADMIN") {
      socket.emit(
        "join-admin-room",
        user._id
      );

      
    }
  }, [user]);

  return <AppRoutes />;
}

export default App;