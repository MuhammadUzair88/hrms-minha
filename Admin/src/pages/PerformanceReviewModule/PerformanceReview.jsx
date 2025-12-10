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
import DateRangeSelector from "../../components/DateRangePicker";

const PerformanceReview = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  const [showDatePicker, setShowDatePicker] = useState(false);

  // default range: today → today
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
  const totalPages = Math.ceil(dummyPerformanceReviews.length / rowsPerPage);
  const paginatedData = dummyPerformanceReviews.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    // ❌ removed: "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Working Days",
    "Projects",
    "Leaves",
    // ❌ removed: "Status",
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
        <DateRangeSelector
          value={dateRange}
          onChange={(range) => setDateRange(range)}
          position="left"
        />

        <div className="flex items-center gap-2">
          <SearchBar />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            // ❌ removed checkbox
            <span className="font-medium">{att.name}</span>,
            <span>{att.employeeId}</span>,
            att.department || "-",
            att.workingDays || "-",
            att.projects || "-",
            att.leaves || "-",
            // ❌ removed status button
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
