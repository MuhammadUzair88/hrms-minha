import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
} from "lucide-react";
import { dummyEmployees } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import FilterModal from "../../components/employee/FilterModal";
import { useToggle } from "../../context/Toggle";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import FilterButton from "../../components/FilterButton";
import Table from "../../components/Table";
import ToggleButton from "../../components/ToggleButton";
import Pagination from "../../components/Pagination";
import ActionMenu from "../../components/ActionMenu"; // ✅ Import ActionMenu

const EmployeeManagement = () => {
  const [OpenFilter, setOpenFilter] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Action-Menu Items
  const employeeActions = [
    {
      title: "View",
      icon: Eye,
      onClick: (emp) => navigate(`/viewemployee/${emp.id}`),
    },
    {
      title: "Edit",
      icon: Edit,
      onClick: (emp) => navigate(`/editemployee/${emp.id}`),
    },
    {
      title: "Delete",
      icon: Trash2,
      onClick: (emp) => console.log("Delete", emp.id),
    },
    {
      title: "Export",
      icon: Upload,
      onClick: (emp) => console.log("Export", emp.id),
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter employees
  const filteredEmployees = dummyEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    "Select",
    "Employee Name",
    "Employee ID",
    "Department",
    "Designation",
    "Type",
    "Status",
    "Action",
  ];

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedData = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ CSV EXPORT FUNCTION (NEW)
  const handleExportCSV = () => {
    const headers = [
      "Employee Name",
      "Employee ID",
      "Department",
      "Designation",
      "Type",
      "Status",
    ];

    const rows = paginatedData.map((emp) => [
      emp.name,
      emp.employeeId,
      emp.department,
      emp.designation,
      emp.type,
      emp.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees_page.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1>Employee Management</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <Button
          label="New Employees"
          icon={PlusCircle}
          onClick={() => navigate("/addemployee")}
        />

        <div className="flex items-center gap-2">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="relative">
            <FilterButton
              isOpen={OpenFilter}
              onClick={() => setOpenFilter(!OpenFilter)}
            />
            {OpenFilter && <FilterModal />}
          </div>

          {/* ✅ Export Button Updated */}
          <Button label="Export" icon={Download} onClick={handleExportCSV} />
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(emp) => [
            <input type="checkbox" className="w-4 h-4" />,
            <span className="font-medium">{emp.name}</span>,
            emp.employeeId,
            emp.department,
            emp.designation,
            emp.type,
            <span className="bg-[#00B172] text-white px-3 py-1 rounded-md text-sm w-28 flex items-center justify-center">
              {emp.status}
            </span>,

            <ActionMenu
              emp={emp}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={employeeActions}
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

export default EmployeeManagement;
