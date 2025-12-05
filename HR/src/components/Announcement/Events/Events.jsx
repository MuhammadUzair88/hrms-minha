// src/pages/Events/Event.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { events } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";
import ActionMenu from "../../ActionMenu";

const Event = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const columns = ["Select", "Date", "Day", "Event", "Description", "Action"];

  // Dynamic ActionMenu items for events
  const eventActions = [
    {
      title: "Edit",
      icon: Edit,
      onClick: (event) => navigate(`/edit-event/${event.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (event) => console.log("Delete event", event.id),
    },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
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
            <input type="checkbox" className="w-4 h-4" />,
            event.date,
            event.day,
            <span className="font-medium">{event.name}</span>,
            event.description || "-",
            <ActionMenu
              emp={event}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={eventActions}
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

export default Event;
