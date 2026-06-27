import { motion } from "framer-motion";
import {
  Car,
  Fuel,
  Battery,
  Truck,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Breakdown Repair",
    description:
      "Quick roadside repairs by verified mechanics.",
  },
  {
    icon: Truck,
    title: "Towing Service",
    description:
      "Reliable towing assistance whenever needed.",
  },
  {
    icon: Battery,
    title: "Battery Jump Start",
    description:
      "Instant jump-start service for dead batteries.",
  },
  {
    icon: Car,
    title: "Flat Tire Repair",
    description:
      "Fast tire replacement and puncture repair.",
  },
  {
    icon: Fuel,
    title: "Fuel Delivery",
    description:
      "Emergency fuel delivery directly to your location.",
  },
];

function Services() {
  return (
    <section
      id="services"
      className="relative py-28 bg-slate-950 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[140px]" />

      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-20"
        >
          <span className="
            inline-flex
            items-center
            px-4
            py-2
            rounded-full
            bg-orange-500/10
            border
            border-orange-500/20
            text-orange-400
            text-sm
            mb-6
          ">
            Emergency Vehicle Support
          </span>

          <h2 className="
            text-4xl
            md:text-6xl
            font-black
            text-white
          ">
            Our Services
          </h2>

          <p className="
            mt-6
            max-w-2xl
            mx-auto
            text-slate-400
            text-lg
          ">
            Professional roadside assistance
            designed to get you back on the road
            safely and quickly.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
          gap-6
        ">

          {services.map(
            (service, index) => {
              const Icon =
                service.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
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
                  <div className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-orange-500/0
                    to-orange-500/0
                    group-hover:from-orange-500/10
                    group-hover:to-orange-500/5
                    transition-all
                    duration-500
                  " />

                  {/* Icon */}
                  <div className="
                    relative
                    z-10
                    w-16
                    h-16
                    rounded-2xl
                    bg-orange-500/10
                    flex
                    items-center
                    justify-center
                    mb-5
                  ">
                    <Icon
                      size={30}
                      className="text-orange-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">

                    <h3 className="
                      text-xl
                      font-bold
                      text-white
                      mb-3
                    ">
                      {service.title}
                    </h3>

                    <p className="
                      text-slate-400
                      text-sm
                      leading-relaxed
                    ">
                      {service.description}
                    </p>

                    <div className="
                      mt-6
                      flex
                      items-center
                      gap-2
                      text-orange-400
                      text-sm
                      font-medium
                    ">
                      Learn More

                      <ArrowUpRight
                        size={16}
                        className="
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                          transition
                        "
                      />
                    </div>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

      </div>
    </section>
  );
}

export default Services;