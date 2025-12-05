import React, { useState } from "react";
import { Download } from "lucide-react";
import { dummyPayrollData } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../context/Toggle";
import Table from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";

const PayRollManagement = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  // Table columns
  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Fixed Salary",
    "Deduction",
    "Bonus",
    "Total",
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyPayrollData.length / rowsPerPage);
  const paginatedData = dummyPayrollData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ CSV Export Functionality
  const handleExport = () => {
    const csvHeader = columns.slice(1).join(","); // skip "Select"
    const csvRows = dummyPayrollData
      .map((employee) => {
        const latestRecord = [...employee.records].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0];

        return [
          employee.name,
          employee.employeeId,
          employee.designation,
          latestRecord.basicSalary,
          latestRecord.deductions,
          latestRecord.bonus,
          latestRecord.total,
        ].join(",");
      })
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `PayrollData.csv`;
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
          <h1 className="text-[#09182B]">Payroll Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <h1 className="text-2xl text-[#09182B] font-semibold">
          Employee Payroll
        </h1>

        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {/* All Employees Button */}
          <Button
            label="All Employees"
            onClick={() => navigate("/payroll-allemployees")}
          />

          {/* Export Button */}
          <Button icon={Download} label={"Export"} onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(employee) => {
            const latestRecord = [...employee.records].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )[0];

            return [
              <input type="checkbox" className="w-4 h-4" />,
              <span className="font-medium">{employee.name}</span>,
              employee.employeeId,
              employee.designation,
              latestRecord.basicSalary,
              latestRecord.deductions,
              latestRecord.bonus,
              <span className="font-semibold">{latestRecord.total}</span>,
            ];
          }}
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

export default PayRollManagement;
