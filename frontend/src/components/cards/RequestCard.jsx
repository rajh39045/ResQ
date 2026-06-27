import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  MapPin,
  Car,
  Clock,
  IndianRupee,
  Eye,
  Wrench,
  CheckCircle,
  AlertCircle,
  Loader,
  XCircle,
} from "lucide-react";

function RequestCard({ request }) {
  const getStatusConfig = (
    status
  ) => {
    switch (status) {
      case "PENDING":
        return {
          color:
            "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
          icon: AlertCircle,
        };

      case "ACCEPTED":
        return {
          color:
            "bg-blue-500/20 text-blue-400 border-blue-500/20",
          icon: CheckCircle,
        };

      case "IN_PROGRESS":
        return {
          color:
            "bg-purple-500/20 text-purple-400 border-purple-500/20",
          icon: Loader,
        };

      case "COMPLETED":
        return {
          color:
            "bg-green-500/20 text-green-400 border-green-500/20",
          icon: CheckCircle,
        };

      case "CANCELLED":
        return {
          color:
            "bg-red-500/20 text-red-400 border-red-500/20",
          icon: XCircle,
        };

      default:
        return {
          color:
            "bg-gray-500/20 text-gray-400 border-gray-500/20",
          icon: AlertCircle,
        };
    }
  };

  const status =
    getStatusConfig(
      request.status
    );

  const StatusIcon =
    status.icon;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.01,
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
      <div className="relative z-10 flex justify-between items-start mb-6">

        <div className="flex items-center gap-4">

          <div className="
            w-14
            h-14
            rounded-2xl
            bg-orange-500/10
            flex
            items-center
            justify-center
          ">
            <Wrench
              size={28}
              className="text-orange-500"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">
              {
                request.serviceType
              }
            </h3>

            <p className="text-slate-400 text-sm">
              Request #
              {request._id?.slice(
                -6
              )}
            </p>
          </div>

        </div>

        {/* Status Badge */}
        <div
          className={`
            flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            border
            text-sm
            font-medium
            ${status.color}
          `}
        >
          <StatusIcon
            size={14}
          />

          {request.status}
        </div>

      </div>

      {/* Details */}
      <div className="relative z-10 space-y-4">

        <div className="
          flex
          items-center
          gap-3
          text-slate-300
        ">
          <Car
            size={18}
            className="text-orange-400"
          />

          <span>
            {request.vehicle
              ?.vehicleNumber ||
              "Vehicle Not Available"}
          </span>
        </div>

        <div className="
          flex
          items-start
          gap-3
          text-slate-300
        ">
          <MapPin
            size={18}
            className="
              text-orange-400
              mt-1
            "
          />

          <span className="line-clamp-2">
            {
              request.address
            }
          </span>
        </div>

        <div className="
          flex
          items-center
          justify-between
          bg-slate-900/50
          border
          border-white/10
          rounded-2xl
          p-4
        ">

          <div className="
            flex
            items-center
            gap-2
          ">
            <IndianRupee
              size={18}
              className="
                text-green-400
              "
            />

            <span className="text-slate-400">
              Price
            </span>
          </div>

          <span className="
            text-white
            font-bold
            text-lg
          ">
            ₹
            {request.quotedPrice ||
              0}
          </span>

        </div>

        <div className="
          flex
          items-center
          gap-3
          text-slate-400
          text-sm
        ">
          <Clock
            size={16}
            className="
              text-orange-400
            "
          />

          {new Date(
            request.createdAt
          ).toLocaleString()}
        </div>

      </div>

      {/* Button */}
      <Link
        to={`/requests/${request._id}`}
        className="
          relative
          z-10
          mt-6
          flex
          items-center
          justify-center
          gap-2
          w-full
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          hover:from-orange-600
          hover:to-orange-700
          py-3.5
          rounded-2xl
          text-white
          font-semibold
          shadow-lg
          shadow-orange-500/20
          transition-all
        "
      >
        <Eye size={18} />

        View Quotations
      </Link>

    </motion.div>
  );
}

export default RequestCard;