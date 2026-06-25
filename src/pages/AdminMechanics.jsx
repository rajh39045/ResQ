import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  CheckCircle,
  Wrench,
  Star,
  ShieldCheck,
} from "lucide-react";

import {
  getMechanics,
  verifyMechanic,
} from "../api/adminApi";

function AdminMechanics() {
  const [mechanics, setMechanics] =
    useState([]);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics =
    async () => {
      try {
        const response =
          await getMechanics();

        setMechanics(
          response.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleVerify =
    async (id) => {
      try {
        await verifyMechanic(id);

        fetchMechanics();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-black text-white">
          Mechanics
        </h1>

        <p className="text-slate-400 mt-2">
          Manage mechanic verification and approvals.
        </p>

      </div>

      {/* Desktop Table */}
      <div
        className="
          hidden
          lg:block
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">

              <th className="p-5 text-left text-slate-400 font-medium">
                Mechanic
              </th>

              <th className="p-5 text-left text-slate-400 font-medium">
                Experience
              </th>

              <th className="p-5 text-left text-slate-400 font-medium">
                Rating
              </th>

              <th className="p-5 text-left text-slate-400 font-medium">
                Status
              </th>

              <th className="p-5 text-left text-slate-400 font-medium">
                Action
              </th>

            </tr>
          </thead>

          <tbody>
            {mechanics.map(
              (mechanic) => (
                <tr
                  key={mechanic._id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/[0.03]
                    transition
                  "
                >
                  <td className="p-5">

                    <div className="flex items-center gap-4">

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
                          size={22}
                        />
                      </div>

                      <div>
                        <h3 className="text-white font-semibold">
                          {mechanic.shopName}
                        </h3>

                        <p className="text-slate-400 text-sm">
                          {mechanic.user?.name}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="p-5 text-white">
                    {mechanic.experience} Years
                  </td>

                  <td className="p-5">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Star
                        size={16}
                        fill="currentColor"
                      />

                      {mechanic.rating || 0}
                    </div>
                  </td>

                  <td className="p-5">
                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-medium
                        ${
                          mechanic.verified
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }
                      `}
                    >
                      {mechanic.verified
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </td>

                  <td className="p-5">
                    {!mechanic.verified ? (
                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          handleVerify(
                            mechanic._id
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-gradient-to-r
                          from-orange-500
                          to-orange-600
                          text-white
                          font-medium
                        "
                      >
                        <CheckCircle
                          size={18}
                        />

                        Verify
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-400">
                        <ShieldCheck
                          size={18}
                        />

                        Approved
                      </div>
                    )}
                  </td>

                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">

        {mechanics.map(
          (mechanic) => (
            <motion.div
              key={mechanic._id}
              whileHover={{
                y: -3,
              }}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-5
              "
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="text-white font-bold">
                    {mechanic.shopName}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {mechanic.user?.name}
                  </p>

                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    ${
                      mechanic.verified
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }
                  `}
                >
                  {mechanic.verified
                    ? "Verified"
                    : "Pending"}
                </span>

              </div>

              <div className="mt-4 space-y-2">

                <p className="text-slate-300">
                  Experience:
                  {" "}
                  {mechanic.experience}
                  Years
                </p>

                <div className="flex items-center gap-2 text-yellow-400">
                  <Star
                    size={16}
                    fill="currentColor"
                  />
                  {mechanic.rating || 0}
                </div>

              </div>

              {!mechanic.verified && (
                <button
                  onClick={() =>
                    handleVerify(
                      mechanic._id
                    )
                  }
                  className="
                    w-full
                    mt-5
                    py-3
                    rounded-2xl
                    bg-orange-500
                    text-white
                    font-medium
                  "
                >
                  Verify Mechanic
                </button>
              )}

            </motion.div>
          )
        )}

      </div>

      {/* Empty State */}
      {mechanics.length === 0 && (
        <div
          className="
            mt-8
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
            text-center
          "
        >
          <Wrench
            size={50}
            className="mx-auto text-orange-500 mb-4"
          />

          <h3 className="text-white text-xl font-semibold">
            No Mechanics Found
          </h3>

          <p className="text-slate-400 mt-2">
            Mechanics will appear here once registered.
          </p>

        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminMechanics;