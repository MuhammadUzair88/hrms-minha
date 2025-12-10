import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../context/Toggle";
import SearchBar from "../../../components/SearchBar";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { dummyInternAttendanceRecords } from "../../../assets/assets";
import Pagination from "../../../components/Pagination";
import ToggleButton from "../../../components/ToggleButton";
import ActionMenu from "../../../components/ActionMenu"; // ✅ Reusable ActionMenu

const InternAttendanceManagement = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // ✅ Close ActionMenu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(
    dummyInternAttendanceRecords.records.length / rowsPerPage
  );

  const paginatedData = dummyInternAttendanceRecords.records.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Table columns
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

  // ✅ Define ActionMenu items for interns
  const internActions = [
    {
      title: "View",
      icon: Eye,
      onClick: (att) => navigate(`/intern-attendence/view/${att.id}`), // ✅ spelling fixed
    },
    {
      title: "Edit",
      icon: Edit,
      onClick: (att) => navigate(`/intern-attendence/edit/${att.id}`), // ✅ spelling fixed
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

  // ✅ Render each row
  const renderRow = (att) => [
    <input key={`select-${att.id}`} type="checkbox" className="w-4 h-4" />,
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
      className={`w-20 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${
        att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
      }`}
    >
      {att.status}
    </span>,
    <ActionMenu
      emp={att}
      openActionMenu={openActionMenu}
      setOpenActionMenu={setOpenActionMenu}
      actions={internActions}
    />,
  ];

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* ✅ Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Attendance Management</h1>
      </div>

      {/* ✅ Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">Interns List</h1>

        <div className="flex items-center gap-2">
          <SearchBar />
          <Button
            label="All Interns"
            onClick={() => navigate("/intern-attendence/allinterns")} // ✅ spelling fixed
          />
        </div>
      </div>

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={paginatedData} renderRow={renderRow} />
      </div>

      {/* ✅ Pagination */}
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
