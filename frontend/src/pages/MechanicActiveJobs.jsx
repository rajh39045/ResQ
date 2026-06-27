import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Car,
  MapPin,
  User,
  Phone,
  PlayCircle,
  CheckCircle,
  Clock,
  Navigation,
  Wrench,
  ShieldCheck,
} from "lucide-react";

import {
  getActiveJobs,
  startJob,
  completeJob,
} from "../api/mechanicApi";

function MechanicActiveJobs() {
  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs =
    async () => {
      try {
        const response =
          await getActiveJobs();

        setJobs(
          response.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleStartJob =
    async (id) => {
      try {
        await startJob(id);

        fetchJobs();

        alert(
          "Job started successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to start job"
        );
      }
    };

  const handleCompleteJob =
    async (id) => {
      try {
        await completeJob(id);

        fetchJobs();

        alert(
          "Job completed successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to complete job"
        );
      }
    };

  const getStatusStyle =
    (status) => {
      switch (status) {
        case "ACCEPTED":
          return {
            bg: "bg-blue-500/10",
            text:
              "text-blue-400",
            border:
              "border-blue-500/20",
          };

        case "IN_PROGRESS":
          return {
            bg: "bg-purple-500/10",
            text:
              "text-purple-400",
            border:
              "border-purple-500/20",
          };

        case "COMPLETED":
          return {
            bg: "bg-green-500/10",
            text:
              "text-green-400",
            border:
              "border-green-500/20",
          };

        default:
          return {
            bg: "bg-gray-500/10",
            text:
              "text-gray-400",
            border:
              "border-gray-500/20",
          };
      }
    };

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-black text-white">
          Active Jobs
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your assigned
          roadside assistance
          requests.
        </p>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-56
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                "
              />
            )
          )}
        </div>
      ) : jobs.length === 0 ? (

        /* Empty State */

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
          <Wrench
            size={60}
            className="
              mx-auto
              text-orange-500
              mb-5
            "
          />

          <h2 className="text-3xl font-bold text-white">
            No Active Jobs
          </h2>

          <p className="text-slate-400 mt-3">
            Accepted service
            requests will appear
            here.
          </p>
        </div>
      ) : (

        /* Jobs List */

        <div className="grid gap-6">

          {jobs.map(
            (job, index) => {
              const status =
                getStatusStyle(
                  job.status
                );

              return (
                <motion.div
                  key={job._id}
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

                  {/* Header */}

                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-orange-500/10
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Wrench
                          className="text-orange-500"
                          size={24}
                        />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {
                            job.serviceType
                          }
                        </h2>

                        <p className="text-slate-400 text-sm">
                          Request ID:
                          {" "}
                          {job._id.slice(
                            -6
                          )}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        border
                        text-sm
                        font-medium
                        w-fit
                        ${status.bg}
                        ${status.text}
                        ${status.border}
                      `}
                    >
                      {job.status}
                    </span>

                  </div>

                  {/* Customer + Vehicle */}

                  <div className="grid md:grid-cols-2 gap-4 mt-6">

                    <div className="bg-slate-900/50 rounded-2xl p-4">

                      <h3 className="text-white font-semibold mb-3">
                        Customer Details
                      </h3>

                      <div className="space-y-3">

                        <div className="flex items-center gap-3 text-slate-300">
                          <User
                            size={18}
                          />
                          {
                            job.user
                              ?.name
                          }
                        </div>

                        <div className="flex items-center gap-3 text-slate-300">
                          <Phone
                            size={18}
                          />
                          {
                            job.user
                              ?.phone
                          }
                        </div>

                      </div>

                    </div>

                    <div className="bg-slate-900/50 rounded-2xl p-4">

                      <h3 className="text-white font-semibold mb-3">
                        Vehicle Details
                      </h3>

                      <div className="space-y-3">

                        <div className="flex items-center gap-3 text-slate-300">
                          <Car
                            size={18}
                          />
                          {
                            job
                              .vehicle
                              ?.vehicleNumber
                          }
                        </div>

                        <div className="flex items-center gap-3 text-slate-300">
                          <ShieldCheck
                            size={18}
                          />

                          {
                            job
                              .vehicle
                              ?.brand
                          }
                          {" "}
                          {
                            job
                              .vehicle
                              ?.model
                          }
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Address */}

                  <div className="mt-5 bg-slate-900/50 rounded-2xl p-4">

                    <div className="flex items-start gap-3 text-slate-300">

                      <MapPin
                        className="text-orange-500 mt-1"
                        size={18}
                      />

                      <span>
                        {
                          job.address
                        }
                      </span>

                    </div>

                  </div>

                  {/* Time */}

                  <div className="mt-5 flex items-center gap-3 text-slate-400">

                    <Clock
                      size={18}
                    />

                    {new Date(
                      job.createdAt
                    ).toLocaleString()}

                  </div>

                  {/* Actions */}

                  <div className="flex flex-wrap gap-4 mt-6">

                    {job.status ===
                      "ACCEPTED" && (
                      <button
                        onClick={() =>
                          handleStartJob(
                            job._id
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          px-6
                          py-3
                          rounded-2xl
                          bg-blue-500
                          hover:bg-blue-600
                          text-white
                          font-medium
                          transition
                        "
                      >
                        <PlayCircle
                          size={18}
                        />
                        Start Job
                      </button>
                    )}

                    {job.status ===
                      "IN_PROGRESS" && (
                      <button
                        onClick={() =>
                          handleCompleteJob(
                            job._id
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          px-6
                          py-3
                          rounded-2xl
                          bg-green-500
                          hover:bg-green-600
                          text-white
                          font-medium
                          transition
                        "
                      >
                        <CheckCircle
                          size={18}
                        />
                        Complete Job
                      </button>
                    )}

                    <button
                      className="
                        flex
                        items-center
                        gap-2
                        px-6
                        py-3
                        rounded-2xl
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        font-medium
                        transition
                      "
                    >
                      <Navigation
                        size={18}
                      />
                      Navigate
                    </button>

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

export default MechanicActiveJobs;