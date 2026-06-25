import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Car, Save, Fuel, Palette, Hash, Calendar, Tag } from "lucide-react";

const VEHICLE_TYPES = ["CAR", "BIKE", "TRUCK", "BUS", "SUV", "VAN"];
const FUEL_TYPES    = ["PETROL", "DIESEL", "ELECTRIC", "CNG", "HYBRID"];

const INIT = {
  vehicleNumber: "",
  vehicleType:   "CAR",
  brand:         "",
  model:         "",
  year:          "",
  color:         "",
  fuelType:      "PETROL",
};

export default function AddVehicleModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(INIT);

  function patch(key, val) {
    setForm(p => ({ ...p, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(INIT);
    onClose();
  }

  const fields = [
    { name: "vehicleNumber", label: "Vehicle Number", placeholder: "e.g. MH12AB1234", icon: Hash,     type: "text"   },
    { name: "brand",         label: "Brand",          placeholder: "e.g. Toyota",     icon: Tag,      type: "text"   },
    { name: "model",         label: "Model",          placeholder: "e.g. Innova",     icon: Car,      type: "text"   },
    { name: "year",          label: "Year",           placeholder: "e.g. 2022",       icon: Calendar, type: "number" },
    { name: "color",         label: "Color",          placeholder: "e.g. White",      icon: Palette,  type: "text"   },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit   ={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
         className="relative w-full max-w-4xl bg-[#0c0e14] border border-white/[0.09] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Top accent */}
            <div className="h-[2px] w-full bg-gradient-to-r from-orange-600 via-orange-400 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Car size={18} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white leading-tight">Add Vehicle</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Register a new vehicle to your account</p>
                </div>
              </div>
              <button
                type="button" onClick={onClose} aria-label="Close"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.07] transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="px-6 py-5 space-y-4">

                {/* Text fields — 2 col grid */}
                <div className="grid grid-cols-2 gap-3">
                  {fields.map(({ name, label, placeholder, icon: Icon, type }) => (
                    <div key={name} className="space-y-1.5">
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                        {label}
                      </label>
                      <div className="relative">
                        <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[name]}
                          onChange={e => patch(name, e.target.value)}
                          className="w-full h-10 pl-8 pr-3 rounded-xl text-[13px]
                            bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600
                            focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20
                            hover:border-white/[0.14] transition-colors
                            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Fuel Type — fills last cell in the 2-col grid */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                      Fuel Type
                    </label>
                    <div className="relative">
                      <Fuel size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none z-10" />
                      <select
                        value={form.fuelType}
                        onChange={e => patch("fuelType", e.target.value)}
                        className="w-full h-10 pl-8 pr-8 rounded-xl text-[13px] appearance-none cursor-pointer
                          bg-white/[0.05] border border-white/[0.08] text-white
                          focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20
                          hover:border-white/[0.14] transition-colors
                          [&>option]:bg-[#141820] [&>option]:text-white"
                      >
                        {FUEL_TYPES.map(f => (
                          <option key={f} value={f}>{f.charAt(0) + f.slice(1).toLowerCase()}</option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Vehicle Type — full width pill selector */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {VEHICLE_TYPES.map(type => {
                      const active = form.vehicleType === type;
                      return (
                        <button
                          key={type} type="button"
                          onClick={() => patch("vehicleType", type)}
                          aria-pressed={active}
                          className={`h-9 rounded-xl text-[11px] font-semibold border transition-all duration-150
                            focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500
                            ${active
                              ? "bg-orange-500/15 border-orange-500/40 text-orange-400"
                              : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:bg-white/[0.06] hover:text-slate-300 hover:border-white/[0.12]"
                            }`}
                        >
                          {type.charAt(0) + type.slice(1).toLowerCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-white/[0.06] bg-white/[0.01]">
                <button
                  type="button" onClick={onClose}
                  className="h-9 px-4 rounded-xl text-[12px] font-medium text-slate-400
                    border border-white/[0.08] hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12]
                    transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-xl text-[12px] font-semibold text-white
                    bg-orange-500 hover:bg-orange-400 active:scale-[0.98]
                    flex items-center gap-1.5 shadow-lg shadow-orange-500/20
                    transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  <Save size={13} />
                  Save Vehicle
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}