import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyEmployees, dummyPayrollData } from "../../assets/assets";
import { Download } from "lucide-react";
import { Handbag } from "lucide-react";
import { TfiEmail } from "react-icons/tfi";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

const ViewPayroll = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [payrollRecords, setPayrollRecords] = useState([]);

  useEffect(() => {
    const emp = dummyEmployees.find((e) => e.id === parseInt(id));
    if (emp) {
      setEmployee(emp);
      const payrollData = dummyPayrollData.find(
        (p) => p.employeeId === emp.employeeId
      );
      setPayrollRecords(payrollData?.records || []);
    }
  }, [id]);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(payrollRecords.length / rowsPerPage);
  const paginatedData = payrollRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (!employee) {
    return <div>Loading...</div>;
  }

  // Table columns (no Action)
  const columns = ["Date", "Fixed Salary", "Deductions", "Bonus", "Total"];

  // ✅ CSV Export for this employee
  const handleExport = () => {
    if (!payrollRecords.length) return;

    const csvHeader = columns.join(",");
    const csvRows = payrollRecords
      .map((r) =>
        [r.date, r.basicSalary, r.deductions, r.bonus, r.total].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${employee.name}-Payroll.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/payroll")}
          className="cursor-pointer"
        />
        <h1>Payroll Details</h1>
      </div>

      {/* Employee Info */}
      <div className="px-[39px] pt-[26px] w-full flex items-center justify-between">
        <div className=" flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={employee.image || "/default-avatar.png"}
              className="w-[101px] h-[101px] object-cover rounded-lg"
              alt="profile"
            />
            <div className="flex flex-col gap-2 text-[#09182B]">
              <h1 className="font-semibold text-xl">
                {employee.name}{" "}
                <span className="text-[#3FC28A] text-lg">(Active)</span>
              </h1>
              <h1 className="flex items-center gap-1 font-light text-[16px]">
                <Handbag size={20} />
                <span>{employee.designation}</span>
              </h1>
              <h1 className="flex items-center gap-1 font-light text-[16px]">
                <TfiEmail size={20} />
                <span>{employee.personalInfo?.email || "N/A"}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={handleExport}
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
          renderRow={(record) => [
            record.date,
            record.basicSalary,
            record.deductions,
            record.bonus,
            <span className="font-semibold">{record.total}</span>,
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

export default ViewPayroll;
