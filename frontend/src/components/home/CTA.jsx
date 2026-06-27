import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  Wrench,
} from "lucide-react";

function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-slate-950">

      {/* Background Effects */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[140px]" />

        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px]" />

      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            bg-white/5
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[40px]
            p-8
            md:p-14
            text-center
            shadow-2xl
          "
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-8">

            <ShieldCheck size={18} />

            Trusted Across India

          </div>

          {/* Heading */}
          <h2 className="
            text-4xl
            md:text-6xl
            font-black
            text-white
            leading-tight
          ">
            Need Roadside Help
            <span className="block text-orange-500">
              Right Now?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="
            mt-6
            text-lg
            md:text-xl
            text-slate-300
            max-w-3xl
            mx-auto
            leading-relaxed
          ">
            Connect instantly with nearby verified
            mechanics, towing services, battery support
            and emergency vehicle assistance within minutes.
          </p>

          {/* Features */}
          <div className="
            flex
            flex-col
            md:flex-row
            justify-center
            gap-6
            mt-10
            text-slate-300
          ">

            <div className="flex items-center justify-center gap-2">
              <Clock3
                size={18}
                className="text-orange-500"
              />
              24/7 Support
            </div>

            <div className="flex items-center justify-center gap-2">
              <Wrench
                size={18}
                className="text-orange-500"
              />
              Verified Mechanics
            </div>

            <div className="flex items-center justify-center gap-2">
              <ShieldCheck
                size={18}
                className="text-orange-500"
              />
              Secure Assistance
            </div>

          </div>

          {/* Buttons */}
          <div className="
            mt-12
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-5
          ">

            <Link
              to="/register"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                bg-gradient-to-r
                from-orange-500
                to-orange-600
                px-8
                py-4
                rounded-2xl
                text-white
                font-semibold
                shadow-xl
                shadow-orange-500/30
                hover:scale-105
                transition-all
              "
            >
              Get Help Now

              <ArrowRight
                size={18}
                className="
                  group-hover:translate-x-1
                  transition
                "
              />
            </Link>

            <Link
              to="/register"
              className="
                px-8
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                text-white
                hover:bg-white/10
                transition-all
              "
            >
              Become a Mechanic
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default CTA;