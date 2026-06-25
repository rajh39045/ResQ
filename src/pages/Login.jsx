import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  Wrench,
  Loader2,
  ShieldCheck,
  Clock3,
  MapPinned,
} from "lucide-react";

import { motion } from "framer-motion";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
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
        await loginUser(formData);

      const user =
        response?.data?.user ||
        response?.user;

      const token =
        response?.data?.token ||
        response?.token;

      if (!token) {
        throw new Error(
          "Token not received"
        );
      }

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      login(user, token);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">

      {/* Left Side */}

      <div
        className="
          hidden
          lg:flex
          flex-1
          relative
          items-center
          justify-center
        "
      >
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000"
          alt="ResQ"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-lg px-8">

          <div className="flex items-center gap-3 mb-8">

            <Wrench
              size={40}
              className="text-orange-500"
            />

            <h1 className="text-5xl font-black text-white">
              ResQ
            </h1>

          </div>

          <h2 className="text-5xl font-black text-white leading-tight">
            Roadside Help
            <span className="text-orange-500">
              {" "}
              Anytime.
            </span>
          </h2>

          <p className="text-slate-300 mt-6 text-lg">
            Connect with nearby
            mechanics, towing
            services and emergency
            roadside assistance.
          </p>

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3 text-white">
              <ShieldCheck
                className="text-green-400"
                size={20}
              />
              Verified Mechanics
            </div>

            <div className="flex items-center gap-3 text-white">
              <Clock3
                className="text-orange-400"
                size={20}
              />
              24/7 Support
            </div>

            <div className="flex items-center gap-3 text-white">
              <MapPinned
                className="text-blue-400"
                size={20}
              />
              Live Tracking
            </div>

          </div>

        </div>
      </div>

      {/* Right Side */}

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          p-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            w-full
            max-w-md
            bg-white/5
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[32px]
            p-8
          "
        >
          <div className="text-center mb-8">

            <h2 className="text-4xl font-black text-white">
              Welcome Back
            </h2>

            <p className="text-slate-400 mt-2">
              Login to continue
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              className="
                w-full
                p-4
                rounded-2xl
                bg-white/5
                border
                border-white/10
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-orange-500
              "
            />

            <div className="relative">

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
                onChange={
                  handleChange
                }
                required
                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder:text-slate-500
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
                className="
                  absolute
                  right-4
                  top-4
                  text-slate-400
                "
              >
                {showPassword ? (
                  <EyeOff
                    size={20}
                  />
                ) : (
                  <Eye
                    size={20}
                  />
                )}
              </button>

            </div>

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
                flex
                items-center
                justify-center
                gap-2
                hover:scale-[1.02]
                transition
                disabled:opacity-50
              "
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

          <p className="text-center text-slate-400 mt-6">
            Don't have an account?
            {" "}
            <Link
              to="/register"
              className="text-orange-500 font-medium"
            >
              Register
            </Link>
          </p>

        </motion.div>
      </div>

    </div>
  );
}

export default Login;