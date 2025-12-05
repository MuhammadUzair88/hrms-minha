// src/pages/Attendance/EditAttendence.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";
import { format } from "date-fns";
import Table from "../../components/Table";

const EditAttendence = () => {
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEmployeesData = () => {
      const emp = dummyEmployees.find((e) => e.id === parseInt(id));

      if (emp) {
        setEmployee(emp);

        const records = dummyAttendanceRecords.records.filter(
          (att) => att.employeeId === emp.employeeId
        );
        setAttendance(records);
      }
    };

    getEmployeesData();
  }, [id]);

  // ✅ Same columns as AttendanceManagement (without Employee Name)
  const columns = [
    "Select",
    "Date",
    "Comments",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Status",
    "Save",
  ];

  const handleSave = (att) => {
    alert(`Saved changes for record ID: ${att.id}`);
    // later you can update backend or state here
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/attendance")}
          className="cursor-pointer"
        />
        <h1>Edit Attendance</h1>
      </div>

      {/* Employee Info */}
      <div className="px-[39px] pt-[26px] flex items-center">
        <img
          src={employee?.image || "/default-avatar.png"}
          className="w-[60px] h-[60px] rounded-full object-cover"
          alt={employee?.name}
        />
        <div className="flex flex-col ml-3">
          <h2 className="font-medium text-lg">{employee?.name}</h2>
          <p className="text-sm text-gray-500">{employee?.designation}</p>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={attendance}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4" />,
            format(new Date(att.date), "yy-MM-dd"),
            att.comments || "----------",
            att.timeIn || "-",
            att.timeOut || "-",
            att.breakTime || "-",
            att.idleTime || "-",
            att.workHours || "-",
            <span
              key={`status-${att.id}`}
              className={` text-sm text-white whitespace-nowrap  text-center  px-3 py-1 rounded-md  w-20 flex items-center justify-center ${
                att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
              }`}
            >
              {att.status}
            </span>,
            <button
              key={`save-${att.id}`}
              onClick={() => handleSave(att)}
              className="  bg-[#0E9EE7] text-sm text-white whitespace-nowrap  text-center  px-3 py-1 rounded-md  w-20 flex items-center justify-center "
            >
              Save
            </button>,
          ]}
        />
      </div>
    </div>
  );
};

export default EditAttendence;
