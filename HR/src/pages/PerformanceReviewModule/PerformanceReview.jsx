// src/pages/Performance/PerformanceReview.jsx
import React, { useState } from "react";
import { Download } from "lucide-react";
import { dummyPerformanceReviews } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import DateRangePicker from "../../components/DateRangePicker";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";

const PerformanceReview = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // ---------------------------------------
  // EXPORT FUNCTIONALITY (FULL CSV EXPORT)
  // ---------------------------------------
  const handleExport = () => {
    const data = dummyPerformanceReviews;

    const csvHeader = [
      "Employee Name",
      "Employee ID",
      "Department",
      "Working Days",
      "Projects",
      "Leaves",
      "Status",
    ].join(",");

    const csvRows = data
      .map((item) =>
        [
          item.name,
          item.employeeId,
          item.department ?? "-",
          item.workingDays ?? "-",
          item.projects ?? "-",
          item.leaves ?? "-",
          item.status,
        ].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Performance_Reviews.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleStatusClick = (att) => {
    if (att.status === "View Feedback") {
      navigate(`/view-feedback/${att.id}`, { state: { review: att } });
    } else if (att.status === "Add Feedback") {
      navigate(`/add-feedback/${att.id}`, { state: { review: att } });
    }
  };

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyPerformanceReviews.length / rowsPerPage);

  const paginatedData = dummyPerformanceReviews.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Working Days",
    "Projects",
    "Leaves",
    "Status",
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
          <h1 className="text-[#09182B]">Performance Review</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <DateRangePicker range={dateRange} onToggle={() => {}} />

        <div className="flex items-center gap-2">
          <SearchBar />
          <Button label={"Export"} icon={Download} onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4" />,
            <span className="font-medium">{att.name}</span>,
            <span>{att.employeeId}</span>,
            att.department || "-",
            att.workingDays || "-",
            att.projects || "-",
            att.leaves || "-",
            <button
              onClick={() => handleStatusClick(att)}
              className={`text-sm text-white whitespace-nowrap text-center px-3 py-1 rounded-md w-28 flex items-center justify-center ${
                att.status === "Add Feedback"
                  ? "bg-[#0E9EE7] hover:bg-sky-600"
                  : "bg-[#00B172] hover:bg-green-600"
              }`}
            >
              {att.status}
            </button>,
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

export default PerformanceReview;
