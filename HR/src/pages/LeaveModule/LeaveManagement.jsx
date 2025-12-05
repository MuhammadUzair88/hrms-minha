import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import { dummyLeaves } from "../../assets/assets";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import Table from "../../components/Table";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";

const LeaveManagement = () => {
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

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyLeaves.length / rowsPerPage);

  const paginatedData = dummyLeaves.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    "Select",
    "Date",
    "Employee Name",
    "Employee ID",
    "Department",
    "Type",
    "Reason",
    "Application",
    "Status",
  ];

  // ✅ EXPORT CSV FUNCTION
  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Employee Name",
      "Employee ID",
      "Department",
      "Type",
      "Reason",
      "Status",
    ];

    const rows = paginatedData.map((leave) => [
      leave.date,
      leave.name,
      leave.employeeId,
      leave.department,
      leave.leaveType,
      leave.reason,
      leave.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leave_management_page.csv`);
    document.body.appendChild(link);
    link.click();
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
          <h1 className="text-[#09182B]">Leave Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* All Employees Button */}
        <Button
          label={"All Employees"}
          onClick={() => navigate("/leaves-allemployees")}
        />

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* Export Button */}
          <Button label={"Export"} icon={Download} onClick={handleExportCSV} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(leave) => [
            <input type="checkbox" className="w-4 h-4" />,
            leave.date,
            <span className="font-medium">{leave.name}</span>,
            leave.employeeId,
            leave.department,
            leave.leaveType,
            leave.reason,
            <span
              onClick={() => navigate("/leave-application")}
              className="text-[#0E9EE7] border-b-2 cursor-pointer"
            >
              Read
            </span>,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap text-center w-20 flex items-center justify-center ${
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

export default LeaveManagement;
