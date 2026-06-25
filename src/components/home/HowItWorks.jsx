import { motion } from "framer-motion";
import {
  PhoneCall,
  Bell,
  FileText,
  MapPinned,
  CheckCircle,
} from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      title: "Request Assistance",
      description:
        "Create a roadside assistance request in seconds.",
      icon: PhoneCall,
    },
    {
      title: "Mechanics Notified",
      description:
        "Nearby verified mechanics receive your request instantly.",
      icon: Bell,
    },
    {
      title: "Receive Quotations",
      description:
        "Compare quotations and choose the best mechanic.",
      icon: FileText,
    },
    {
      title: "Track Mechanic",
      description:
        "Track your mechanic live in real-time.",
      icon: MapPinned,
    },
    {
      title: "Service Completed",
      description:
        "Get back on the road safely and quickly.",
      icon: CheckCircle,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-28 bg-slate-950 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-orange-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">

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
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
            Simple Process
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-white">
            How It Works
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            Get professional roadside assistance
            in just a few simple steps.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop Line */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500/30 via-orange-500 to-orange-500/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

            {steps.map(
              (step, index) => {
                const Icon =
                  step.icon;

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
                        index * 0.15,
                    }}
                    whileHover={{
                      y: -10,
                    }}
                    className="relative"
                  >

                    {/* Icon */}
                    <div className="relative z-10 w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/30">

                      <Icon
                        size={32}
                        className="text-white"
                      />

                    </div>

                    {/* Card */}
                    <div className="
                      mt-6
                      bg-white/5
                      backdrop-blur-xl
                      border
                      border-white/10
                      rounded-3xl
                      p-6
                      text-center
                      h-full
                    ">
                      <div className="text-orange-400 font-bold text-sm mb-3">
                        STEP {index + 1}
                      </div>

                      <h3 className="text-white font-bold text-lg">
                        {step.title}
                      </h3>

                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;