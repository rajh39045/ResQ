import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Wrench, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 30
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <motion.nav
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{
                  rotate: 20,
                  scale: 1.1,
                }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
              >
                <Wrench
                  size={22}
                  className="text-white"
                />
              </motion.div>

              <div>
                <h1 className="text-2xl font-black text-white">
                  ResQ
                </h1>

                <p className="text-[10px] text-orange-400 uppercase tracking-widest">
                  Roadside Assistance
                </p>
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">

              {[
                "Services",
                "How It Works",
                "Contact",
              ].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{
                    y: -2,
                  }}
                  href={`#${item
                    .toLowerCase()
                    .replaceAll(
                      " ",
                      "-"
                    )}`}
                  className="text-gray-300 hover:text-white transition"
                >
                  {item}
                </motion.a>
              ))}

              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  to="/register"
                  className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg shadow-orange-500/30"
                >
                  Get Started

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </Link>
              </motion.div>

            </div>

            {/* Mobile */}
            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="md:hidden text-white"
            >
              {isOpen ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed top-20 left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 z-40"
          >
            <div className="flex flex-col p-8 gap-6">

              <a
                href="#services"
                onClick={() =>
                  setIsOpen(false)
                }
                className="text-white text-lg"
              >
                Services
              </a>

              <a
                href="#how-it-works"
                onClick={() =>
                  setIsOpen(false)
                }
                className="text-white text-lg"
              >
                How It Works
              </a>

              <a
                href="#contact"
                onClick={() =>
                  setIsOpen(false)
                }
                className="text-white text-lg"
              >
                Contact
              </a>

              <Link
                to="/login"
                onClick={() =>
                  setIsOpen(false)
                }
                className="text-white text-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() =>
                  setIsOpen(false)
                }
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-center py-4 rounded-2xl text-white font-semibold"
              >
                Get Started
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;