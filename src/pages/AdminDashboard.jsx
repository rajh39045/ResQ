import DashboardLayout from "../layouts/DashboardLayout";

import { motion } from "framer-motion";

import {
  Users,
  Wrench,
  ClipboardList,
  CheckCircle,
  Activity,
  ArrowUpRight,
} from "lucide-react";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: 125,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Mechanics",
      value: 32,
      icon: Wrench,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Requests",
      value: 78,
      icon: ClipboardList,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Completed",
      value: 56,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  const activities = [
    {
      title: "New mechanic registration",
      time: "5 mins ago",
    },
    {
      title: "Service request completed",
      time: "20 mins ago",
    },
    {
      title: "User created a new request",
      time: "45 mins ago",
    },
    {
      title: "New quotation submitted",
      time: "1 hour ago",
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor and manage platform activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
                hover:border-orange-500/30
                transition-all
              "
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-4xl font-black text-white mt-3">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${item.bg}
                  `}
                >
                  <Icon
                    size={30}
                    className={item.color}
                  />
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Recent Activity */}
        <div
          className="
            lg:col-span-2
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-6">

            <Activity className="text-orange-500" />

            <h2 className="text-2xl font-bold text-white">
              Recent Activity
            </h2>

          </div>

          <div className="space-y-4">

            {activities.map(
              (activity, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    bg-slate-900/50
                    border
                    border-white/5
                    rounded-2xl
                    p-4
                  "
                >
                  <div>
                    <p className="text-white">
                      {activity.title}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {activity.time}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-orange-500"
                  />
                </div>
              )
            )}

          </div>
        </div>

        {/* Quick Overview */}
        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Platform Status
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">
                  Active Users
                </span>

                <span className="text-white">
                  84%
                </span>
              </div>

              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 w-[84%] bg-blue-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">
                  Mechanic Availability
                </span>

                <span className="text-white">
                  72%
                </span>
              </div>

              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 w-[72%] bg-orange-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">
                  Completed Requests
                </span>

                <span className="text-white">
                  91%
                </span>
              </div>

              <div className="h-2 bg-slate-800 rounded-full">
                <div className="h-2 w-[91%] bg-green-500 rounded-full" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;