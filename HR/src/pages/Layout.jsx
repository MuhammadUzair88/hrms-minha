// src/pages/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarCollapsed from "../components/SidebarCollapsed";
import { useToggle } from "../context/Toggle";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const { isSidebarOpen } = useToggle();

  return (
    <div className="flex">
      {/* Sidebar with animation */}
      <motion.div
        initial={{ width: 70 }}
        animate={{ width: isSidebarOpen ? 270 : 70 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
        }}
        className="h-screen bg-gradient-to-b from-[#0B1B2B] to-[#132C44] shadow-xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <Sidebar />
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <SidebarCollapsed />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 h-screen overflow-y-scroll bg-white"
        initial={false} // don’t animate on every render
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Layout;
