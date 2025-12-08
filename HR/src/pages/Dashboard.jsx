import React from "react";
import {
  Bell,
  Users,
  DollarSign,
  ClipboardList,
  ArrowUp,
  ArrowDown,
  PenSquare,
} from "lucide-react";

import { useToggle } from "../context/Toggle";
import DashboardCards from "./../components/dashboard/DashboardCards";
import AttendanceChart from "../components/dashboard/AttendernceChart";
import EmployeeApplications from "./../components/dashboard/EmployeeApplications";
import ProjectListCard from "./../components/dashboard/ProjectListCard";
import EmployeePerformanceChart from "./../components/dashboard/EmployeePerformanceCard";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../components/ToggleButton";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header (same as Employee) */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1>Dashboard</h1>
        </div>
      </div>

      {/* Top Bar (same alignment as Employee top bar) */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* Left: Greeting */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800">Hello Namra</h1>
          <p className="text-gray-500 text-sm">Good Morning</p>
        </div>

        {/* Right: Search  */}
        <div className="flex items-center gap-3">
          <SearchBar />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 md:px-6 lg:px-10 pt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCards
          title="Total Employee"
          value="560"
          percentage="12%"
          percentageColor="bg-emerald-500"
          icon={<Users size={22} className="text-blue-500" />}
          arrowIcon={<ArrowUp size={10} className="text-white" />}
        />
        <DashboardCards
          title="Total Expense"
          value="1050"
          percentage="5%"
          percentageColor="bg-emerald-500"
          icon={<DollarSign size={22} className="text-blue-500" />}
          arrowIcon={<ArrowDown size={10} className="text-white" />}
        />
        <DashboardCards
          title="Today Attendance"
          value="470"
          percentage="8%"
          percentageColor="bg-emerald-500"
          icon={<ClipboardList size={22} className="text-blue-500" />}
          arrowIcon={<ArrowUp size={10} className="text-white" />}
        />
        <DashboardCards
          title="Total Projects"
          value="250"
          percentage="12%"
          percentageColor="bg-emerald-500"
          icon={<PenSquare size={22} className="text-blue-500" />}
          arrowIcon={<ArrowUp size={10} className="text-white" />}
        />
      </div>

      {/* Charts Row */}
      <div className="px-4 md:px-6 lg:px-10 pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <EmployeeApplications />
      </div>

      <div className="px-4 md:px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectListCard />
        <EmployeePerformanceChart />
      </div>
    </div>
  );
};

export default Dashboard;
