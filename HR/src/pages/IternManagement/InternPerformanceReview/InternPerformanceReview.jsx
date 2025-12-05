import React, { useState } from "react";
import { Download, CalendarDays } from "lucide-react";
import { dummyInternPerformanceReviews } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Table from "../../../components/Table";
import SearchBar from "../../../components/SearchBar";
import Button from "../../../components/Button";
import { useToggle } from "../../../context/Toggle";
import Pagination from "../../../components/Pagination";

const InternPerformanceReview = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();

  const [showDatePicker, setShowDatePicker] = useState(false);

  // default range: today → today
  const [dateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleStatusClick = (review) => {
    if (review.status === "View Feedback") {
      navigate(`/intern-performance-review/feedback/view/${review.id}`, {
        state: { review },
      });
    } else if (review.status === "Add Feedback") {
      navigate(`/intern-performance-review/feedback/${review.id}`, {
        state: { review },
      });
    }
  };

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(
    dummyInternPerformanceReviews.length / rowsPerPage
  );
  const paginatedData = dummyInternPerformanceReviews.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table columns
  const columns = [
    "Select",
    "Intern Name",
    "Intern ID",
    "Department",
    "Working Days",
    "Projects",
    "Leaves",
    "Status",
  ];

  // ✅ CSV Export Functionality
  const handleExport = () => {
    const csvHeader = columns.slice(1).join(","); // skip "Select"
    const csvRows = dummyInternPerformanceReviews
      .map((review) =>
        [
          review.name,
          review.internId,
          review.department || "-",
          review.workingDays || "-",
          review.projects || "-",
          review.leaves || "-",
          review.status,
        ].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `InternPerformanceReviews.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
        <h1>Intern Performance</h1>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        {/* Date Button */}
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

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />
          <Button label={"Export"} icon={Download} onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(review) => [
            <input type="checkbox" className="w-4 h-4" />,
            <span className="font-medium">{review.name}</span>,
            <span className="font-medium">{review.internId}</span>,
            review.department || "-",
            review.workingDays || "-",
            review.projects || "-",
            review.leaves || "-",
            <button
              onClick={() => handleStatusClick(review)}
              className={`py-1 px-3 rounded-md text-sm text-white whitespace-nowrap text-center cursor-pointer w-28 flex items-center justify-center ${
                review.status === "Add Feedback"
                  ? "bg-[#0E9EE7] hover:bg-sky-600"
                  : "bg-[#00B172] hover:bg-green-600"
              }`}
            >
              {review.status}
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

export default InternPerformanceReview;
