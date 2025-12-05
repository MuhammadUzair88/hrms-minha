import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Megaphone,
  UserPlus,
  DollarSign,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: <LayoutDashboard size={20} />, path: "/" },
  { icon: <Users size={20} />, path: "/employees" },
  { icon: <CalendarCheck size={20} />, path: "/attendance" },
  { icon: <CalendarDays size={20} />, path: "/leaves" },
  { icon: <ClipboardList size={20} />, path: "/task-management" },
  { icon: <BarChart3 size={20} />, path: "/performance" },
  { icon: <Megaphone size={20} />, path: "/announcements" },
  { icon: <UserPlus size={20} />, path: "/interns" },
  { icon: <DollarSign size={20} />, path: "/payroll" },
  { icon: <FileSpreadsheet size={20} />, path: "/expenses" },
];

const SidebarCollapsed = () => {
  return (
    <div className="w-[70px] min-h-screen bg-[#0B1B2B] flex flex-col justify-between items-center py-4 ">
      {/* Top Section - Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/minha.png" alt="Logo" className="w-8 h-8" />
      </div>
      {/* Middle Section - Menu Icons */}
      <nav className="flex flex-col items-center gap-6 flex-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                isActive
                  ? "bg-[#0E9EE7] text-white"
                  : "text-gray-300 hover:bg-[#1a2b3c]"
              }`
            }
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>
      {/* Bottom Section - HR Profile + Logout */}{" "}
      {/* Adjusted gap and margin */}
      <div className="pt-10 flex flex-col items-center justify-center gap-4">
        <img src="/HR.jpeg" alt="HR" className="w-10 h-10 rounded-xl" />
        <button className="text-white hover:text-[#0E9EE7]">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default SidebarCollapsed;
