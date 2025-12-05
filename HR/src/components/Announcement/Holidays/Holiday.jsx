// src/pages/Holidays/Holiday.jsx
import React, { useState } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { holidays } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../../context/Toggle";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";
import ActionMenu from "../../ActionMenu";

const Holiday = () => {
  const { toggleSidebar } = useToggle();
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const columns = [
    "Select",
    "Date",
    "Day",
    "Holiday Name",
    "Description",
    "Action",
  ];

  // Dynamic ActionMenu items
  const holiday = [
    {
      title: "Edit",
      icon: Edit,
      onClick: (att) => navigate(`/edit-holiday/${att.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (att) => console.log("Delete", att.id),
    },
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(holidays.length / rowsPerPage);
  const paginatedData = holidays.slice(
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
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4" />,
            att.date,
            att.day,
            <span className="font-medium">{att.name}</span>,
            att.description || "-",
            <ActionMenu
              emp={att}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={holiday}
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

export default Holiday;
