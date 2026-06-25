import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  IndianRupee,
  Briefcase,
  CheckCircle,
} from "lucide-react";

function MechanicProfile() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Completed Jobs",
      value: "128",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "Rating",
      value: "4.9",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      title: "Experience",
      value: "5 Years",
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      title: "Earnings",
      value: "₹52K",
      icon: IndianRupee,
      color: "text-orange-400",
    },
  ];

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-black text-white">
          Mechanic Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your professional information
        </p>
      </div>

      {/* Profile Card */}

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
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">

          {/* Avatar */}

          <div
            className="
              w-32
              h-32
              rounded-full
              bg-gradient-to-r
              from-orange-500
              to-orange-600
              flex
              items-center
              justify-center
              text-white
              text-5xl
              font-bold
              shadow-lg
            "
          >
            {user?.name?.charAt(0) || "M"}
          </div>

          {/* Info */}

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-3xl font-bold text-white">
                {user?.name || "Mechanic"}
              </h2>

              <span
                className="
                  flex
                  items-center
                  gap-1
                  bg-green-500/10
                  text-green-400
                  border
                  border-green-500/20
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
              >
                <ShieldCheck size={14} />
                Verified
              </span>

            </div>

            <p className="text-slate-400 mt-2">
              Professional Roadside Assistance Expert
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={18} />
                {user?.email}
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={18} />
                {user?.phone || "Not Available"}
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <User size={18} />
                {user?.role}
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Wrench size={18} />
                Roadside Assistance
              </div>

            </div>

          </div>

        </div>

      </motion.div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{
                y: -5,
              }}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
              "
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    {item.title}
                  </p>

                  <h3 className="text-3xl font-black text-white mt-2">
                    {item.value}
                  </h3>
                </div>

                <Icon
                  size={30}
                  className={item.color}
                />

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Services */}

      <div
        className="
          mt-8
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Services Offered
        </h2>

        <div className="flex flex-wrap gap-3">

          {[
            "Breakdown Repair",
            "Battery Jump Start",
            "Flat Tire Repair",
            "Fuel Delivery",
            "Towing Service",
          ].map((service) => (
            <span
              key={service}
              className="
                px-4
                py-2
                rounded-full
                bg-orange-500/10
                border
                border-orange-500/20
                text-orange-400
              "
            >
              {service}
            </span>
          ))}

        </div>
      </div>

    </DashboardLayout>
  );
}

export default MechanicProfile;