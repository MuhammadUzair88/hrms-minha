// src/pages/Tasks/ViewAssign.jsx
import React, { useEffect, useState } from "react";
import { ViewAssignTask, dummyEmployees } from "../../assets/assets";
import { Delete, Eye, Flag, Pencil } from "lucide-react";
import Table from "../../components/Table";
import Pagination from "./../../components/Pagination";
import { useNavigate } from "react-router-dom";
import ActionMenu from "../../components/ActionMenu";

const ViewAssign = () => {
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const openModal = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDescription("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(ViewAssignTask.length / rowsPerPage);
  const paginatedData = ViewAssignTask.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ⭐ FIXED FUNCTION — supports string & array
  const getEmployeesByIds = (ids) => {
    if (!ids) return [];

    // If assignedTo is "EMP002, EMP003"
    const idArray = Array.isArray(ids)
      ? ids
      : ids.split(",").map((id) => id.trim());

    return idArray
      .map((id) => dummyEmployees.find((emp) => emp.employeeId === id))
      .filter(Boolean);
  };

  const handleStatusClick = (task) => {
    console.log("Clicked task:", task);
  };

  const columns = [
    "Select",
    "Task Title",
    "Description",
    "Deadline",
    "Priority",
    "Assign",
    "Status",
    "Action",
  ];

  const navigate = useNavigate();

  const AssignActions = [
    {
      title: "View",
      icon: Eye,
      onClick: (task) => navigate(`/view-task/${task.id}`),
    },
    {
      title: "Edit",
      icon: Pencil,
      onClick: (task) => navigate(`/edit-task/${task.id}`),
    },
    {
      title: "Delete",
      icon: Delete,
      onClick: (task) => navigate(`/assign/${task.id}`),
    },
  ];

  return (
    <div className="bg-white w-full flex flex-col">
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src="/notifi.png"
            alt=""
          />
          <h1>View Assign</h1>
        </div>
      </div>
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(task) => [
            <input type="checkbox" className="w-4 h-4" />,
            <span className="font-medium">{task.title}</span>,
            <div>
              <p className="truncate">
                {task.description.slice(0, 20)}...
                <span
                  onClick={() => openModal(task.description)}
                  className="text-[#0E9EE7] cursor-pointer"
                >
                  (more)
                </span>
              </p>
            </div>,
            task.deadline,
            <div className="flex items-center gap-2">
              <Flag
                size={18}
                className={
                  task.priority === "High" ? "text-[#F45B69]" : "text-[#0E9EE7]"
                }
                fill={task.priority === "High" ? "red" : "blue"}
              />
              {task.priority}
            </div>,

            // ⭐ FIXED employee images
            <div className="flex -space-x-2 min-w-[120px]">
              {getEmployeesByIds(task.assignedTo).map((emp, idx) => (
                <img
                  key={idx}
                  src={emp.image}
                  alt={emp.name}
                  title={emp.name}
                  className="w-7 h-7 rounded-full border-2 border-white"
                />
              ))}
            </div>,

            <button
              onClick={() => handleStatusClick(task)}
              className={`px-3 py-1 rounded-md text-sm text-white w-28 flex justify-center items-center ${
                task.status === "In Progress"
                  ? "bg-[#0E9EE7]"
                  : task.status === "Completed"
                  ? "bg-[#00B172]"
                  : "bg-gray-500"
              }`}
            >
              {task.status}
            </button>,

            <ActionMenu
              emp={task}
              openActionMenu={openActionMenu}
              setOpenActionMenu={setOpenActionMenu}
              actions={AssignActions}
            />,
          ]}
        />
      </div>

      {/* Description Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-4">{selectedDescription}</p>
            <div className="text-right">
              <button
                onClick={closeModal}
                className="bg-[#0E9EE7] text-white py-2 px-6 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

export default ViewAssign;
