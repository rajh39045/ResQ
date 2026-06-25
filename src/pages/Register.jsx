import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Wrench,
  Car,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { registerUser } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await registerUser(
          formData
        );

      toast.success(
        response?.message ||
          "Registration Successful 🎉"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-950
        flex
        items-center
        justify-center
        px-4
        py-10
        relative
        overflow-hidden
      "
    >
      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[180px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[180px]" />

      <div
        className="
          relative
          z-10
          max-w-7xl
          w-full
          grid
          lg:grid-cols-2
          gap-10
          items-center
        "
      >

        {/* Left Side */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="hidden lg:block"
        >
          <h1 className="text-6xl font-black text-white leading-tight">
            Join
            <span className="text-orange-500">
              {" "}ResQ
            </span>
          </h1>

          <p className="text-slate-400 text-xl mt-6 max-w-xl">
            India's next generation
            roadside assistance platform
            connecting vehicle owners
            with verified mechanics.
          </p>

          <div className="space-y-5 mt-10">

            <div className="flex items-center gap-4 text-white">
              <ShieldCheck className="text-green-400" />
              Verified Mechanics
            </div>

            <div className="flex items-center gap-4 text-white">
              <Clock3 className="text-orange-400" />
              24/7 Emergency Support
            </div>

            <div className="flex items-center gap-4 text-white">
              <Car className="text-blue-400" />
              Live Tracking
            </div>

          </div>
        </motion.div>

        {/* Form */}

        <motion.form
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          onSubmit={handleSubmit}
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          "
        >
          <h2 className="text-4xl font-black text-white text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-slate-400 mb-8">
            Start your journey with ResQ
          </p>

          {/* Name */}

          <div className="relative mb-4">
            <User
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-900
                border
                border-white/10
                text-white
                outline-none
                focus:border-orange-500
              "
            />
          </div>

          {/* Email */}

          <div className="relative mb-4">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-900
                border
                border-white/10
                text-white
                outline-none
                focus:border-orange-500
              "
            />
          </div>

          {/* Phone */}

          <div className="relative mb-4">
            <Phone
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-900
                border
                border-white/10
                text-white
                outline-none
                focus:border-orange-500
              "
            />
          </div>

          {/* Password */}

          <div className="relative mb-4">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={handleChange}
              required
              className="
                w-full
                pl-12
                pr-12
                p-4
                rounded-2xl
                bg-slate-900
                border
                border-white/10
                text-white
                outline-none
                focus:border-orange-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Role */}

          <div className="relative mb-6">
            <Wrench
              size={18}
              className="absolute left-4 top-4 text-slate-500"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
                w-full
                pl-12
                p-4
                rounded-2xl
                bg-slate-900
                border
                border-white/10
                text-white
                outline-none
              "
            >
              <option value="USER">
                Vehicle Owner
              </option>

              <option value="MECHANIC">
                Mechanic
              </option>
            </select>
          </div>

          {/* Button */}

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
              text-white
              font-semibold
              hover:scale-[1.02]
              transition-all
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="text-center text-slate-400 mt-6">
            Already have an account?
            <Link
              to="/login"
              className="text-orange-500 ml-2"
            >
              Login
            </Link>
          </p>
        </motion.form>

      </div>
    </div>
  );
}

export default Register;