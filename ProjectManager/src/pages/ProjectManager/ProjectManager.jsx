// src/pages/Tasks/TeamLead.jsx
import React, { useEffect, useState } from "react";
import { dummyEmployees, TeamLeadDummyTask } from "../../assets/assets";
import { Download, Flag, Pencil } from "lucide-react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useToggle } from "../../context/Toggle";
import ToggleButton from "../../components/ToggleButton";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ActionMenu from "../../components/ActionMenu";

const ProjectManager = () => {
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const Navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // -----------------------
  // Modal Handling
  // -----------------------
  const openModal = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDescription("");
  };

  // -----------------------
  // Close Action Menu on outside click
  // -----------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // -----------------------
  // Pagination
  // -----------------------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(TeamLeadDummyTask.length / rowsPerPage);

  const paginatedData = TeamLeadDummyTask.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // -----------------------
  // Helper
  // -----------------------
  const getEmployeeById = (id) =>
    dummyEmployees.find((emp) => emp.employeeId === id);

  // -----------------------
  // Table Columns
  // -----------------------
  const columns = [
    "Select",
    "Deadline",
    "Description",
    "Task Title",
    "Priority",
    "Assigned By",
    "Status",
    "Action",
  ];

  // -----------------------
  // Actions for Team Lead
  // -----------------------
  const TeamActions = [
    {
      title: "Assign",
      icon: Pencil,
      onClick: (task) => Navigate(`/assign/${task.id}`),
    },
  ];

  return (
    <div className="bg-white w-full flex flex-col">
      {/* HEADER */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton checked={isSidebarOpen} onChange={toggleSidebar} />
          <h1 className="text-[#09182B]">Project Manager</h1>
        </div>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-[39px] py-[26px]">
        <Button
          onClick={() => Navigate("/check-performance")}
          label={"Check Performance"}
        />

        <div className="flex items-center gap-2">
          <Button
            onClick={() => Navigate("/view-assign")}
            label={"Assign View"}
          />
          <Button
            onClick={() => console.log("Exporting...")}
            label={"Export"}
            icon={Download}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(task) => {
            const assignedBy = getEmployeeById(task.assignBy);

            return [
              <input type="checkbox" className="w-4 h-4" />,

              // Deadline
              <span className="font-medium">{task.deadline}</span>,

              // Description
              <div>
                <p className="truncate">
                  {task.description.slice(0, 25)}...
                  <span
                    onClick={() => openModal(task.description)}
                    className="text-[#0E9EE7] cursor-pointer"
                  >
                    (more)
                  </span>
                </p>
              </div>,

              // Task Title
              task.title,

              // Priority
              <div className="flex items-center gap-2">
                <Flag
                  size={18}
                  className={
                    task.priority === "High"
                      ? "text-[#F45B69]"
                      : "text-[#0E9EE7]"
                  }
                  fill={task.priority === "High" ? "red" : "blue"}
                />
                {task.priority}
              </div>,

              // Assigned By
              <div className="flex items-center gap-2">
                {assignedBy && (
                  <>
                    <img
                      src={assignedBy.image}
                      alt={assignedBy.name}
                      title={assignedBy.name}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <span className="font-medium">{assignedBy.name}</span>
                  </>
                )}
              </div>,

              // Status
              <span
                className={`px-3 py-1 text-white rounded-md text-sm w-28 flex justify-center items-center 
                  ${
                    task.status === "In Progress"
                      ? "bg-[#0E9EE7]"
                      : task.status === "Completed"
                      ? "bg-[#00B172]"
                      : "bg-gray-500"
                  }`}
              >
                {task.status}
              </span>,

              // ACTION MENU
              <ActionMenu
                emp={task}
                openActionMenu={openActionMenu}
                setOpenActionMenu={setOpenActionMenu}
                actions={TeamActions}
              />,
            ];
          }}
        />
      </div>

      {/* DESCRIPTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-4">{selectedDescription}</p>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-[#0E9EE7] hover:bg-sky-600 text-white py-2 px-6 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGINATION */}
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

export default ProjectManager;
