import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import SubmitQuotationModal from "../components/modals/SubmitQuotationModal";

import {
  MapPin,
  Car,
  Clock,
  IndianRupee,
  User,
  Phone,
  Wrench,
  Navigation,
  ShieldCheck,
  Send,
} from "lucide-react";

import { getAvailableRequests } from "../api/mechanicApi";
import { submitQuotation } from "../api/quotationApi";

function MechanicJobs() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getAvailableRequests();
      setRequests(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuotation = async (quotationData) => {
    try {
      await submitQuotation(quotationData);

      setRequests((prev) =>
        prev.filter(
          (request) =>
            request._id !== selectedRequest
        )
      );

      setSelectedRequest(null);
      setIsModalOpen(false);

      alert("Quotation submitted successfully");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to submit quotation"
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return {
          bg: "bg-yellow-500/10",
          text: "text-yellow-400",
          border: "border-yellow-500/20",
        };

      case "ACCEPTED":
        return {
          bg: "bg-blue-500/10",
          text: "text-blue-400",
          border: "border-blue-500/20",
        };

      case "IN_PROGRESS":
        return {
          bg: "bg-purple-500/10",
          text: "text-purple-400",
          border: "border-purple-500/20",
        };

      case "COMPLETED":
        return {
          bg: "bg-green-500/10",
          text: "text-green-400",
          border: "border-green-500/20",
        };

      default:
        return {
          bg: "bg-red-500/10",
          text: "text-red-400",
          border: "border-red-500/20",
        };
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-10">
        <h1 className="text-4xl font-black text-white">
          Available Jobs
        </h1>

        <p className="text-slate-400 mt-2">
          Nearby roadside assistance requests
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 rounded-3xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : requests.length === 0 ? (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">

          <Wrench
            size={60}
            className="mx-auto text-orange-500 mb-4"
          />

          <h2 className="text-3xl font-bold text-white">
            No Jobs Available
          </h2>

          <p className="text-slate-400 mt-3">
            New service requests will appear here.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {requests.map((request, index) => {
            const status =
              getStatusStyle(request.status);

            return (
              <motion.div
                key={request._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
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
                  hover:border-orange-500/20
                  transition-all
                "
              >

                {/* Header */}

                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <Wrench
                        size={24}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {request.serviceType}
                      </h2>

                      <p className="text-slate-400 text-sm">
                        Request ID: {request._id.slice(-6)}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`
                      px-4 py-2 rounded-full border text-sm font-medium w-fit
                      ${status.bg}
                      ${status.text}
                      ${status.border}
                    `}
                  >
                    {request.status}
                  </span>

                </div>

                {/* Details */}

                <div className="grid md:grid-cols-2 gap-4 mt-6">

                  <div className="bg-slate-900/50 rounded-2xl p-4">

                    <h3 className="text-white font-semibold mb-4">
                      Customer Details
                    </h3>

                    <div className="space-y-3">

                      <div className="flex items-center gap-3 text-slate-300">
                        <User size={18} />
                        {request.user?.name}
                      </div>

                      <div className="flex items-center gap-3 text-slate-300">
                        <Phone size={18} />
                        {request.user?.phone}
                      </div>

                    </div>

                  </div>

                  <div className="bg-slate-900/50 rounded-2xl p-4">

                    <h3 className="text-white font-semibold mb-4">
                      Vehicle Details
                    </h3>

                    <div className="space-y-3">

                      <div className="flex items-center gap-3 text-slate-300">
                        <Car size={18} />
                        {request.vehicle?.vehicleNumber}
                      </div>

                      <div className="flex items-center gap-3 text-slate-300">
                        <ShieldCheck size={18} />
                        {request.vehicle?.brand}{" "}
                        {request.vehicle?.model}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Address */}

                <div className="mt-5 bg-slate-900/50 rounded-2xl p-4">

                  <div className="flex items-start gap-3 text-slate-300">

                    <MapPin
                      size={18}
                      className="text-orange-500 mt-1"
                    />

                    <span>
                      {request.address}
                    </span>

                  </div>

                </div>

                {/* Footer */}

                <div className="grid md:grid-cols-2 gap-4 mt-5">

                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock size={18} />
                    {new Date(
                      request.createdAt
                    ).toLocaleString()}
                  </div>

                  <div className="flex items-center gap-3 text-green-400">
                    <IndianRupee size={18} />
                    ₹{request.quotedPrice || 0}
                  </div>

                </div>

                {/* Actions */}

                <div className="flex flex-wrap gap-4 mt-6">

                  <button
                    className="
                      flex items-center gap-2
                      px-5 py-3
                      rounded-2xl
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                    "
                  >
                    <Navigation size={18} />
                    View Location
                  </button>

                  <button
                    disabled={
                      request.status !== "PENDING"
                    }
                    onClick={() => {
                      setSelectedRequest(
                        request._id
                      );
                      setIsModalOpen(true);
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-white transition ${
                      request.status === "PENDING"
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    <Send size={18} />
                    Send Quotation
                  </button>

                </div>

              </motion.div>
            );
          })}

        </div>
      )}

      <SubmitQuotationModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        requestId={selectedRequest}
        onSubmit={handleQuotation}
      />

    </DashboardLayout>
  );
}

export default MechanicJobs;