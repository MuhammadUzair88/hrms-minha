// src/pages/CompanyExpense/CompanyExpense.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  MoreVertical,
  PlusCircle,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";

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
import ActionMenu from "../../components/ActionMenu"; // ✅ reusable action dropdown

const CompanyExpense = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

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
  const totalPages = Math.ceil(dummyExpenses.length / rowsPerPage);
  const paginatedData = dummyExpenses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Table columns
  const columns = [
    "Select",
    "Date",
    "Category",
    "Name",
    "Description",
    "Taker",
    "Rs.",
    "Status",
    "Action",
  ];

  // ✅ Actions for ActionMenu
  const actions = [
    {
      title: "Edit",
      icon: Edit,
      onClick: (row) => navigate(`/expenses-edit/${row.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (row) => console.log("Delete", row.id),
    },
    {
      title: "Export",
      icon: Upload,
      onClick: (row) => exportRow(row),
    },
  ];

  // ✅ Export all visible rows as CSV
  const exportAll = () => {
    if (!paginatedData.length) return;

    const csvHeader = columns
      .filter((col) => col !== "Select" && col !== "Action")
      .join(",");

    const csvRows = paginatedData
      .map((r) =>
        [
          r.date,
          r.category,
          r.name,
          r.description,
          r.taker,
          r.amount,
          r.status,
        ].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `CompanyExpenses-Page${currentPage}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Export single row
  const exportRow = (row) => {
    const csvHeader = columns
      .filter((col) => col !== "Select" && col !== "Action")
      .join(",");
    const csvRow = [
      row.date,
      row.category,
      row.name,
      row.description,
      row.taker,
      row.amount,
      row.status,
    ].join(",");
    const csvContent = csvHeader + "\n" + csvRow;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${row.name}-Expense.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
          <h1>Company Expense</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <Button
          icon={PlusCircle}
          label="New Expenses"
          onClick={() => setOpenAddModal(true)}
        />

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <SearchBar />
          <FilterButton onClick={() => setOpenFilter(true)} />
          <Button icon={Download} label="Export" onClick={exportAll} />
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

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4" />,
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
            <ActionMenu
              emp={att}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={actions}
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

export default CompanyExpense;
