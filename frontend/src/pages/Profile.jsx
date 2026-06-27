import {
  useState,
  useEffect,
} from "react";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Phone,
  Shield,
  Save,
  CheckCircle,
  Star,
  Car,
  ClipboardList,
} from "lucide-react";

import { toast } from "react-toastify";

import DashboardLayout from "../layouts/DashboardLayout";

import { useAuth } from "../context/AuthContext";

import { updateProfile } from "../api/userApi";

function Profile() {
  const { user, updateUser } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
    });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await updateProfile(
            formData
          );

        updateUser(
          response.data
        );

        toast.success(
          "Profile Updated Successfully"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to update profile"
        );
      } finally {
        setLoading(false);
      }
    };

  const stats = [
    {
      title: "Vehicles",
      value: "5",
      icon: Car,
      color: "text-blue-400",
    },
    {
      title: "Requests",
      value: "12",
      icon: ClipboardList,
      color: "text-orange-400",
    },
    {
      title: "Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      title: "Verified",
      value: "Yes",
      icon: CheckCircle,
      color: "text-green-400",
    },
  ];

  return (
    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-black text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your account settings
        </p>

      </div>

      {/* Profile Header */}

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
          mb-8
        "
      >
        <div className="flex flex-col md:flex-row items-center gap-6">

          <div
            className="
              w-28
              h-28
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
            {user?.name?.charAt(0)}
          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              {user?.name}
            </h2>

            <p className="text-slate-400 mt-2">
              {user?.email}
            </p>

            <div className="flex items-center gap-2 mt-3">

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-500/10
                  text-green-400
                  border
                  border-green-500/20
                  text-sm
                "
              >
                Verified Account
              </span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-orange-500/10
                  text-orange-400
                  border
                  border-orange-500/20
                  text-sm
                "
              >
                {user?.role}
              </span>

            </div>

          </div>

        </div>

      </motion.div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {stats.map((item) => {
          const Icon =
            item.icon;

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
              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-400 text-sm">
                    {item.title}
                  </p>

                  <h3 className="text-3xl font-black text-white mt-2">
                    {item.value}
                  </h3>

                </div>

                <Icon
                  size={28}
                  className={
                    item.color
                  }
                />

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Profile Form */}

      <motion.form
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        onSubmit={handleSubmit}
        className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          space-y-6
        "
      >

        {/* Name */}

        <div>
          <label className="text-slate-400 block mb-2">
            Full Name
          </label>

          <div className="relative">

            <User
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-950
                border
                border-white/10
                text-white
                focus:border-orange-500
                outline-none
              "
            />

          </div>

        </div>

        {/* Email */}

        <div>
          <label className="text-slate-400 block mb-2">
            Email
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              disabled
              value={
                formData.email
              }
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-950
                border
                border-white/10
                text-slate-500
              "
            />

          </div>

        </div>

        {/* Phone */}

        <div>
          <label className="text-slate-400 block mb-2">
            Phone
          </label>

          <div className="relative">

            <Phone
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-950
                border
                border-white/10
                text-white
                focus:border-orange-500
                outline-none
              "
            />

          </div>

        </div>

        {/* Role */}

        <div>
          <label className="text-slate-400 block mb-2">
            Role
          </label>

          <div className="relative">

            <Shield
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              disabled
              value={user?.role}
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-950
                border
                border-white/10
                text-slate-500
              "
            />

          </div>

        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            hover:scale-[1.02]
            transition-all
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Save size={18} />

          {loading
            ? "Updating..."
            : "Save Changes"}
        </button>

      </motion.form>

    </DashboardLayout>
  );
}

export default Profile;