// src/pages/EmployeeTasks/EmployeeTasks.jsx
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";

// --------------------------------------
// Dummy Employee Object
// --------------------------------------
const employee = {
  id: 7,
  name: "Talha Tariq",
  designation: "UI/UX Designer",
  image: "https://randomuser.me/api/portraits/men/33.jpg",
};

// --------------------------------------
// Dummy Task List
// --------------------------------------
const employeeTasks = [
  {
    id: 2,
    taskName: "Animals Sounds",
    startTime: "05:00 PM",
    endTime: "01:00 AM",
    idleTime: "00:30 Min",
    workingHours: "08:00 Hrs",
    totalTime: "05:03:00",
  },
  {
    id: 2,
    taskName: "Animals Sounds",
    startTime: "05:00 PM",
    endTime: "01:00 AM",
    idleTime: "00:30 Min",
    workingHours: "08:00 Hrs",
    totalTime: "05:03:00",
  },
  {
    id: 2,
    taskName: "Animals Sounds",
    startTime: "05:00 PM",
    endTime: "01:00 AM",
    idleTime: "00:30 Min",
    workingHours: "08:00 Hrs",
    totalTime: "05:03:00",
  },
  {
    id: 2,
    taskName: "Animals Sounds",
    startTime: "05:00 PM",
    endTime: "01:00 AM",
    idleTime: "00:30 Min",
    workingHours: "08:00 Hrs",
    totalTime: "05:03:00",
  },
  {
    id: 2,
    taskName: "Animals Sounds",
    startTime: "05:00 PM",
    endTime: "01:00 AM",
    idleTime: "00:30 Min",
    workingHours: "08:00 Hrs",
    totalTime: "05:03:00",
  },
];

const DailyWork = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(employeeTasks.length / rowsPerPage);
  const paginatedData = employeeTasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-h-screen ">
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Daily Work Timer</h1>
        </div>
      </div>
      {/* Top Section: Image + Name + Date Picker */}
      <div className="flex items-center justify-between relative px-[39px] py-[26px]">
        {/* Employee Info */}
        <div className="flex items-center gap-3">
          <img
            src={employee.image}
            alt="Employee"
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="font-medium text-lg">{employee.name}</h2>
            <p className="text-sm text-gray-500">{employee.designation}</p>
          </div>
        </div>

        {/* Date Button */}
        <div className="relative">
          <button
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
            onClick={() => setShowDatePicker((prev) => !prev)}
          >
            {`${format(dateRange[0].startDate, "MMM dd")} - ${format(
              dateRange[0].endDate,
              "MMM dd"
            )}`}
            <CalendarDays size={16} />
          </button>

          {showDatePicker && (
            <div className="absolute top-12 right-0 z-50 shadow-lg">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className=" px-[39px] py-[26px]">
        <Table
          columns={[
            "Task Name",
            "Start Time",
            "End Time",
            "Idle Time",
            "Working Hrs",
            "Total Time",
          ]}
          data={paginatedData}
          renderRow={(task) => [
            task.taskName,
            task.startTime,
            task.endTime,
            task.idleTime,
            task.workingHours,
            task.totalTime,
          ]}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[39px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DailyWork;
