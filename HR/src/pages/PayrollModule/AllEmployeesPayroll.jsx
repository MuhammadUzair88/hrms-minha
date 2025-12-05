import React, { useEffect, useState } from "react";
import AllEmployeesCard from "../../components/Attendence/AllEmployeesCard";
import { useNavigate } from "react-router-dom";

// Import dummy data
import { dummyEmployees, dummyPayrollData } from "../../assets/assets";
import EmployeeCardPayroll from "../../components/payroll/EmployeeCardPayroll";

const AllEmployeesPayroll = () => {
  const [employeesWithPayroll, setEmployeesWithPayroll] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = () => {
      // Merge payroll data with employee details
      const merged = dummyPayrollData.map((record) => {
        const employee = dummyEmployees.find(
          (emp) => emp.employeeId === record.employeeId
        );
        return {
          ...record,
          image: employee?.image || "",
          name: employee?.name || record.name, // fallback
        };
      });

      setEmployeesWithPayroll(merged);
    };

    getEmployees();
  }, []);

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
        <h1>All Employees</h1>
      </div>

      {/* Employee Grid */}
      <div className="flex justify-center w-full px-[39px] pt-[26px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {employeesWithPayroll.map((emp) => (
            <EmployeeCardPayroll
              key={emp.id}
              id={emp.id}
              name={emp.name}
              image={emp.image}
              status={emp.status} // optional if you want to show Present/Late etc.
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEmployeesPayroll;
