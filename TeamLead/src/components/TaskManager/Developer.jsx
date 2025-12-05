// src/pages/Tasks/Designer.jsx
import React, { useState } from "react";
import { dummyTasks, dummyEmployees } from "../../assets/assets";
import { Flag } from "lucide-react";
import Table from "../../components/Table";
import Pagination from "../Pagination";

const Developer = () => {
  const [selectedDescription, setSelectedDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Helper: Get employee details by IDs
  const getEmployeesByIds = (ids) => {
    return ids.map((id) => dummyEmployees.find((emp) => emp.employeeId === id));
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
    "Assigned To",
    "Status",
  ];

  return (
    <div className="bg-white w-full  flex flex-col ">
      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={paginatedData}
          renderRow={(task) => [
            <input type="checkbox" className="w-4 h-4" />,
            <span className="font-medium">{task.title}</span>,
            <div className="">
              <p className="truncate">
                This App packs Your{" "}
                <span
                  onClick={() => openModal(task.description)}
                  className="text-[#0E9EE7] cursor-pointer"
                >
                  (more)
                </span>
              </p>
            </div>,
            task.deadline,
            <div className="flex items-center gap-2 ">
              <Flag
                size={18}
                className={
                  task.priority === "High" ? "text-[#F45B69]" : "text-[#0E9EE7]"
                }
                fill={task.priority === "High" ? "red" : "blue"}
              />
              {task.priority}
            </div>,
            <div className="flex -space-x-2 min-w-[120px]">
              {getEmployeesByIds(task.assignedTo).map(
                (emp, idx) =>
                  emp && (
                    <img
                      key={idx}
                      src={emp.image}
                      alt={emp.name}
                      title={emp.name}
                      className="w-7 h-7 rounded-full border-2 border-white"
                    />
                  )
              )}
            </div>,
            <button
              onClick={() => handleStatusClick(task)}
              className={`px-3 py-1 rounded-md text-sm text-white whitespace-nowrap  text-center cursor-pointer flex justify-center items-center w-20 ${
                task.status === "In Progress"
                  ? "bg-[#0E9EE7] hover:bg-sky-600"
                  : task.status === "Completed"
                  ? "bg-[#00B172] hover:bg-green-600"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {task.status}
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

export default Developer;
