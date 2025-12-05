import React, { useState } from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { FaLaptopCode } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";

import Designer from "../../components/TaskManager/Designer";
import Developer from "../../components/TaskManager/Developer";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import { dummyTasks } from "../../assets/assets";

const TaskManagement = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("designer");

  // ---------------------------
  // EXPORT FUNCTIONALITY
  // ---------------------------
  const handleExport = () => {
    const data = dummyTasks;

    // Convert data to CSV format
    const csvHeader = [
      "Task Title",
      "Description",
      "Deadline",
      "Priority",
      "Assigned To",
      "Status",
    ].join(",");

    const csvRows = data
      .map((task) => {
        const assignedNames = task.assignedTo.join(" | ");
        return [
          task.title,
          task.description.replace(/,/g, " "), // avoid breaking CSV
          task.deadline,
          task.priority,
          assignedNames,
          task.status,
        ].join(",");
      })
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Tasks-${activeTab}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Task Management</h1>
        </div>
      </div>

      {/* Top Section */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("designer")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "designer"
                ? "text-[#0E9EE7] border-b-2 border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdDesignServices size={22} />
            Designer
          </button>

          <button
            onClick={() => setActiveTab("developer")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "developer"
                ? "text-[#0E9EE7] border-b-2 border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <FaLaptopCode size={22} />
            Developer
          </button>
        </div>

        {/* Search + Export */}
        <div className="flex items-center gap-2">
          <SearchBar />

          {/* Export Button */}
          <Button icon={Download} label="Export" onClick={handleExport} />
        </div>
      </div>

      {/* Content */}
      <div className="">
        {activeTab === "designer" ? <Designer /> : <Developer />}
      </div>
    </div>
  );
};

export default TaskManagement;
