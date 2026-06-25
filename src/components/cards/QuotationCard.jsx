import {
  IndianRupee,
  Clock,
  Star,
  CheckCircle,
  ShieldCheck,
  Wrench,
  Award,
  Loader2,
} from "lucide-react";

import { motion } from "framer-motion";

function QuotationCard({
  quotation,
  onAccept,
  loading = false,
}) {
  const rating =
    quotation?.mechanic?.rating ||
    4.8;

  const experience =
    quotation?.mechanic
      ?.experience || 5;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >
      {/* Glow Effect */}

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

      {/* Best Choice Badge */}

      <div
        className="
          absolute
          top-4
          right-4
          px-3
          py-1
          rounded-full
          bg-orange-500/10
          border
          border-orange-500/20
          text-orange-400
          text-xs
          font-semibold
        "
      >
        Recommended
      </div>

      {/* Header */}

      <div className="relative z-10 flex justify-between items-start mb-6">

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
              size={26}
              className="text-orange-500"
            />
          </div>

          <div>

            <h3 className="text-xl font-bold text-white">
              {quotation?.mechanic
                ?.shopName ||
                "Mechanic Shop"}
            </h3>

            <p className="text-slate-400 text-sm">
              {
                quotation?.mechanic
                  ?.user?.name
              }
            </p>

          </div>

        </div>

      </div>

      {/* Rating & Experience */}

      <div className="relative z-10 flex gap-3 mb-5">

        <div
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            bg-yellow-500/10
            border
            border-yellow-500/20
          "
        >
          <Star
            size={15}
            className="
              text-yellow-400
              fill-yellow-400
            "
          />

          <span className="text-yellow-400 text-sm font-medium">
            {rating}
          </span>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-xl
            bg-blue-500/10
            border
            border-blue-500/20
          "
        >
          <Award
            size={15}
            className="text-blue-400"
          />

          <span className="text-blue-400 text-sm font-medium">
            {experience} Years
          </span>

        </div>

      </div>

      {/* Price */}

      <div
        className="
          relative
          z-10
          bg-slate-900/50
          border
          border-white/10
          rounded-2xl
          p-5
          mb-4
        "
      >
        <p className="text-slate-400 text-sm">
          Estimated Cost
        </p>

        <div
          className="
            flex
            items-center
            mt-2
            text-4xl
            font-black
            text-white
          "
        >
          <IndianRupee size={30} />

          {quotation?.amount}
        </div>

      </div>

      {/* ETA */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          bg-slate-900/40
          border
          border-white/10
          rounded-2xl
          p-4
          mb-4
        "
      >
        <div className="flex items-center gap-2">

          <Clock
            size={18}
            className="text-orange-400"
          />

          <span className="text-slate-300">
            Arrival Time
          </span>

        </div>

        <span
          className="
            px-3
            py-1
            rounded-full
            bg-green-500/10
            text-green-400
            text-sm
            font-medium
          "
        >
          {
            quotation?.estimatedArrivalTime
          } mins
        </span>

      </div>

      {/* Trust Badge */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-2
          text-slate-400
          text-sm
          mb-6
        "
      >
        <ShieldCheck
          size={16}
          className="text-green-400"
        />

        Verified Professional Mechanic
      </div>

      {/* Accept Button */}

      <motion.button
        whileTap={{
          scale: 0.97,
        }}
        disabled={loading}
        onClick={() =>
          onAccept(
            quotation._id
          )
        }
        className="
          relative
          z-10
          w-full
          py-3.5
          rounded-2xl
          text-white
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          hover:from-orange-600
          hover:to-orange-700
          shadow-lg
          shadow-orange-500/30
          transition-all
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Accepting...
          </>
        ) : (
          <>
            <CheckCircle size={18} />
            Accept Quotation
          </>
        )}
      </motion.button>

    </motion.div>
  );
}

export default QuotationCard;