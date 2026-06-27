import DashboardLayout from "../layouts/DashboardLayout";

import { motion } from "framer-motion";

import {
  ClipboardList,
  Clock,
  CheckCircle,
  IndianRupee,
  Star,
  Navigation,
  Wrench,
  ArrowRight,
} from "lucide-react";

function MechanicDashboard() {
  const stats = [
    {
      title: "Total Requests",
      value: 48,
      icon: ClipboardList,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Pending Quotes",
      value: 6,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Active Jobs",
      value: 3,
      icon: Navigation,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed",
      value: 39,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  const recentJobs = [
    {
      service: "Battery Jump Start",
      customer: "Harsh Raj",
      status: "Completed",
    },
    {
      service: "Flat Tire Repair",
      customer: "Rahul Kumar",
      status: "In Progress",
    },
    {
      service: "Fuel Delivery",
      customer: "Amit Singh",
      status: "Completed",
    },
  ];

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-black text-white">
          Mechanic Dashboard 🔧
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Manage requests, quotations and active service jobs.
        </p>

      </div>

      {/* Stats */}

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

        {/* Earnings Card */}

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
          <div className="flex items-center gap-3 mb-4">

            <IndianRupee
              size={28}
              className="text-green-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Earnings
            </h2>

          </div>

          <h3 className="text-5xl font-black text-green-400">
            ₹24,500
          </h3>

          <p className="text-slate-400 mt-2">
            Total earnings this month
          </p>

        </div>

        {/* Rating */}

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
          <div className="flex items-center gap-3 mb-4">

            <Star
              size={28}
              className="text-yellow-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Rating
            </h2>

          </div>

          <h3 className="text-5xl font-black text-yellow-400">
            4.9
          </h3>

          <p className="text-slate-400 mt-2">
            Based on 128 reviews
          </p>

        </div>

        {/* Performance */}

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
          <div className="flex items-center gap-3 mb-4">

            <Wrench
              size={28}
              className="text-orange-500"
            />

            <h2 className="text-2xl font-bold text-white">
              Today
            </h2>

          </div>

          <h3 className="text-5xl font-black text-orange-500">
            7
          </h3>

          <p className="text-slate-400 mt-2">
            Jobs completed today
          </p>

        </div>

      </div>

      {/* Quick Actions + Recent Jobs */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Quick Actions */}

        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button
              className="
                w-full
                flex
                items-center
                justify-between
                bg-blue-500/10
                border
                border-blue-500/20
                rounded-2xl
                p-4
                hover:bg-blue-500/20
                transition
              "
            >
              <span className="text-white">
                Active Jobs
              </span>

              <ArrowRight
                className="text-blue-400"
                size={18}
              />
            </button>

            <button
              className="
                w-full
                flex
                items-center
                justify-between
                bg-orange-500/10
                border
                border-orange-500/20
                rounded-2xl
                p-4
                hover:bg-orange-500/20
                transition
              "
            >
              <span className="text-white">
                Quotations
              </span>

              <ArrowRight
                className="text-orange-400"
                size={18}
              />
            </button>

          </div>

        </div>

        {/* Recent Jobs */}

        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Jobs
          </h2>

          <div className="space-y-4">

            {recentJobs.map(
              (job, index) => (
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
                  <div>

                    <h3 className="text-white font-semibold">
                      {job.service}
                    </h3>

                    <p className="text-slate-400 text-sm">
                      {job.customer}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      job.status === "Completed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {job.status}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default MechanicDashboard;