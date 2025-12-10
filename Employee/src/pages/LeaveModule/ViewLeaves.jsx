// src/pages/Leaves/ViewLeaves.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { dummyLeaves, dummyEmployees } from "../../assets/assets";
import { CalendarDays, Download } from "lucide-react";
import Table from "../../components/Table";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Pagination from "../../components/Pagination";
import { FcLeave } from "react-icons/fc";
import { MdHolidayVillage } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import ToggleButton from "../../components/ToggleButton";
import { useToggle } from "../../context/Toggle";
import DateRangeSelector from "../../components/DateRangePicker";

const ViewLeaves = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(leaves.length / rowsPerPage);
  const paginatedData = leaves.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const emp = dummyEmployees.find((e) => e.employeeId === "EMP002");

    if (emp) {
      setEmployee(emp);

      const records = dummyLeaves.filter(
        (leave) => leave.employeeId === emp.employeeId
      );

      setLeaves(records);
    }
  }, []);

  const { toggleSidebar, isSidebarOpen } = useToggle();

  const columns = ["Date", "Leave Type", "Reason", "Application", "Status"];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Leaves</h1>
        </div>
      </div>

      {/* Top bar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={employee?.image || "/default-avatar.png"}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt={employee?.name}
          />
          <div className="flex flex-col">
            <h2 className="font-medium text-lg">{employee?.name}</h2>
            <p className="text-sm text-gray-500">{employee?.designation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />

          <button
            onClick={() => navigate(`/newleave`)}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <BiAddToQueue size={16} />
            New Leave
          </button>
        </div>
      </div>

      {/* Summary Box */}
      <div className="px-[39px] mt-6">
        <div className="w-full bg-stone-50 rounded-xl border border-zinc-400/20 p-6 flex items-center justify-between gap-6">
          {/* Total Leaves */}
          <div className="flex flex-col">
            <span className="text-slate-900 text-xl font-semibold">
              Total Leaves
            </span>
            <span className="text-slate-900 text-xl font-light">
              {leaves.length}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-18 bg-[#09182B]"></div>

          {/* Total Absents */}
          <div className=" flex flex-col ">
            <span className="text-slate-900 text-xl font-semibold">
              Total Absents
            </span>
            <span className="text-slate-900 text-xl font-light">
              {leaves.filter((l) => l.status === "Rejected").length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(leave) => [
            leave.date,
            leave.leaveType || "-",
            leave.reason || "-",
            <span
              onClick={() => navigate("/leave-application")}
              className="text-[#0E9EE7] border-b-2 cursor-pointer"
            >
              Read
            </span>,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
                leave.status === "Waiting"
                  ? "bg-[#0E9EE7]"
                  : leave.status === "Approved"
                  ? "bg-[#00B172]"
                  : "bg-[#EB0016]"
              }`}
            >
              {leave.status}
            </span>,
          ]}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[37px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ViewLeaves;
