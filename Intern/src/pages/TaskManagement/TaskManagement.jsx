// src/pages/TaskManagement/TaskManagement.jsx
import React, { useState } from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import ToggleButton from "../../components/ToggleButton";
import DateRangePicker from "../../components/DateRangePicker";

import Designer from "../../components/TaskManager/Designer";

// Dummy data
import { dummyEmployees, dummyTasks } from "../../assets/assets";

const TaskManagement = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* ---------------- Header ---------------- */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton checked={isSidebarOpen} onChange={toggleSidebar} />
          <h1 className="text-[#09182B]">Task Management</h1>
        </div>
      </div>

      {/* ---------------- Search + Assigned To Employee ---------------- */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* -------- Assigned To Employee (first task) -------- */}
        <div className="flex items-center gap-3  rounded-lg">
          {dummyTasks.length > 0 &&
            (() => {
              const assigned = dummyEmployees.find(
                (e) => e.employeeId === dummyTasks[0].assignedTo
              );

              return (
                <div className="flex items-center gap-3">
                  <img
                    src={assigned?.image || "/default-avatar.png"}
                    className="w-[60px] h-[60px] rounded-full object-cover"
                    alt={assigned?.name}
                  />
                  <div className="flex flex-col">
                    <h2 className="font-medium text-lg">{assigned?.name}</h2>
                    <p className="text-sm text-gray-500">
                      {assigned?.designation}
                    </p>
                  </div>
                </div>
              );
            })()}
        </div>

        {/* -------- Search + Date Range -------- */}
        <div className="flex items-center gap-2">
          <SearchBar />
          <DateRangePicker
            range={dateRange}
            onToggle={() => setShowDatePicker(!showDatePicker)}
          />
        </div>
      </div>

      {/* ---------------- Designer Table (Task List) ---------------- */}
      <div>
        <Designer />
      </div>
    </div>
  );
};

export default TaskManagement;
