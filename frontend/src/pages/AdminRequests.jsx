import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  ClipboardList,
  Car,
  User,
  IndianRupee,
  MapPin,
  Clock3,
  CheckCircle,
  Wrench,
  AlertTriangle,
} from "lucide-react";

import {
  getRequests,
} from "../api/adminApi";

function AdminRequests() {
  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests =
    async () => {
      try {
        const response =
          await getRequests();

        setRequests(
          response.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const getStatusStyle =
    (status) => {
      switch (status) {
        case "COMPLETED":
          return {
            bg: "bg-green-500/10",
            text: "text-green-400",
            border:
              "border-green-500/20",
          };

        case "IN_PROGRESS":
          return {
            bg: "bg-blue-500/10",
            text: "text-blue-400",
            border:
              "border-blue-500/20",
          };

        case "ACCEPTED":
          return {
            bg: "bg-purple-500/10",
            text: "text-purple-400",
            border:
              "border-purple-500/20",
          };

        default:
          return {
            bg: "bg-yellow-500/10",
            text: "text-yellow-400",
            border:
              "border-yellow-500/20",
          };
      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-48
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                "
              />
            )
          )}

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-black text-white">
          Service Requests
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor all roadside
          assistance requests
          across the platform.
        </p>

      </div>

      {/* Empty State */}

      {requests.length === 0 ? (
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
          <ClipboardList
            size={60}
            className="
              text-orange-500
              mx-auto
              mb-4
            "
          />

          <h3 className="text-2xl font-bold text-white">
            No Requests Found
          </h3>

          <p className="text-slate-400 mt-2">
            Service requests will
            appear here.
          </p>

        </div>
      ) : (
        <div className="grid gap-6">

          {requests.map(
            (
              request,
              index
            ) => {
              const status =
                getStatusStyle(
                  request.status
                );

              return (
                <motion.div
                  key={
                    request._id
                  }
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index *
                      0.05,
                  }}
                  whileHover={{
                    y: -4,
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
                  {/* Top */}

                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-4
                    "
                  >
                    <div>

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-xl
                            bg-orange-500/10
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Wrench
                            className="text-orange-500"
                            size={
                              22
                            }
                          />
                        </div>

                        <div>
                          <h2
                            className="
                              text-xl
                              font-bold
                              text-white
                            "
                          >
                            {
                              request.serviceType
                            }
                          </h2>

                          <p className="text-slate-400 text-sm">
                            Request ID:
                            {" "}
                            {request._id.slice(
                              -6
                            )}
                          </p>
                        </div>

                      </div>

                    </div>

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        border
                        w-fit
                        ${status.bg}
                        ${status.text}
                        ${status.border}
                      `}
                    >
                      {
                        request.status
                      }
                    </span>

                  </div>

                  {/* Address */}

                  <div
                    className="
                      mt-5
                      flex
                      items-start
                      gap-3
                      text-slate-300
                    "
                  >
                    <MapPin
                      size={18}
                      className="mt-1 text-orange-500"
                    />

                    <span>
                      {
                        request.address
                      }
                    </span>

                  </div>

                  {/* Details */}

                  <div
                    className="
                      grid
                      md:grid-cols-4
                      gap-4
                      mt-6
                    "
                  >
                    <div
                      className="
                        bg-slate-900/50
                        rounded-2xl
                        p-4
                      "
                    >
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">

                        <User
                          size={
                            16
                          }
                        />

                        Customer

                      </div>

                      <p className="text-white font-medium">
                        {request.user
                          ?.name ||
                          "N/A"}
                      </p>
                    </div>

                    <div
                      className="
                        bg-slate-900/50
                        rounded-2xl
                        p-4
                      "
                    >
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">

                        <Car
                          size={
                            16
                          }
                        />

                        Vehicle

                      </div>

                      <p className="text-white font-medium">
                        {request
                          .vehicle
                          ?.vehicleNumber ||
                          "N/A"}
                      </p>
                    </div>

                    <div
                      className="
                        bg-slate-900/50
                        rounded-2xl
                        p-4
                      "
                    >
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">

                        <IndianRupee
                          size={
                            16
                          }
                        />

                        Price

                      </div>

                      <p className="text-green-400 font-bold">
                        ₹
                        {request.quotedPrice ||
                          0}
                      </p>
                    </div>

                    <div
                      className="
                        bg-slate-900/50
                        rounded-2xl
                        p-4
                      "
                    >
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">

                        <Clock3
                          size={
                            16
                          }
                        />

                        Status

                      </div>

                      <p className="text-white font-medium">
                        {
                          request.status
                        }
                      </p>
                    </div>

                  </div>

                  {/* Footer */}

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      mt-6
                      pt-5
                      border-t
                      border-white/5
                    "
                  >
                    <div className="text-slate-400 text-sm">
                      Created:
                      {" "}
                      {new Date(
                        request.createdAt
                      ).toLocaleString()}
                    </div>

                    {request.status ===
                    "COMPLETED" ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle
                          size={18}
                        />
                        Completed
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle
                          size={18}
                        />
                        Active
                      </div>
                    )}

                  </div>

                </motion.div>
              );
            }
          )}

        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminRequests;