import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import TrackingMap from "../components/map/TrackingMap";

import socket from "../socket/socket";

import {
  MapPin,
  Navigation,
  Satellite,
  Clock,
  Wifi,
} from "lucide-react";

function MechanicTracking() {
  const [location, setLocation] =
    useState(null);

  const [tracking, setTracking] =
    useState(false);

  useEffect(() => {
    const watchId =
      navigator.geolocation.watchPosition(
        (position) => {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          setLocation({
            latitude,
            longitude,
          });

          setTracking(true);

          socket.emit(
            "mechanic-location",
            {
              latitude,
              longitude,
            }
          );
        },
        (error) => {
          console.log(
            "Location Error:",
            error
          );

          setTracking(false);
        },
        {
          enableHighAccuracy: true,
        }
      );

    return () =>
      navigator.geolocation.clearWatch(
        watchId
      );
  }, []);

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-black text-white">
          Live Tracking
        </h1>

        <p className="text-slate-400 mt-2">
          Share your real-time location
          with customers during service.
        </p>

      </div>

      {/* Top Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* GPS Status */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                GPS Status
              </p>

              <h3 className="text-xl font-bold text-white mt-2">
                {tracking
                  ? "Active"
                  : "Offline"}
              </h3>

            </div>

            <div
              className={`w-4 h-4 rounded-full ${
                tracking
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />

          </div>

        </div>

        {/* Latitude */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <div className="flex items-center gap-3">

            <MapPin className="text-orange-500" />

            <div>

              <p className="text-slate-400 text-sm">
                Latitude
              </p>

              <h3 className="text-white font-bold">
                {location
                  ?.latitude
                  ?.toFixed(5) ||
                  "--"}
              </h3>

            </div>

          </div>

        </div>

        {/* Longitude */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <div className="flex items-center gap-3">

            <Navigation className="text-blue-400" />

            <div>

              <p className="text-slate-400 text-sm">
                Longitude
              </p>

              <h3 className="text-white font-bold">
                {location
                  ?.longitude
                  ?.toFixed(5) ||
                  "--"}
              </h3>

            </div>

          </div>

        </div>

        {/* Connection */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <div className="flex items-center gap-3">

            <Wifi className="text-green-400" />

            <div>

              <p className="text-slate-400 text-sm">
                Socket
              </p>

              <h3 className="text-white font-bold">
                Connected
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Live Status Card */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold text-white flex items-center gap-3">

              <Satellite
                className="text-orange-500"
              />

              Live Tracking Enabled

            </h2>

            <p className="text-slate-400 mt-2">
              Your location is being
              shared with customers
              in real time.
            </p>

          </div>

          <div
            className="
              px-5
              py-3
              rounded-2xl
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              font-semibold
              flex
              items-center
              gap-2
            "
          >
            <Clock size={18} />
            Real-Time Active
          </div>

        </div>

      </div>

      {/* Map */}

      <div
        className="
          h-[75vh]
          rounded-3xl
          overflow-hidden
          border
          border-white/10
          shadow-2xl
        "
      >
        <TrackingMap />
      </div>

    </DashboardLayout>
  );
}

export default MechanicTracking;