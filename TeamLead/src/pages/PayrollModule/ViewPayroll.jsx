import React, { useEffect, useState } from "react";
import { dummyEmployees, dummyPayrollData } from "../../assets/assets";
import { Download, Handbag } from "lucide-react";
import { TfiEmail } from "react-icons/tfi";
import { useToggle } from "../../context/Toggle";
import ToggleButton from "../../components/ToggleButton";

const ViewPayroll = () => {
  const [employee, setEmployee] = useState(null);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const { toggleSidebar, isSidebarOpen } = useToggle();

  useEffect(() => {
    const emp = dummyEmployees.find((e) => e.employeeId === "EMP004");
    if (emp) {
      setEmployee(emp);
      const payrollData = dummyPayrollData.find(
        (p) => p.employeeId === emp.employeeId
      );
      setPayrollRecords(payrollData?.records || []);
    }
  }, []);

  if (!employee) return <div>Loading...</div>;

  // ✅ Export payroll records as CSV
  const exportPayroll = () => {
    if (!payrollRecords.length) return;

    const headers = ["Date", "Basic Salary", "Deductions", "Bonus", "Total"];
    const csvRows = payrollRecords
      .map((r) =>
        [r.date, r.basicSalary, r.deductions, r.bonus, r.total].join(",")
      )
      .join("\n");

    const csvContent = headers.join(",") + "\n" + csvRows;
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
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">PayRoll</h1>
        </div>
      </div>

      {/* Employee Info */}
      <div className="px-[39px] pt-[26px] w-full flex items-center justify-between">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={employee.image || "/default-avatar.png"}
              className="w-[90px] h-[90px] object-cover rounded-lg"
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
            onClick={exportPayroll}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      {/* Payroll Input Fields */}
      <div className="px-[58px] pt-[26px]">
        <div className="bg-[#E3E3E3]/15 shadow rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-[39px] py-[26px]">
            <div className="flex flex-col">
              <label className="font-medium text-[#09182B]">Employee ID</label>
              <input
                value={employee.employeeId}
                readOnly
                className="border border-[#09182B] bg-white rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-[#09182B]">Fixed Salary</label>
              <input
                value={payrollRecords[0]?.basicSalary || ""}
                className="border rounded-lg px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-[#09182B]">Deduction</label>
              <input
                value={payrollRecords[0]?.deductions || ""}
                className="border rounded-lg px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-[#09182B]">Bonus</label>
              <input
                value={payrollRecords[0]?.bonus || ""}
                className="border rounded-lg px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium text-[#09182B]">Total Salary</label>
              <input
                value={payrollRecords[0]?.total || ""}
                className="w-[49%] border rounded-lg px-3 py-2 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayroll;
