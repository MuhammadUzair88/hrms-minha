// src/pages/Events/Event.jsx
import React, { useState } from "react";
import { events } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";

const Event = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Updated columns — Removed "Select" & "Action"
  const columns = ["Date", "Day", "Event", "Description"];

  const rowsPerPage = 7;
  const totalPages = Math.ceil(events.length / rowsPerPage);
  const paginatedData = events.slice(
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
          renderRow={(event) => [
            event.date,
            event.day,
            <span className="font-medium">{event.name}</span>,
            event.description || "-",
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

export default Event;
