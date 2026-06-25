import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import {
  useEffect,
  useState,
  useMemo,
} from "react";

import { motion } from "framer-motion";

import L from "leaflet";

import socket from "../../socket/socket";

import {
  MapPin,
  Wrench,
  Navigation,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

import markerShadow from "leaflet/dist/images/marker-shadow.png";

const userIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  shadowUrl: markerShadow,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mechanicIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/854/854894.png",
  shadowUrl: markerShadow,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function ChangeView({
  userLocation,
  mechanicLocation,
}) {
  const map = useMap();

  useEffect(() => {
    if (
      userLocation &&
      mechanicLocation
    ) {
      map.fitBounds(
        [
          userLocation,
          mechanicLocation,
        ],
        {
          padding: [80, 80],
        }
      );
    }
  }, [
    map,
    userLocation,
    mechanicLocation,
  ]);

  return null;
}

function TrackingMap() {
  const [
    userLocation,
    setUserLocation,
  ] = useState(null);

  const [
    mechanicLocation,
    setMechanicLocation,
  ] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      (err) =>
        console.log(err),
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  useEffect(() => {
    socket.on(
      "location-update",
      (data) => {
        setMechanicLocation([
          data.latitude,
          data.longitude,
        ]);
      }
    );

    return () =>
      socket.off(
        "location-update"
      );
  }, []);

  const distance =
    useMemo(() => {
      if (
        !userLocation ||
        !mechanicLocation
      )
        return null;

      const R = 6371;

      const dLat =
        ((mechanicLocation[0] -
          userLocation[0]) *
          Math.PI) /
        180;

      const dLon =
        ((mechanicLocation[1] -
          userLocation[1]) *
          Math.PI) /
        180;

      const a =
        Math.sin(
          dLat / 2
        ) *
          Math.sin(
            dLat / 2
          ) +
        Math.cos(
          (userLocation[0] *
            Math.PI) /
            180
        ) *
          Math.cos(
            (mechanicLocation[0] *
              Math.PI) /
              180
          ) *
          Math.sin(
            dLon / 2
          ) *
          Math.sin(
            dLon / 2
          );

      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );

      return (
        R * c
      ).toFixed(1);
    }, [
      userLocation,
      mechanicLocation,
    ]);

  if (!userLocation) {
    return (
      <div className="h-[600px] rounded-3xl bg-slate-900 flex items-center justify-center text-white">
        Detecting your location...
      </div>
    );
  }

  return (
    <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10">

      {/* Info Panel */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          absolute
          top-4
          left-4
          z-[1000]
          bg-black/70
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          p-4
          text-white
        "
      >
        <div className="flex items-center gap-2">
          <Navigation
            size={18}
            className="text-green-400"
          />

          <span>
            Live Tracking
          </span>
        </div>

        {distance && (
          <p className="mt-2 text-sm text-slate-300">
            Distance:
            {" "}
            {distance}
            km
          </p>
        )}
      </motion.div>

      <MapContainer
        center={userLocation}
        zoom={15}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ChangeView
          userLocation={
            userLocation
          }
          mechanicLocation={
            mechanicLocation
          }
        />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={
            userLocation
          }
          icon={userIcon}
        >
          <Popup>
            Your Vehicle
          </Popup>
        </Marker>

        {mechanicLocation && (
          <>
            <Marker
              position={
                mechanicLocation
              }
              icon={
                mechanicIcon
              }
            >
              <Popup>
                Mechanic
              </Popup>
            </Marker>

            <Polyline
              positions={[
                userLocation,
                mechanicLocation,
              ]}
              pathOptions={{
                color:
                  "#f97316",
                weight: 6,
              }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}

export default TrackingMap;