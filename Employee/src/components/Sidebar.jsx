import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  BarChart3,
  Megaphone,
  DollarSign,
  LogOut,
  Timer,
} from "lucide-react";
import { useToggle } from "../context/Toggle";

const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },

    {
      label: "Attendance",
      icon: <CalendarCheck size={20} />,
      path: "/attendence",
    },
    {
      label: "Leaves",
      icon: <CalendarDays size={20} />,
      path: "/leaves",
    },
    {
      label: "Task",
      icon: <ClipboardList size={20} />,
      path: "/task-management",
    },
    {
      label: "Payroll",
      icon: <DollarSign size={20} />,
      path: "/payroll",
    },
    {
      label: "Performance",
      icon: <BarChart3 size={20} />,
      path: "/feedback",
    },
    {
      label: "Announcement",
      icon: <Megaphone size={20} />,
      path: "/announcements",
    },
    {
      label: "Daily Work Timer",
      icon: <Timer size={20} />,
      path: "/dailywork",
    },
  ];

  const { isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  if (!isSidebarOpen) return null;

  return (
    <div className="w-[270px] h-screen bg-[#0B1B2B] flex flex-col p-4 text-white overflow-y-auto">
      {/* Logo */}
      <div className="flex">
        <img src="/MinhaTech.png" alt="Logo" className="w-[170px] -mb-6" />
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto scrollbar-none px-2 mt-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full
              ${
                isActive
                  ? "bg-[#0E9EE7] text-white"
                  : "text-gray-300 hover:bg-[#1a2b3c]"
              }`
            }
          >
            {item.icon}
            <span className="text-sm font-medium truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div
        onClick={() => navigate("/employee")}
        className="mt-auto flex items-center gap-4 px-3 pt-10 cursor-pointer"
      >
        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="designer"
          className="w-10 h-10 rounded-xl"
        />
        <div>
          <h1 className="font-bold text-[16px]">Muzna</h1>
          <p className="font-light text-xs">UI/UX Designer</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-2">
        <button className="mt-4 w-full h-11 px-5 bg-[#0E9EE7] text-white rounded-lg flex items-center justify-start gap-2 font-semibold hover:bg-sky-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
