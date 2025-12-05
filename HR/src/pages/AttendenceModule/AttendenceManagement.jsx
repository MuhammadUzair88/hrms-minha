import React, { useEffect, useState } from "react";
import { MoreVertical, Eye, Edit, Trash2, Upload } from "lucide-react";
import { dummyAttendanceRecords } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import Table from "./../../components/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";
import ActionMenu from "../../components/ActionMenu";

const AttendanceManagement = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  //Action Menu items

  const attendanceActions = [
    {
      title: "View",
      icon: Eye,
      onClick: (att) => navigate(`/view-attendance/${att.id}`),
    },
    {
      title: "Edit",
      icon: Edit,
      onClick: (att) => navigate(`/edit-attendance/${att.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (att) => console.log("Delete", att.id),
    },
    {
      title: "Export",
      icon: Upload,
      onClick: (att) => console.log("Export", att.id),
    },
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(
    dummyAttendanceRecords.records.length / rowsPerPage
  );
  const paginatedData = dummyAttendanceRecords.records.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table columns
  const columns = [
    "Select",
    "Date",
    "Employee Name",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Status",
    "Action",
  ];

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
          <h1 className="text-[#09182B]">Attendance Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">Employee List</h1>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* All Employees Button */}
          <Button
            label="All Employees"
            onClick={() => navigate("/allemployees")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4 " />,
            att.date,
            <span className="font-medium">{att.name}</span>,
            att.timeIn,
            att.timeOut,
            att.breakTime,
            att.idleTime,
            att.workHours,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap  text-center w-20 flex items-center justify-center ${
                att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
              }`}
            >
              {att.status}
            </span>,
            <ActionMenu
              emp={att}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={attendanceActions}
            />,
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

export default AttendanceManagement;
