import {
  useState,
  useEffect,
} from "react";

import {
  Bell,
  MapPin,
  LogOut,
  User,
  ChevronDown,
  Clock,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../../context/AuthContext";

function DashboardHeader() {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const [showMenu, setShowMenu] =
    useState(false);

  const [notificationCount, setNotificationCount] =
    useState(0);

  const [time, setTime] =
    useState(new Date());

  useEffect(() => {
    loadNotificationCount();

    const timer =
      setInterval(() => {
        setTime(new Date());
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  const loadNotificationCount =
    () => {
      try {
        const notifications =
          JSON.parse(
            localStorage.getItem(
              "notifications"
            ) || "[]"
          );

        setNotificationCount(
          notifications.length
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleLogout =
    () => {
      localStorage.clear();

      logout?.();

      navigate("/login");
    };

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="sticky top-0 z-30 backdrop-blur-2xl bg-slate-950/70 border border-white/10 rounded-3xl p-5 shadow-xl"
    >
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div>

          <h2 className="text-3xl font-black text-white">
          
            <span className="text-orange-500">
              {" "}
              {user?.name || "User"}
            </span>
            
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-400 text-sm">

            <div className="flex items-center gap-2">
              <MapPin size={15} />
              Roadside Assistance Platform
            </div>

            <div className="flex items-center gap-2">
              <Clock size={15} />
              {time.toLocaleTimeString()}
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              navigate(
                "/notifications"
              )
            }
            className="relative p-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
          >

            <motion.div
              animate={{
                rotate:
                  notificationCount > 0
                    ? [0, 15, -15, 0]
                    : 0,
              }}
              transition={{
                duration: 0.6,
                repeat:
                  notificationCount > 0
                    ? Infinity
                    : 0,
                repeatDelay: 4,
              }}
            >
              <Bell size={22} />
            </motion.div>

            {notificationCount >
              0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs min-w-[20px] h-[20px] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40">
                {
                  notificationCount
                }
              </span>
            )}
          </motion.button>

          {/* User Profile */}
          <div className="relative">

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              onClick={() =>
                setShowMenu(
                  !showMenu
                )
              }
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 hover:bg-white/10 transition"
            >

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/30">
                {user?.name?.charAt(
                  0
                ) || "U"}
              </div>

              <div className="hidden sm:block text-left">

                <p className="text-white font-semibold">
                  {user?.name ||
                    "User"}
                </p>

                <p className="text-orange-400 text-xs uppercase tracking-wider">
                  {user?.role ||
                    "USER"}
                </p>

              </div>

              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${
                  showMenu
                    ? "rotate-180"
                    : ""
                }`}
              />

            </motion.button>

            <AnimatePresence>

              {showMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="absolute right-0 mt-3 w-60 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                >

                  <button
                    onClick={() =>
                      navigate(
                        "/profile"
                      )
                    }
                    className="w-full flex items-center gap-3 px-5 py-4 text-white hover:bg-white/5 transition"
                  >
                    <User size={18} />
                    Profile
                  </button>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/10 transition"
                  >
                    <LogOut
                      size={18}
                    />
                    Logout
                  </button>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </motion.header>
  );
}

export default DashboardHeader;