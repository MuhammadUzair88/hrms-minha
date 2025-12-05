// src/pages/Meetings/Meeting.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { meetings } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../Pagination";
import ActionMenu from "../../ActionMenu";

const Meeting = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const columns = [
    "Select",
    "Date",
    "Day",
    "Meeting Purpose",
    "Time",
    "Department",
    "Employee Names",
    "Description",
    "Action",
  ];

  // Dynamic ActionMenu items for meetings
  const meetingActions = [
    {
      title: "Edit",
      icon: Edit,
      onClick: (meeting) => navigate(`/edit-meeting/${meeting.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (meeting) => console.log("Delete meeting", meeting.id),
    },
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
            <input type="checkbox" className="w-4 h-4" />,
            meeting.date,
            meeting.day,
            <span className="font-medium">{meeting.title}</span>,
            meeting.time,
            meeting.department,
            meeting.employees.join(", "),
            meeting.description || "-",
            <ActionMenu
              emp={meeting}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={meetingActions}
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

export default Meeting;
