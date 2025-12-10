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
import DateRangeSelector from "../../components/DateRangePicker";

const ViewLeaves = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    const emp = dummyEmployees.find((e) => e.id === parseInt(id));

    if (emp) {
      setEmployee(emp);
      const records = dummyLeaves.filter(
        (leave) => leave.employeeId === emp.employeeId
      );
      setLeaves(records);
    }
  }, [id]);

  const columns = [
    "Select",
    "Date",
    "Leave Type",
    "Reason",
    "Application",
    "Status",
  ];

  // ✅ EXPORT CSV FUNCTION (same as other page)
  const handleExportCSV = () => {
    const headers = ["Date", "Leave Type", "Reason", "Status"];

    const rows = paginatedData.map((leave) => [
      leave.date,
      leave.leaveType || "-",
      leave.reason || "-",
      leave.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute(
      "download",
      `${employee?.name || "employee"}_leaves_page.csv`
    );
    link.setAttribute("href", encodedUri);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/leaves")}
          className="cursor-pointer"
        />
        <h1>Leave Management</h1>
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
            onClick={handleExportCSV}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
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
