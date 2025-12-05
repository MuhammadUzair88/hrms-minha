import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { CalendarDays, Eye, Edit, Trash2, Upload } from "lucide-react";
import { dummyAttendanceRecords, dummyEmployees } from "../../assets/assets";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import StatCard from "../../components/Attendence/StatCard";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import ActionMenu from "../../components/ActionMenu";

const ViewAttendence = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

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
    const emp = dummyEmployees.find((e) => e.id === parseInt(id));
    if (emp) {
      setEmployee(emp);
      const records = dummyAttendanceRecords.records.filter(
        (att) => att.employeeId === emp.employeeId
      );
      setAttendance(records);
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const attendanceActions = [
    {
      title: "Edit",
      icon: Edit,
      onClick: (att) => navigate(`/edit-attendance/${att.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (att) => console.log("Delete", att.id),
    },
    {
      title: "Export",
      icon: Upload,
      onClick: (att) => console.log("Export", att.id),
    },
  ];

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

  // CSV EXPORT
  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Comments",
      "Check In",
      "Check Out",
      "Break",
      "Idle Time",
      "Work Hours",
      "Status",
    ];

    const rows = paginatedData.map((att) => [
      format(new Date(att.date), "yy-MM-dd"),
      att.comments || "----------",
      att.timeIn || "-",
      att.timeOut || "-",
      att.breakTime || "-",
      att.idleTime || "-",
      att.workHours || "-",
      att.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${employee?.name}_attendance_page.csv`);
    document.body.appendChild(link);
    link.click();
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
        <h1>Attendance</h1>
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

        {/* Date picker + export */}
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

          <Button label={"Export"} icon={Upload} onClick={handleExportCSV} />

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
            <input type="checkbox" className="w-4 h-4" />,
            format(new Date(att.date), "yy-MM-dd"),
            att.comments || "----------",
            att.timeIn || "-",
            att.timeOut || "-",
            att.breakTime || "-",
            att.idleTime || "-",
            att.workHours || "-",
            <span
              className={`text-sm text-white whitespace-nowrap text-center px-3 py-1 rounded-md w-20 flex items-center justify-center ${
                att.status === "Late" ? "bg-[#EB0016]" : "bg-[#00B172]"
              }`}
            >
              {att.status}
            </span>,
            <ActionMenu
              emp={att}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={attendanceActions}
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

export default ViewAttendence;
