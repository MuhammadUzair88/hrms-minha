import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { CgAdd } from "react-icons/cg";
import FilterButton from "../../../components/FilterButton";
import { Download, Edit, Eye, Trash2, Upload } from "lucide-react";
import { dummyInterns } from "../../../assets/assets";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import ActionMenu from "../../../components/ActionMenu";

const InternsProfile = () => {
  const navigate = useNavigate();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Table columns
  const columns = [
    "Select",
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Status",
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
      onClick: (emp) => navigate(`/intern-profile/view/${emp.id}`),
    },
    {
      title: "Edit",
      icon: Edit,
      onClick: (emp) => navigate(`/intern-profile/edit/${emp.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (emp) => console.log("Delete", emp),
    },
  ];

  // ✅ Export Function (same as other components)
  const handleExport = () => {
    const csvHeader = [
      "Start Date",
      "Intern Name",
      "Department",
      "Duration",
      "Type",
      "Status",
    ].join(",");

    const csvRows = dummyInterns
      .map((att) =>
        [
          att.startDate,
          att.internName,
          att.department,
          att.duration,
          att.type,
          "Intern",
        ].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `InternsProfile.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Intern Management</h1>
      </div>

      {/* Top bar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        <Button
          label={"New Intern"}
          icon={CgAdd}
          onClick={() => navigate("/intern-profile/add")}
        />
        <div className="flex items-center gap-3">
          <FilterButton />
          <Button label={"Export"} icon={Download} onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(att) => [
            <input type="checkbox" className="w-4 h-4" />,
            att.startDate,
            <span className="font-medium">{att.internName}</span>,
            <span className="font-medium">{att.department}</span>,
            att.duration,
            att.type,
            <span className="bg-[#00B172] px-3 py-1 rounded-sm text-white text-sm font-medium">
              Intern
            </span>,
            <ActionMenu
              emp={att}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={actions}
            />,
          ]}
        />
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

export default InternsProfile;
