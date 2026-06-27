import { useEffect, useState, useRef } from "react";
import {
  X, Car, Navigation, Wrench, Fuel, Battery, Truck,
  Loader2, Send, AlertCircle, CheckCircle2, MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getVehicles } from "../../api/vehicleApi";

const SERVICES = [
  { title: "Breakdown Repair",   icon: Wrench  },
  { title: "Flat Tire Repair",   icon: Car     },
  { title: "Battery Jump Start", icon: Battery },
  { title: "Fuel Delivery",      icon: Fuel    },
  { title: "Towing",             icon: Truck   },
];

const INIT = {
  vehicle: "", serviceType: "Breakdown Repair",
  address: "", latitude: "", longitude: "",
};

export default function RequestServiceModal({ isOpen, onClose, onSubmit }) {
  const [vehicles,  setVehicles]  = useState([]);
  const [geoState,  setGeoState]  = useState("idle"); // idle | loading | ok | err
  const [geoMsg,    setGeoMsg]    = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [form,      setForm]      = useState(INIT);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchVehicles();
      setForm(INIT);
      setGeoState("idle");
      setGeoMsg("");
      setSubmitErr("");
      // Scroll panel into view smoothly
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
    }
  }, [isOpen]);

  async function fetchVehicles() {
    try { const r = await getVehicles(); setVehicles(r.data || []); }
    catch (e) { console.error(e); }
  }

  function patch(key, val) {
    setForm(p => ({ ...p, [key]: val }));
    if (submitErr) setSubmitErr("");
  }

  function locateMe() {
    if (!navigator.geolocation) { setGeoState("err"); setGeoMsg("Geolocation not supported."); return; }
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      pos => {
        patch("latitude",  pos.coords.latitude.toFixed(6));
        patch("longitude", pos.coords.longitude.toFixed(6));
        setGeoState("ok");
        setGeoMsg(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      },
      err => {
        setGeoState("err");
        setGeoMsg(
          err.code === 1 ? "Location access denied. Please allow and retry." :
          err.code === 2 ? "Position unavailable." : "Request timed out."
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.vehicle)        { setSubmitErr("Select a vehicle first."); return; }
    if (!form.address.trim()) { setSubmitErr("Enter the breakdown address."); return; }
    const lat = parseFloat(form.latitude), lng = parseFloat(form.longitude);
    if (isNaN(lat) || isNaN(lng)) { setSubmitErr("Add your location using the button or enter coordinates manually."); return; }
    onSubmit({
      vehicle: form.vehicle,
      serviceType: form.serviceType,
      address: form.address,
      breakdownLocation: { coordinates: [lng, lat] },
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          key="request-panel"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{   opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ overflow: "hidden" }}
          className="w-full"
        >
          {/* Panel card */}
          <div className="w-full bg-[#0d1017] border border-white/[0.09] rounded-2xl shadow-xl shadow-black/40 overflow-hidden">

            {/* Top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-orange-600 via-orange-400 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Wrench size={15} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white leading-tight">Request Assistance</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Fill in details — nearby mechanics will be notified instantly</p>
                </div>
              </div>
              <button
                type="button" onClick={onClose} aria-label="Close panel"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.07] transition-colors flex-shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="px-6 py-5">

                {/* ── Row 1: Vehicle + Location ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Vehicle */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Vehicle
                    </label>
                    <div className="relative">
                      <select
                        value={form.vehicle}
                        onChange={e => patch("vehicle", e.target.value)}
                        className="w-full h-10 pl-3 pr-8 rounded-xl text-[13px] appearance-none cursor-pointer
                          bg-white/[0.04] border border-white/[0.08] text-white
                          focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20
                          hover:border-white/[0.14] transition-colors
                          [&>option]:bg-[#141820] [&>option]:text-white"
                      >
                        <option value="" disabled className="text-slate-500">Select vehicle</option>
                        {vehicles.length === 0
                          ? <option disabled className="text-slate-500">No vehicles found</option>
                          : vehicles.map(v => (
                              <option key={v._id} value={v._id}>{v.vehicleNumber}</option>
                            ))}
                      </select>
                      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* GPS */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      GPS Coordinates
                      {geoState === "ok" && (
                        <span className="ml-2 normal-case font-normal text-emerald-500 tracking-normal">✓ {geoMsg}</span>
                      )}
                      {geoState === "err" && (
                        <span className="ml-2 normal-case font-normal text-red-400 tracking-normal">{geoMsg}</span>
                      )}
                    </label>
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      {/* Lat */}
                      <div className="relative">
                        <MapPin size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <input
                          type="number" placeholder="Latitude" value={form.latitude}
                          onChange={e => patch("latitude", e.target.value)}
                          step="any"
                          className="w-full h-10 pl-6 pr-2 rounded-xl text-[12px]
                            bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600
                            focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20
                            hover:border-white/[0.14] transition-colors
                            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      {/* Lng */}
                      <div className="relative">
                        <MapPin size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
                        <input
                          type="number" placeholder="Longitude" value={form.longitude}
                          onChange={e => patch("longitude", e.target.value)}
                          step="any"
                          className="w-full h-10 pl-6 pr-2 rounded-xl text-[12px]
                            bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600
                            focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20
                            hover:border-white/[0.14] transition-colors
                            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      {/* Locate button */}
                      <button
                        type="button" onClick={locateMe} disabled={geoState === "loading"}
                        title="Use my current location"
                        className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all
                          ${geoState === "ok"
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                            : geoState === "err"
                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                            : "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {geoState === "loading"
                          ? <Loader2 size={14} className="animate-spin" />
                          : geoState === "ok"
                          ? <CheckCircle2 size={14} />
                          : <Navigation size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── Row 2: Service Type ── */}
                <div className="mb-4">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Service type
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {SERVICES.map(({ title, icon: Icon }) => {
                      const active = form.serviceType === title;
                      return (
                        <button
                          key={title} type="button"
                          onClick={() => patch("serviceType", title)}
                          aria-pressed={active}
                          className={`relative flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border transition-all duration-150
                            focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500
                            ${active
                              ? "bg-orange-500/12 border-orange-500/35 text-orange-400"
                              : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-slate-300"
                            }`}
                        >
                          {active && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-8 h-px bg-orange-400/60 rounded-full" />
                          )}
                          <Icon size={17} strokeWidth={active ? 2.2 : 1.6} />
                          <span className="text-[10px] font-medium leading-tight text-center">{title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Row 3: Address ── */}
                <div className="mb-4">
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                    Breakdown address
                  </label>
                  <textarea
                    rows={2} placeholder="Street, area, or nearest landmark…"
                    value={form.address} onChange={e => patch("address", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl resize-none text-[13px] leading-relaxed
                      bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600
                      focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20
                      hover:border-white/[0.14] transition-colors"
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {submitErr && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-3 py-2.5 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[12px]"
                    >
                      <AlertCircle size={13} className="flex-shrink-0" />
                      {submitErr}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 px-6 py-3.5 border-t border-white/[0.06] bg-white/[0.01]">
                <div className="text-[11px] text-slate-600">
                  {form.serviceType && (
                    <span>Selected: <span className="text-slate-400 font-medium">{form.serviceType}</span></span>
                  )}
                </div>
                <div className="flex items-center gap-2">
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
                      flex items-center gap-1.5 shadow-lg shadow-orange-500/25
                      transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    <Send size={13} />
                    Send request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}