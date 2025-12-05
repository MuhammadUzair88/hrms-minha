import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { CalendarDays, Clock } from "lucide-react";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import StatCard from "../../components/Attendence/StatCard";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import ActionMenu from "../../components/ActionMenu";
import CheckInModal from "../../components/Attendence/CheckInModal";
import ToggleButton from "../../components/ToggleButton";
import { useToggle } from "../../context/Toggle";

const ViewAttendence = () => {
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(attendance.length / rowsPerPage);
  const paginatedData = attendance.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    // Fetch employee directly — NO ID from URL
    const emp = dummyEmployees.find((e) => e.employeeId === "EMP007");

    if (emp) {
      setEmployee(emp);

      const records = dummyAttendanceRecords.records.filter(
        (att) => att.employeeId === emp.employeeId
      );

      setAttendance(records);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ------------------
  //   CHECK-IN LOGIC
  // ------------------
  const handleCheckIn = () => {
    // Only open modal, DO NOT mark checkedIn yet
    setShowModal(true);
  };

  // CHECK-OUT LOGIC
  const handleCheckOut = () => {
    setCheckedIn(true); // now mark checked-in
    setCheckedOut(true); // mark checked-out
    setShowModal(false);
  };

  // Action menu items
  const attendanceActions = [];

  const columns = [
    "Date",
    "Comments",
    "Check In",
    "Check Out",
    "Break",
    "IDLE Time",
    "Work Hrs",
    "Status",
  ];
  const { toggleSidebar, isSidebarOpen } = useToggle();

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
          <h1 className="text-[#09182B]">Attendence</h1>
        </div>
      </div>

      {/* Top bar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={employee?.image || "/default-avatar.png"}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt={employee?.name}
          />
          <div className="flex flex-col">
            <h2 className="font-medium text-lg">{employee?.name}</h2>
            <p className="text-sm text-gray-500">{employee?.designation}</p>
          </div>
        </div>

        {/* Date Range + Check Buttons */}
        <div className="flex items-center gap-3 relative">
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

          {!checkedIn && !checkedOut ? (
            <Button
              label={"Check In 00h 00m 05s"}
              icon={Clock}
              onClick={handleCheckIn} // only opens modal
            />
          ) : (
            <Button
              label={"Check Out 08h 00m 05s"}
              icon={Clock}
              disabled={checkedOut}
              className={`${
                checkedOut
                  ? "bg-[#A2A1A8]/40 cursor-not-allowed"
                  : "bg-gray-500"
              } text-white`}
              onClick={handleCheckOut} // user manually clicks checkout
            />
          )}

          {showDatePicker && (
            <div className="absolute top-12 right-0 z-50 shadow-lg">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-[39px] pt-[26px] flex items-center gap-2">
        <StatCard
          title={"Absents"}
          value={dummyAttendanceRecords.summary.absents}
        />
        <StatCard
          title={"Leaves"}
          value={dummyAttendanceRecords.summary.leaves}
        />
        <StatCard
          title={"Late"}
          value={dummyAttendanceRecords.summary.lateHours}
        />
        <StatCard
          title={"Overtime Hours"}
          value={dummyAttendanceRecords.summary.overtimeHours}
        />
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            format(new Date(att.date), "yy-MM-dd"),
            att.comments || "----------",
            att.timeIn || "-",
            att.timeOut || "-",
            att.breakTime || "-",
            att.idleTime || "-",
            att.workHours || "-",

            // FIXED THE SYNTAX ERROR HERE
            <span
              className={`text-sm text-white whitespace-nowrap text-center px-3 py-1 rounded-md w-20 flex items-center justify-center ${
                att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
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

      {/* MODAL */}
      {showModal && (
        <CheckInModal
          onClose={() => setShowModal(false)}
          onCheckout={handleCheckOut}
        />
      )}
    </div>
  );
};

export default ViewAttendence;
