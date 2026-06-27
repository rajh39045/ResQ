import { motion } from "framer-motion";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/common/DashboardHeader";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[180px]" />
      </div>

      {/* Sidebar — fixed on mobile (drawer), static on desktop */}
      <Sidebar />

      {/* Main Content — no top margin needed, sidebar handles its own spacing */}
      <main className="flex-1 relative z-10 overflow-x-hidden
        pt-14 lg:pt-0
        px-4 md:px-6 lg:px-8
        pb-6 lg:pb-8
      ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          {/* Header — hidden on mobile (top bar handles it), shown on desktop */}
          <div className="hidden lg:block">
            <DashboardHeader />
          </div>

          {/* Content Container */}
          <div className="
            mt-0 lg:mt-6
            bg-white/[0.03] backdrop-blur-xl
            border border-white/10
            rounded-2xl lg:rounded-[32px]
            p-4 md:p-6 lg:p-8
            min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-180px)]
          ">
            {children}
          </div>
        </motion.div>
      </main>

    </div>
  );
}

export default DashboardLayout;
