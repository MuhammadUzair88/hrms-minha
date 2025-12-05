import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";

import Table from "./../../components/Table";

const ExportAttendence = () => {
  const { id } = useParams();
  const employee = dummyEmployees.find((emp) => emp.id === Number(id));
  const name = employee?.name;

  const attendance = dummyAttendanceRecords.records.filter(
    (record) => record.employeeId === employee?.employeeId
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log(name);
  }, [name]);

  // ✅ Define table columns
  const columns = [
    "Date",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Late Time",
    "Bonus",
    "Deduction",
    "Status",
  ];

  // ✅ Define how each row should render
  const renderRow = (att) => (
    <>
      <div>{att.date || "-"}</div>
      <div>{att.timeIn || "-"}</div>
      <div>{att.timeOut || "-"}</div>
      <div>{att.breakTime || "-"}</div>
      <div>{att.idleTime || "-"}</div>
      <div>{att.workHours || "-"}</div>
      <div>-</div> {/* Late Time placeholder */}
      <div>-</div> {/* Bonus placeholder */}
      <div>-</div> {/* Deduction placeholder */}
      <div>{att.status || "-"}</div>
    </>
  );

  return (
    <div>
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/attendance")}
          className="cursor-pointer"
        />
        <h1>{name} Attendance</h1>
      </div>

      {/* ✅ Table */}
      <div className="px-[39px] pt-[26px]">
        {attendance.length > 0 ? (
          <Table columns={columns} data={attendance} renderRow={renderRow} />
        ) : (
          <div className="text-center col-span-10 py-6 text-gray-500">
            No attendance records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportAttendence;
