import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../context/Toggle";
import SearchBar from "../../../components/SearchBar";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { dummyInternAttendanceRecords } from "../../../assets/assets";
import Pagination from "../../../components/Pagination";
import ToggleButton from "../../../components/ToggleButton";

const InternAttendanceManagement = () => {
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(
    dummyInternAttendanceRecords.records.length / rowsPerPage
  );

  const paginatedData = dummyInternAttendanceRecords.records.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Removed: Select + Action
  const columns = [
    "Date",
    "Employee Name",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Status",
  ];

  const renderRow = (att) => [
    att.date,
    <div key={`name-${att.id}`} className="font-medium">
      {att.name}
    </div>,
    att.timeIn || "-",
    att.timeOut || "-",
    att.breakTime || "-",
    att.idleTime || "-",
    att.workHours || "-",
    <span
      key={`status-${att.id}`}
      className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap w-20 inline-block text-center ${
        att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
      }`}
    >
      {att.status}
    </span>,
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Attendance Management</h1>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">Interns List</h1>

        <div className="flex items-center gap-2">
          <SearchBar />
          <Button
            label="All Interns"
            onClick={() => navigate("/intern-attendence/allinterns")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={paginatedData} renderRow={renderRow} />
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

export default InternAttendanceManagement;
