import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  Wrench,
  Users,
  ShieldCheck,
  Clock3,
} from "lucide-react";

function StatCard({
  value,
  suffix = "",
  title,
  icon: Icon,
  delay,
}) {
  const countRef = useRef(null);

  useEffect(() => {
    const obj = { value: 0 };

    const animation = gsap.to(obj, {
      value,
      duration: 2.5,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent =
            `${Math.floor(obj.value)}${suffix}`;
        }
      },
    });

    return () => animation.kill();
  }, [value, suffix, delay]);

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-8
        text-center
      "
    >
      <div className="
        w-16
        h-16
        mx-auto
        mb-5
        rounded-2xl
        bg-orange-500/10
        flex
        items-center
        justify-center
      ">
        <Icon
          size={30}
          className="text-orange-500"
        />
      </div>

      <h3
        ref={countRef}
        className="
          text-4xl
          md:text-5xl
          font-black
          text-white
        "
      >
        0
      </h3>

      <p className="
        mt-3
        text-slate-400
      ">
        {title}
      </p>
    </motion.div>
  );
}

function Statistics() {
  return (
    <section className="
      relative
      py-28
      bg-slate-950
      overflow-hidden
    ">
      {/* Background Glow */}
      <div className="
        absolute
        top-0
        left-1/4
        w-96
        h-96
        bg-orange-500/10
        blur-[150px]
      " />

      <div className="
        absolute
        bottom-0
        right-1/4
        w-96
        h-96
        bg-blue-500/10
        blur-[150px]
      " />

      <div className="
        relative
        max-w-7xl
        mx-auto
        px-6
      ">

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
          className="text-center mb-20"
        >
          <span className="
            inline-flex
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
            Trusted By Thousands
          </span>

          <h2 className="
            text-4xl
            md:text-6xl
            font-black
            text-white
          ">
            Our Impact
          </h2>

          <p className="
            mt-6
            max-w-2xl
            mx-auto
            text-slate-400
            text-lg
          ">
            Delivering reliable roadside
            assistance across the country.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">
          <StatCard
            value={10000}
            suffix="+"
            title="Services Completed"
            icon={Wrench}
            delay={0}
          />

          <StatCard
            value={500}
            suffix="+"
            title="Verified Mechanics"
            icon={Users}
            delay={0.2}
          />

          <StatCard
            value={99}
            suffix="%"
            title="Success Rate"
            icon={ShieldCheck}
            delay={0.4}
          />

          <StatCard
            value={24}
            suffix="/7"
            title="Emergency Support"
            icon={Clock3}
            delay={0.6}
          />
        </div>

      </div>
    </section>
  );
}

export default Statistics;