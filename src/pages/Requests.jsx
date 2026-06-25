import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import RequestCard from "../components/cards/RequestCard";
import RequestServiceModal from "../components/modals/RequestServiceModal";

import { getMyRequests, createRequest } from "../api/requestApi";

import { ClipboardList, CheckCircle, Clock, Plus } from "lucide-react";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [isOpen,   setIsOpen]   = useState(false);

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const response = await getMyRequests();
      setRequests(response.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createRequest(data);
      toast.success("Request Created Successfully");
      setIsOpen(false);
      fetchRequests();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create request");
    }
  };

  const completedRequests = requests.filter(r => r.status === "COMPLETED").length;
  const activeRequests    = requests.filter(r => r.status === "ACCEPTED" || r.status === "IN_PROGRESS").length;

  return (
    <DashboardLayout>

      {/* ── Header + inline panel ── */}
      <div className="mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-black text-white">Service Requests</h1>
            <p className="text-slate-400 mt-2">Manage all your roadside assistance requests</p>
          </div>

          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
              bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold
              hover:scale-105 transition-all"
          >
            <Plus
              size={18}
              className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
            />
            {isOpen ? "Cancel" : "New Request"}
          </button>
        </div>

        {/* Panel slides in RIGHT below the header */}
        <RequestServiceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleCreate}
        />

      </div>

      {/* ── Statistics ── */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <motion.div whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400">Total Requests</p>
              <h2 className="text-4xl font-black text-white mt-2">{requests.length}</h2>
            </div>
            <ClipboardList size={32} className="text-orange-500" />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400">Active</p>
              <h2 className="text-4xl font-black text-blue-400 mt-2">{activeRequests}</h2>
            </div>
            <Clock size={32} className="text-blue-400" />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400">Completed</p>
              <h2 className="text-4xl font-black text-green-400 mt-2">{completedRequests}</h2>
            </div>
            <CheckCircle size={32} className="text-green-400" />
          </div>
        </motion.div>

      </div>

      {/* ── Request list ── */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map(item => (
            <div key={item} className="h-44 rounded-3xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
          <ClipboardList size={60} className="mx-auto text-orange-500 mb-5" />
          <h2 className="text-3xl font-bold text-white">No Requests Yet</h2>
          <p className="text-slate-400 mt-3">Create your first roadside assistance request.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 px-6 py-3 rounded-2xl bg-orange-500 text-white font-semibold"
          >
            Create Request
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {requests.map(request => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      )}

    </DashboardLayout>
  );
}

export default Requests;