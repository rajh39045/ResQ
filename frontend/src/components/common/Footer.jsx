import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 blur-[120px]" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="flex items-center gap-3 mb-5"
            >

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">

                <Wrench className="text-white" />

              </div>

              <div>
                <h2 className="text-3xl font-black text-white">
                  ResQ
                </h2>

                <p className="text-xs uppercase tracking-widest text-orange-400">
                  Roadside Assistance
                </p>
              </div>

            </motion.div>

            <p className="text-gray-400 leading-7">
              Fast, reliable and professional roadside
              assistance available 24/7 across India.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">

              {[
                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
                FaGithub,
              ].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-orange-500 transition"
                >
                  <Icon size={18} />
                </motion.a>
              ))}

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-white text-lg font-bold mb-5">
              Services
            </h3>

            <ul className="space-y-4">

              {[
                "Breakdown Repair",
                "Towing Service",
                "Battery Jump Start",
                "Fuel Delivery",
                "Tyre Replacement",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition cursor-pointer"
                >
                  <ArrowUpRight size={14} />
                  {item}
                </li>
              ))}

            </ul>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-white text-lg font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-4">

              {[
                "Home",
                "About",
                "Services",
                "Contact",
                "Login",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition cursor-pointer"
                >
                  <ArrowUpRight size={14} />
                  {item}
                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-white text-lg font-bold mb-5">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">
                <Phone className="text-orange-500 mt-1" />
                <span className="text-gray-400">
                  +91 9876543210
                </span>
              </div>

              <div className="flex gap-3">
                <Mail className="text-orange-500 mt-1" />
                <span className="text-gray-400">
                  support@resq.com
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-orange-500 mt-1" />
                <span className="text-gray-400">
                  India • Available 24/7
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 ResQ. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <a
              href="#"
              className="text-gray-500 hover:text-orange-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-orange-400 transition"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-orange-400 transition"
            >
              Support
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;