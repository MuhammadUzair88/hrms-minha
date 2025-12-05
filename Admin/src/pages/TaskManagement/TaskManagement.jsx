// src/pages/TaskManagement/TaskManagement.jsx
import React, { useState } from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import Designer from "../../components/TaskManager/Designer"; // ONLY Designer imported
import DateRangePicker from "../../components/DateRangePicker";

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

      {/* Search + Export */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <div>
          <Button
            onClick={() => navigate("/task-management/newproject")}
            label="New Project"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* Export Button */}
          <DateRangePicker
            range={dateRange}
            onToggle={() => setShowDatePicker((prev) => !prev)}
          />
        </div>
      </div>

      {/* Designer Table (Directly Displayed) */}
      <div>
        <Designer />
      </div>
    </div>
  );
};

export default TaskManagement;
