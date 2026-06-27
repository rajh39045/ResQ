import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import VehicleCard from "../components/cards/VehicleCard";
import AddVehicleModal from "../components/modals/AddVehicleModal";

import {
  getVehicles,
  createVehicle,
} from "../api/vehicleApi";

import {
  Car,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { motion } from "framer-motion";

import { toast } from "react-toastify";

function Vehicles() {
  const [vehicles, setVehicles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles =
    async () => {
      try {
        setLoading(true);

        const response =
          await getVehicles();

        setVehicles(
          response.data ||
            response.vehicles ||
            []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load vehicles"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleAddVehicle =
    async (vehicleData) => {
      try {
        await createVehicle(
          vehicleData
        );

        toast.success(
          "Vehicle Added Successfully"
        );

        setIsModalOpen(false);

        fetchVehicles();
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to add vehicle"
        );
      }
    };

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-4xl font-black text-white">
            My Vehicles
          </h1>

          <p className="text-slate-400 mt-2">
            Manage and monitor all
            registered vehicles
          </p>

        </div>

        <button
          onClick={() =>
            setIsModalOpen(true)
          }
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            text-white
            font-semibold
            hover:scale-105
            transition-all
          "
        >
          <Plus size={18} />
          Add Vehicle
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <motion.div
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
              <p className="text-slate-400">
                Total Vehicles
              </p>

              <h2 className="text-4xl font-black text-white mt-2">
                {vehicles.length}
              </h2>
            </div>

            <Car
              size={32}
              className="text-orange-500"
            />

          </div>
        </motion.div>

        <motion.div
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
              <p className="text-slate-400">
                Active Vehicles
              </p>

              <h2 className="text-4xl font-black text-green-400 mt-2">
                {vehicles.length}
              </h2>
            </div>

            <ShieldCheck
              size={32}
              className="text-green-400"
            />

          </div>
        </motion.div>

        <motion.div
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
              <p className="text-slate-400">
                Vehicle Types
              </p>

              <h2 className="text-4xl font-black text-blue-400 mt-2">
                {
                  new Set(
                    vehicles.map(
                      (v) =>
                        v.vehicleType
                    )
                  ).size
                }
              </h2>
            </div>

            <Truck
              size={32}
              className="text-blue-400"
            />

          </div>
        </motion.div>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[1, 2, 3].map(
            (item) => (
              <div
                key={item}
                className="
                  h-64
                  rounded-3xl
                  bg-white/5
                  animate-pulse
                "
              />
            )
          )}

        </div>
      ) : vehicles.length === 0 ? (

        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-14
            text-center
          "
        >

          <Car
            size={70}
            className="
              mx-auto
              text-orange-500
              mb-6
            "
          />

          <h2 className="text-3xl font-bold text-white">
            No Vehicles Added
          </h2>

          <p className="text-slate-400 mt-3">
            Register your first vehicle
            to request roadside
            assistance.
          </p>

          <button
            onClick={() =>
              setIsModalOpen(true)
            }
            className="
              mt-6
              px-6
              py-3
              rounded-2xl
              bg-orange-500
              text-white
              font-semibold
            "
          >
            Add Vehicle
          </button>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {vehicles.map(
            (vehicle, index) => (
              <motion.div
                key={vehicle._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
              >
                <VehicleCard
                  vehicle={
                    vehicle
                  }
                />
              </motion.div>
            )
          )}

        </div>

      )}

      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={
          handleAddVehicle
        }
      />

    </DashboardLayout>
  );
}

export default Vehicles;