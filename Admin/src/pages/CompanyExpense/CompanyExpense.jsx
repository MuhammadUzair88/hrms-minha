// src/pages/CompanyExpense/CompanyExpense.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, PlusCircle } from "lucide-react";

import FilterModal from "../../components/CompanyExpense/FilterModal";
import { useToggle } from "../../context/Toggle";
import { dummyExpenses } from "../../assets/assets";
import Table from "../../components/Table"; // ✅ reusable table
import AddExpense from "../../components/CompanyExpense/AddExpense";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import FilterButton from "../../components/FilterButton";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";
import DateRangePicker from "../../components/DateRangePicker";

const CompanyExpense = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const [openAddModal, setOpenAddModal] = useState(false);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyExpenses.length / rowsPerPage);
  const paginatedData = dummyExpenses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Table columns (removed "Select" and "Action")
  const columns = [
    "Date",
    "Category",
    "Name",
    "Description",
    "Taker",
    "Rs.",
    "Status",
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
          <h1>Company Expense</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        {/* Search & Export */}
        <div className="w-full flex justify-end gap-2">
          <DateRangePicker
            range={dateRange}
            onToggle={() => setShowDatePicker((prev) => !prev)}
          />
          <FilterButton onClick={() => setOpenFilter(true)} />{" "}
        </div>
      </div>

      {/* Filter Modal */}
      {openFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenFilter(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10">
            <FilterModal setHolidayModalOpen={setOpenFilter} />
          </div>
        </div>
      )}

      {/* Add Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenAddModal(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10">
            <AddExpense setOpenAddModal={setOpenAddModal} />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            att.date,
            att.category,
            <span className="font-medium">{att.name}</span>,
            att.description,
            att.taker,
            att.amount,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap text-center w-28 flex items-center justify-center ${
                att.status === "Pending" ? "bg-[#09182B]" : "bg-[#00B172]"
              }`}
            >
              {att.status}
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

export default CompanyExpense;
