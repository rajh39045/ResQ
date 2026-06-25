import DashboardLayout from "../layouts/DashboardLayout";
import TrackingMap from "../components/map/TrackingMap";

import {
  MapPin,
  Navigation,
  ShieldCheck,
  Clock3,
  Wrench,
} from "lucide-react";

import { motion } from "framer-motion";

function Tracking() {
  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">

        <motion.h1
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-4xl font-black text-white"
        >
          Live Tracking
        </motion.h1>

        <p className="text-slate-400 mt-2 text-lg">
          Track your mechanic in real-time and monitor arrival progress.
        </p>

      </div>

      {/* Top Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">

        {/* Vehicle */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >
          <div className="flex items-center gap-4">

            <div className="
              w-12 h-12
              rounded-2xl
              bg-orange-500/10
              flex items-center
              justify-center
            ">
              <MapPin className="text-orange-500" />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Vehicle
              </p>

              <h3 className="text-white font-semibold">
                Live Location
              </h3>
            </div>

          </div>
        </motion.div>

        {/* Mechanic */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >
          <div className="flex items-center gap-4">

            <div className="
              w-12 h-12
              rounded-2xl
              bg-blue-500/10
              flex items-center
              justify-center
            ">
              <Navigation className="text-blue-400" />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Mechanic
              </p>

              <h3 className="text-white font-semibold">
                Real-Time Tracking
              </h3>
            </div>

          </div>
        </motion.div>

        {/* ETA */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >
          <div className="flex items-center gap-4">

            <div className="
              w-12 h-12
              rounded-2xl
              bg-yellow-500/10
              flex items-center
              justify-center
            ">
              <Clock3 className="text-yellow-400" />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                ETA
              </p>

              <h3 className="text-white font-semibold">
                12 Minutes
              </h3>
            </div>

          </div>
        </motion.div>

        {/* Status */}

        <motion.div
          whileHover={{ y: -5 }}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >
          <div className="flex items-center gap-4">

            <div className="relative">

              <div className="
                w-12 h-12
                rounded-2xl
                bg-green-500/10
                flex items-center
                justify-center
              ">
                <ShieldCheck className="text-green-400" />
              </div>

              <span className="
                absolute
                top-0
                right-0
                w-3
                h-3
                bg-green-400
                rounded-full
                animate-ping
              " />
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Status
              </p>

              <h3 className="text-green-400 font-semibold">
                Connected
              </h3>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Mechanic Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          bg-gradient-to-r
          from-orange-500/10
          to-orange-600/5
          backdrop-blur-xl
          border
          border-orange-500/20
          rounded-3xl
          p-6
          mb-8
        "
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-orange-500
              flex
              items-center
              justify-center
            ">
              <Wrench
                size={28}
                className="text-white"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Rahul Auto Service
              </h2>

              <p className="text-slate-400">
                Verified Professional Mechanic
              </p>

            </div>

          </div>

          <div className="
            px-4
            py-2
            rounded-full
            bg-green-500/10
            text-green-400
            font-medium
          ">
            On The Way
          </div>

        </div>

      </motion.div>

      {/* Map Section */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          h-[75vh]
          rounded-[32px]
          overflow-hidden
          border
          border-white/10
          bg-slate-900
          shadow-2xl
        "
      >
        <TrackingMap />
      </motion.div>

    </DashboardLayout>
  );
}

export default Tracking;