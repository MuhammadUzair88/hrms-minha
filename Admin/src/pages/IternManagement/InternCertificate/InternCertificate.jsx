// src/pages/Interns/InternCertificate.jsx
import React, { useState } from "react";
import { useToggle } from "../../../context/Toggle";
import {
  CalendarDays,
  Download,
  Edit,
  Trash2,
  Eye,
  Upload,
} from "lucide-react";
import { format } from "date-fns";
import { CgAdd } from "react-icons/cg";
import { dummyInterns } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import ToggleButton from "../../../components/ToggleButton";
import ActionMenu from "../../../components/ActionMenu"; // ✅ reusable dropdown
import DateRangeSelector from "../../../components/DateRangePicker";

const InternCertificate = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Table columns
  const columns = [
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Action",
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyInterns.length / rowsPerPage);
  const paginatedData = dummyInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Actions for ActionMenu
  const actions = [
    {
      title: "View",
      icon: Eye,
      onClick: (emp) => navigate(`/intern-certificate/view/${emp.id}`),
    },
  ];

  // ✅ RenderRow returns array of cells
  const renderRow = (att) => {
    return [
      att.startDate,
      att.internName,
      <span className="font-medium">{att.department}</span>,
      <span className="font-medium">{att.duration}</span>,
      att.type,
      <ActionMenu
        emp={att}
        openActionMenu={openActionMenu}
        setOpenActionMenu={setOpenActionMenu}
        actions={actions}
      />,
    ];
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Intern Certificate</h1>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <DateRangeSelector
          value={dateRange}
          onChange={(range) => setDateRange(range)}
          position="left"
        />

        <div className="flex items-center gap-2"></div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table columns={columns} data={paginatedData} renderRow={renderRow} />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[34px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InternCertificate;
