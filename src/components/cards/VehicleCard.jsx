import { motion } from "framer-motion";

import {
  Car,
  Trash2,
  Pencil,
  ShieldCheck,
  Hash,
} from "lucide-react";

function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        group
        relative
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
        overflow-hidden
      "
    >
      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
          bg-gradient-to-br
          from-orange-500/10
          via-transparent
          to-orange-500/5
        "
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-orange-500/10
              flex
              items-center
              justify-center
            "
          >
            <Car
              size={30}
              className="text-orange-500"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              {vehicle.brand}
            </h3>

            <p className="text-slate-400">
              {vehicle.model}
            </p>
          </div>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            px-3
            py-1
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
            text-green-400
            text-xs
            font-medium
          "
        >
          <ShieldCheck size={14} />
          Registered
        </div>

      </div>

      {/* Vehicle Details */}
      <div className="relative z-10 mt-6 space-y-4">

        {/* Registration */}
        <div
          className="
            flex
            items-center
            justify-between
            bg-slate-900/50
            border
            border-white/10
            rounded-2xl
            p-4
          "
        >
          <div className="flex items-center gap-2 text-slate-400">
            <Hash size={16} />
            Registration
          </div>

          <span
            className="
              px-3
              py-1
              rounded-lg
              bg-orange-500/10
              text-orange-400
              font-medium
              text-sm
            "
          >
            {vehicle.registrationNumber}
          </span>
        </div>

        {/* Vehicle Type */}
        <div
          className="
            flex
            items-center
            justify-between
            bg-slate-900/50
            border
            border-white/10
            rounded-2xl
            p-4
          "
        >
          <span className="text-slate-400">
            Vehicle Type
          </span>

          <span
            className="
              px-3
              py-1
              rounded-lg
              bg-blue-500/10
              text-blue-400
              text-sm
              font-medium
            "
          >
            {vehicle.vehicleType}
          </span>
        </div>

      </div>

      {/* Actions */}
      <div className="relative z-10 flex gap-3 mt-6">

        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            onEdit?.(vehicle)
          }
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-2xl
            bg-blue-500/10
            border
            border-blue-500/20
            text-blue-400
            font-medium
            hover:bg-blue-500/20
            transition-all
          "
        >
          <Pencil size={16} />
          Edit
        </motion.button>

        <motion.button
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            onDelete?.(vehicle._id)
          }
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-2xl
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            font-medium
            hover:bg-red-500/20
            transition-all
          "
        >
          <Trash2 size={16} />
          Delete
        </motion.button>

      </div>

    </motion.div>
  );
}

export default VehicleCard;