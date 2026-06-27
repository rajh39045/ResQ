import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Car, ClipboardList, MapPinned,
  User, Users, Wrench, Menu, X, Shield, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const role = user?.role || "USER";

  const userLinks = [
    { name: "Dashboard", path: "/dashboard",  icon: LayoutDashboard },
    { name: "Vehicles",  path: "/vehicles",   icon: Car             },
    { name: "Requests",  path: "/requests",   icon: ClipboardList   },
    { name: "Tracking",  path: "/tracking",   icon: MapPinned       },
    { name: "Profile",   path: "/profile",    icon: User            },
  ];
  const mechanicLinks = [
    { name: "Dashboard",     path: "/mechanic/dashboard",   icon: LayoutDashboard },
    { name: "Available Jobs",path: "/mechanic/jobs",        icon: ClipboardList   },
    { name: "Active Jobs",   path: "/mechanic/active-jobs", icon: Wrench          },
    { name: "Tracking",      path: "/mechanic/tracking",    icon: MapPinned       },
    { name: "Profile",       path: "/mechanic/profile",     icon: User            },
  ];
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users",     path: "/admin/users",     icon: Users           },
    { name: "Mechanics", path: "/admin/mechanics", icon: Wrench          },
    { name: "Requests",  path: "/admin/requests",  icon: ClipboardList   },
  ];

  const navItems =
    role === "ADMIN"    ? adminLinks :
    role === "MECHANIC" ? mechanicLinks : userLinks;

  return (
    <>
      {/* ══════════════════════════════════════
          MOBILE TOP BAR (lg:hidden)
          Fixed at top, full width, z-[60]
      ══════════════════════════════════════ */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[60] h-14 bg-slate-950/98 backdrop-blur-xl border-b border-white/[0.08] flex items-center px-4">
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 flex-shrink-0"
        >
          <Menu size={19} />
        </button>

        {/* Logo — absolutely centered regardless of button widths */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            ResQ
          </span>
        </div>

        {/* Role badge — right side */}
        <div className="ml-auto flex items-center gap-1.5">
          <Shield size={12} className="text-orange-400" />
          <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">{role}</span>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MOBILE BACKDROP
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          SIDEBAR DRAWER
          — Mobile: slides in from left over content (z-[80])
          — Desktop: static column in flex layout
      ══════════════════════════════════════ */}
      <aside className={`
        fixed top-0 left-0 z-[80] h-screen w-[280px]
        bg-slate-950 border-r border-white/[0.08]
        transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:w-72 lg:flex-shrink-0
      `}>

        {/* Subtle glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[100px] pointer-events-none" />

        {/* ── Sidebar Header ── */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            <motion.h1
              whileHover={{ scale: 1.04 }}
              className="text-[32px] font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent leading-none"
            >
              ResQ
            </motion.h1>
            <div className="flex items-center gap-1.5 mt-2">
              <Shield size={12} className="text-orange-400" />
              <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">{role}</span>
            </div>
          </div>

          {/* Close — mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.07] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Nav Links ── */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-200px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-150 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                      <span className="font-medium text-[14px]">{item.name}</span>
                    </div>
                    <ChevronRight
                      size={15}
                      className={`transition-all ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                    />
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ── User Card ── */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/[0.08] bg-slate-950">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-2xl p-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-orange-500/25 flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[13px] truncate">{user?.name || "User"}</p>
              <p className="text-slate-500 text-[11px] truncate">{user?.email || "user@email.com"}</p>
            </div>
          </motion.div>
        </div>

      </aside>
    </>
  );
}

export default Sidebar;
