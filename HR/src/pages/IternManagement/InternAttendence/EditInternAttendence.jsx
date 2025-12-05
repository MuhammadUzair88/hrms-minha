// src/pages/Attendance/EditAttendence.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  dummyInterns,
  dummyInternAttendanceRecords,
} from "../../../assets/assets";
import { format } from "date-fns";
import Table from "../../../components/Table";

const EditInternAttendence = () => {
  const [intern, setIntern] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getInternData = () => {
      const selectedIntern = dummyInterns.find((e) => e.id === parseInt(id));

      if (selectedIntern) {
        setIntern(selectedIntern);

        // ✅ Match records using internId instead of employeeId
        const records = dummyInternAttendanceRecords.records.filter(
          (att) => att.internId === selectedIntern.professionalInfo.employeeId
        );
        setAttendance(records);
      }
    };

    getInternData();
  }, [id]);

  // ✅ Table columns
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
    "Action",
  ];

  // ✅ Render each row (array of cells, same as InternAttendanceManagement)
  const renderRow = (att) => {
    const isLate = att.status === "Late";
    const isAbsent = att.status === "Absent";
    const statusLabel = isAbsent ? "Absent" : isLate ? "Late" : "On Time";
    const statusColor = isAbsent
      ? "bg-gray-500"
      : isLate
      ? "bg-red-600"
      : "bg-green-500";

    return [
      // Select
      <input type="checkbox" className="w-4 h-4" />,

      // Date
      format(new Date(att.date), "yy-MM-dd"),

      // Comments
      att.comments || "----------",

      // Times
      att.timeIn || "-",
      att.timeOut || "-",
      att.breakTime || "-",
      att.idleTime || "-",
      att.workHours || "-",

      // Status
      <span
        className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap inline-block text-center ${statusColor}`}
      >
        {statusLabel}
      </span>,

      // Action (Save button)
      <button className="px-3 py-1 rounded bg-[#0E9EE7] text-white text-sm">
        Save
      </button>,
    ];
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/intern-attendence")}
          className="cursor-pointer"
        />
        <h1>Edit Attendance</h1>
      </div>

      {/* Intern Info */}
      <div className="px-[39px] pt-[26px] flex items-center">
        <img
          src={intern?.image || "/default-avatar.png"}
          className="w-[60px] h-[60px] rounded-full object-cover"
          alt={intern?.internName}
        />
        <div className="flex flex-col ml-3">
          <h2 className="font-medium text-lg">{intern?.internName}</h2>
          <p className="text-sm text-gray-500">{intern?.designation}</p>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={attendance} renderRow={renderRow} />
      </div>
    </div>
  );
};

export default EditInternAttendence;
