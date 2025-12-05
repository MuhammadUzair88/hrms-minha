// src/pages/Tasks/Designer.jsx
import React, { useState, useEffect } from "react";
import { dummyTasks, dummyEmployees } from "../../assets/assets";
import { Eye, Flag, MoreVertical, Pencil } from "lucide-react";
import Table from "../../components/Table";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

const Designer = () => {
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null); // dropdown state
  const navigate = useNavigate();

  // Modal handlers
  const openModal = (description) => {
    setSelectedDescription(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDescription("");
  };

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(dummyTasks.length / rowsPerPage);

  const paginatedData = dummyTasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Fetch employee
  const getEmployee = (id) => dummyEmployees.find((e) => e.employeeId === id);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-dropdown")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Actions inside dropdown (same structure as EmployeeManagement)
  const employeeActions = [
    {
      title: "Edit",
      icon: Pencil,
      onClick: (task) => navigate(`/task-management/editproject/${task.id}`),
    },
  ];

  const columns = [
    "Deadline",
    "Description",
    "Task Title",
    "Priority",
    "Assign By",
    "Assign To",
    "Status",
    "Task Board",
  ];

  return (
    <div className="bg-white w-full flex flex-col">
      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(task) => [
            task.deadline,

            // DESCRIPTION
            <p className="truncate">
              {task.description.substring(0, 20)}{" "}
              <span
                onClick={() => openModal(task.description)}
                className="text-[#0E9EE7] cursor-pointer"
              >
                (more)
              </span>
            </p>,

            // TITLE
            <span className="font-medium">{task.title}</span>,

            // PRIORITY
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

            // ASSIGN BY
            <div className="flex items-center">
              {getEmployee(task.assignBy) && (
                <img
                  src={getEmployee(task.assignBy).image}
                  alt={getEmployee(task.assignBy).name}
                  title={getEmployee(task.assignBy).name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              )}
            </div>,

            // ASSIGN TO
            <div className="flex items-center">
              {getEmployee(task.assignedTo) && (
                <img
                  src={getEmployee(task.assignedTo).image}
                  alt={getEmployee(task.assignedTo).name}
                  title={getEmployee(task.assignedTo).name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              )}
            </div>,

            <button
              className={` rounded-md text-sm text-white whitespace-nowrap  text-center cursor-pointer flex justify-center items-center w-24 py-1 ${
                task.status === "In Progress"
                  ? "bg-[#0E9EE7] hover:bg-sky-600"
                  : task.status === "Completed"
                  ? "bg-[#00B172] hover:bg-green-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {task.status}
            </button>,
            <button
              onClick={() => navigate("/task-management/task-status")}
              className="rounded-md text-sm text-white whitespace-nowrap  text-center cursor-pointer flex justify-center items-center w-28 py-1 bg-[#0E9EE7] hover:bg-sky-600  gap-2"
            >
              <FaTasks />
              <h1>Task Status</h1>
            </button>,
          ]}
        />
      </div>

      {/* Modal */}
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

export default Designer;
