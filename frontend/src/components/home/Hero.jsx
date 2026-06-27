import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock3,
  MapPinned,
  ArrowRight,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-28 md:pt-36">

        {/* Badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-orange-400 shadow-lg mb-10"
        >
          <ShieldCheck size={18} />
          Trusted Roadside Assistance Platform
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          style={{
            textShadow:
              "0 10px 40px rgba(0,0,0,0.5)",
          }}
          className="
            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-[7rem]
            xl:text-[8rem]
            font-black
            text-white
            leading-[0.95]
            tracking-tight
          "
        >
          Fast Help
          <br />

          <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Anywhere.
          </span>

          <br />

          Anytime.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
            mt-10
            text-base
            sm:text-lg
            md:text-xl
            text-slate-300
            max-w-3xl
            mx-auto
            leading-relaxed
          "
        >
          Connect instantly with verified mechanics,
          towing services, battery support and
          emergency roadside assistance in real time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="
            mt-14
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
            sm:gap-6
          "
        >
          <Link
            to="/register"
            className="
              group
              flex
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
              duration-300
            "
          >
            Request Assistance

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </Link>

          <Link
            to="/register"
            className="
              px-8
              py-4
              rounded-2xl
              border
              border-white/20
              bg-white/5
              backdrop-blur-xl
              text-white
              hover:bg-white/10
              transition-all
              duration-300
            "
          >
            Become a Mechanic
          </Link>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-5
            mt-24
            max-w-5xl
            mx-auto
          "
        >
          {[
            {
              icon: Clock3,
              value: "24/7",
              label: "Emergency Support",
            },
            {
              icon: MapPinned,
              value: "500+",
              label: "Verified Mechanics",
            },
            {
              icon: ShieldCheck,
              value: "100%",
              label: "Secure & Trusted",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  transition-all
                  duration-300
                "
              >
                <Icon
                  className="text-orange-500 mx-auto mb-3"
                  size={32}
                />

                <h3 className="text-4xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="text-gray-400 mt-2">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;