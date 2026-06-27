import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import socket from "../socket/socket";

import { getNotifications } from "../api/notificationApi";

import { motion } from "framer-motion";

import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
} from "lucide-react";

import {
  formatDistanceToNow,
} from "date-fns";

function Notifications() {
  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();

    socket.on(
      "new-quotation",
      fetchNotifications
    );

    socket.on(
      "quotation-accepted",
      fetchNotifications
    );

    socket.on(
      "service-completed",
      fetchNotifications
    );

    return () => {
      socket.off(
        "new-quotation"
      );

      socket.off(
        "quotation-accepted"
      );

      socket.off(
        "service-completed"
      );
    };
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const response =
          await getNotifications();

        setNotifications(
          response?.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const unreadCount =
    notifications.filter(
      (item) => !item.isRead
    ).length;

  const getIcon = (title) => {
    const text =
      title?.toLowerCase() || "";

    if (
      text.includes("accepted")
    ) {
      return (
        <CheckCircle className="text-green-400" />
      );
    }

    if (
      text.includes("quotation")
    ) {
      return (
        <AlertCircle className="text-yellow-400" />
      );
    }

    return (
      <Info className="text-blue-400" />
    );
  };

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-4xl font-black text-white">
            Notifications
          </h1>

          <p className="text-slate-400 mt-2">
            Stay updated with your
            latest activities
          </p>

        </div>

        <div
          className="
            px-5
            py-3
            rounded-2xl
            bg-orange-500/10
            border
            border-orange-500/20
            text-orange-400
            font-semibold
          "
        >
          {unreadCount}
          {" "}
          Unread
        </div>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="space-y-4">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-28
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                "
              />
            )
          )}

        </div>
      ) : notifications.length ===
        0 ? (

        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-12
            text-center
          "
        >

          <Bell
            size={60}
            className="
              mx-auto
              text-orange-500
              mb-4
            "
          />

          <h2 className="text-3xl font-bold text-white">
            No Notifications
          </h2>

          <p className="text-slate-400 mt-3">
            You're all caught up.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {notifications.map(
            (
              notification,
              index
            ) => (
              <motion.div
                key={
                  notification._id
                }
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                whileHover={{
                  y: -2,
                }}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-5
                  hover:border-orange-500/20
                  transition-all
                "
              >

                <div className="flex gap-4">

                  <div className="mt-1">
                    {getIcon(
                      notification.title
                    )}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between items-start gap-3">

                      <div>

                        <h3 className="text-white font-bold text-lg">
                          {
                            notification.title
                          }
                        </h3>

                        <p className="text-slate-400 mt-2">
                          {
                            notification.message
                          }
                        </p>

                      </div>

                      {!notification.isRead && (
                        <span
                          className="
                            w-3
                            h-3
                            rounded-full
                            bg-orange-500
                            animate-pulse
                          "
                        />
                      )}

                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-4">

                      <Clock
                        size={14}
                      />

                      {formatDistanceToNow(
                        new Date(
                          notification.createdAt
                        ),
                        {
                          addSuffix: true,
                        }
                      )}

                    </div>

                  </div>

                </div>

              </motion.div>
            )
          )}

        </div>

      )}

    </DashboardLayout>
  );
}

export default Notifications;