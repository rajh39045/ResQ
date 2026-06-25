import DashboardLayout from "../layouts/DashboardLayout";

import { motion } from "framer-motion";

import {
  Car,
  ClipboardList,
  CheckCircle,
  Star,
  Plus,
  Wrench,
  MapPinned,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Vehicles",
      value: 5,
      icon: Car,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Requests",
      value: 12,
      icon: ClipboardList,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Completed",
      value: 8,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <DashboardLayout>

      {/* Welcome Section */}
      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-black text-white">
          Welcome Back 
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage your vehicles, requests and track roadside assistance in real time.
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
                y: -5,
              }}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
                hover:border-orange-500/20
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
                    size={28}
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

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <button
              className="
                p-5
                rounded-2xl
                bg-orange-500/10
                border
                border-orange-500/20
                hover:bg-orange-500/20
                transition
              "
            >
              <Plus
                className="text-orange-500 mb-3"
                size={28}
              />

              <h3 className="text-white font-semibold">
                Add Vehicle
              </h3>
            </button>

            <button
              className="
                p-5
                rounded-2xl
                bg-blue-500/10
                border
                border-blue-500/20
                hover:bg-blue-500/20
                transition
              "
            >
              <Wrench
                className="text-blue-400 mb-3"
                size={28}
              />

              <h3 className="text-white font-semibold">
                Request Service
              </h3>
            </button>

            <button
              className="
                p-5
                rounded-2xl
                bg-green-500/10
                border
                border-green-500/20
                hover:bg-green-500/20
                transition
              "
            >
              <MapPinned
                className="text-green-400 mb-3"
                size={28}
              />

              <h3 className="text-white font-semibold">
                Track Mechanic
              </h3>
            </button>

          </div>

        </div>

        {/* Activity */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            {[
              "Vehicle Added Successfully",
              "Battery Service Requested",
              "Mechanic Assigned",
              "Service Completed",
            ].map(
              (item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    bg-slate-900/50
                    rounded-2xl
                    p-4
                  "
                >
                  <span className="text-slate-300 text-sm">
                    {item}
                  </span>

                  <ArrowRight
                    size={16}
                    className="text-orange-500"
                  />
                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* Service Overview */}
      <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Service Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-slate-900/50 rounded-2xl p-5">
            <p className="text-slate-400">
              Pending Requests
            </p>

            <h3 className="text-3xl font-bold text-yellow-400 mt-2">
              4
            </h3>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-5">
            <p className="text-slate-400">
              Active Mechanics
            </p>

            <h3 className="text-3xl font-bold text-blue-400 mt-2">
              12
            </h3>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-5">
            <p className="text-slate-400">
              Completed Services
            </p>

            <h3 className="text-3xl font-bold text-green-400 mt-2">
              8
            </h3>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;