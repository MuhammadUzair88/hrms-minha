// ✅ InternManagement.jsx
import React, { useState, useEffect } from "react";
import Cards from "../../components/Interns/Cards";
import {
  Calendar,
  Award,
  LineChart,
  DollarSign,
  Download,
  Edit,
  Trash2,
} from "lucide-react";
import { CgAdd, CgProfile } from "react-icons/cg";
import { useToggle } from "../../context/Toggle";
import { dummyInterns } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import AddIntern from "../../components/Interns/AddIntern";
import Table from "./../../components/Table";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";
import ActionMenu from "./../../components/ActionMenu";

const InternManagement = () => {
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const [openAddModal, setOpenAddModal] = useState(false);

  // ActionMenu
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyInterns.length / rowsPerPage);

  const paginatedData = dummyInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    "Select",
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Action",
  ];

  const internActions = [
    {
      title: "Edit",
      icon: Edit,
      onClick: (intern) => navigate(`/edit-intern/${intern.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (intern) => console.log("Delete intern", intern.id),
    },
  ];

  // ------------------------------------------------------
  // ✅ EXPORT FUNCTIONALITY (EXPORT ALL INTERNS AS CSV)
  // ------------------------------------------------------
  const handleExport = () => {
    const data = dummyInterns;

    const csvHeader = [
      "Start Date",
      "Intern Name",
      "Department",
      "Duration",
      "Type",
    ].join(",");

    const csvRows = data
      .map((item) =>
        [
          item.startDate,
          item.internName,
          item.department,
          item.duration,
          item.type,
        ].join(",")
      )
      .join("\n");

    const csvContent = csvHeader + "\n" + csvRows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Interns_List.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-4 font-semibold text-2xl tracking-tight">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Intern Management</h1>
        </div>
      </div>

      {/* Top Cards */}
      <div className="flex items-center gap-[37px] px-[39px] pt-[26px]">
        <Cards
          icon={<Calendar size={32} />}
          title="Interns Attendance"
          onClick={() => navigate("/intern-attendence")}
        />
        <Cards
          icon={<CgProfile size={32} />}
          title="Interns Profile"
          onClick={() => navigate("/intern-profile")}
        />
        <Cards
          icon={<Award size={32} />}
          title="Interns Certificate"
          onClick={() => navigate("/intern-certificate")}
        />
        <Cards
          icon={<LineChart size={32} />}
          title="Interns Performance"
          onClick={() => navigate("/intern-performance-review")}
        />
      </div>

      {/* Toolbar */}
      <div className="px-[39px] pt-[26px] flex items-center justify-between">
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-2 border-[#0E9EE7] pb-1">
          <DollarSign size={20} />
          Interns Details
        </button>

        <div className="flex items-center gap-3">
          <SearchBar />
          <Button
            icon={CgAdd}
            label={"New Intern"}
            onClick={() => setOpenAddModal(true)}
          />
          {/* 🔽 ADDED EXPORT HANDLER */}
          <Button icon={Download} label={"Export"} onClick={handleExport} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(intern) => [
            <input type="checkbox" className="w-4 h-4" />,
            intern.startDate,
            intern.internName,
            <span className="font-medium">{intern.department}</span>,
            intern.duration,
            intern.type,
            <ActionMenu
              emp={intern}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={internActions}
            />,
          ]}
        />
      </div>

      {/* Add Intern Modal */}
      {openAddModal && (
        <div className="inset-0 z-50 w-full h-full flex justify-center items-center mx-auto">
          <AddIntern setOpenAddModal={setOpenAddModal} />
        </div>
      )}

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

export default InternManagement;
