// InternManagement.jsx
import React, { useState } from "react";
import Cards from "../../components/Interns/Cards";
import { Calendar, Award, LineChart, DollarSign } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { useToggle } from "../../context/Toggle";
import { dummyInterns } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import Table from "./../../components/Table";
import SearchBar from "../../components/SearchBar";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";

const InternManagement = () => {
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyInterns.length / rowsPerPage);
  const paginatedData = dummyInterns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Removed: Select + Action
  const columns = [
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
  ];

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
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(intern) => [
            intern.startDate,
            intern.internName,
            <span className="font-medium">{intern.department}</span>,
            intern.duration,
            intern.type,
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

export default InternManagement;
