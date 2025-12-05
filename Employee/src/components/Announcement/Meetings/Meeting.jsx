// src/pages/Meetings/Meeting.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { meetings } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";

const Meeting = () => {
  const navigate = useNavigate();

  const columns = [
    // ❌ removed Select
    "Date",
    "Day",
    "Meeting Purpose",
    "Time",
    "Department",
    "Employee Names",
    "Description",
    // ❌ removed Action
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(meetings.length / rowsPerPage);
  const paginatedData = meetings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(meeting) => [
            // ❌ removed checkbox
            meeting.date,
            meeting.day,
            <span className="font-medium">{meeting.title}</span>,
            meeting.time,
            meeting.department,
            meeting.employees.join(", "),
            meeting.description || "-",
            // ❌ removed ActionMenu
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

export default Meeting;
