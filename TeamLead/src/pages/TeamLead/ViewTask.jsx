// src/pages/Tasks/Assign.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";
import { useToggle } from "../../context/Toggle";
import { ViewAssignTask, dummyEmployees } from "../../assets/assets";

const ViewTask = () => {
  const { id } = useParams();
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // -----------------------------
  // Fetch Task By ID
  // -----------------------------
  const task = ViewAssignTask.find((t) => t.id === Number(id));

  // -----------------------------
  // Convert Assigned Employee IDs → Names
  // -----------------------------
  const getAssignedEmployeeNames = (idsString) => {
    if (!idsString) return "";

    const ids = idsString.split(",").map((id) => id.trim());

    return ids
      .map((id) => {
        const emp = dummyEmployees.find(
          (emp) => String(emp.employeeId) === String(id)
        );
        return emp?.name;
      })
      .filter(Boolean)
      .join(", ");
  };

  // -----------------------------
  // States
  // -----------------------------
  const [projectTitle, setProjectTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [apkLink, setApkLink] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [notify, setNotify] = useState(false);

  // -----------------------------
  // Pre-fill fields
  // -----------------------------
  useEffect(() => {
    if (task) {
      setProjectTitle(task.projectTitle || "");
      setDeadline(task.deadline || "");
      setDescription(task.description || "");
      setFigmaLink(task.figmaLink || "");
      setApkLink(task.apkLink || "");
      setPriority(task.priority || "");
      setNotify(task.notification || false);

      // ⭐ Convert AssignedTo IDs → Names
      setAssignedTo(getAssignedEmployeeNames(task.assignedTo));

      // ⭐ Convert AssignedBy ID → Name
      const assigner = dummyEmployees.find(
        (e) => String(e.employeeId) === String(task.assignBy)
      );
      setAssignedBy(assigner?.name || "Unknown");
    }
  }, [task]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/view-assign")}
            src="/notifi.png"
            alt=""
          />
          <h1>View Task</h1>
        </div>
      </div>

      <div className="p-7 w-full">
        <div className="bg-[#E3E3E3]/15 rounded-xl p-6 flex flex-col gap-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Project Title</label>
              <input
                type="text"
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={projectTitle}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Deadline</label>
              <input
                type="date"
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={deadline}
                readOnly
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-[21px]">
              Project Description
            </label>
            <textarea
              rows={4}
              className="rounded-lg bg-white border px-4 py-3 text-lg focus:outline-none"
              value={description}
              readOnly
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Figma Link</label>
              <input
                type="url"
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={figmaLink}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Assign To</label>
              <input
                type="text"
                className="rounded-lg bg-white border h-[60px] px-4 text-lg bg-gray-100"
                value={assignedTo}
                readOnly
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">
                Project Priority
              </label>
              <input
                type="text"
                className="rounded-lg bg-white border h-[60px] px-4 text-lg bg-gray-100"
                value={priority}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">
                Project Assign
              </label>
              <input
                type="text"
                readOnly
                className="rounded-lg bg-white border h-[60px] px-4 text-lg bg-gray-100 cursor-not-allowed"
                value={assignedBy}
              />
            </div>
          </div>

          {/* File Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Attach File</label>
              <label className="w-full h-[60px] border border-[#A2A1A8]/15 rounded-lg bg-white flex items-center justify-center text-[#6F6F6F]">
                No File Uploaded
              </label>
            </div>

            {/* Notifications */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">
                Activate Notifications
              </label>
              <div className="flex items-center gap-4 mt-2">
                <div
                  className={`w-14 h-8 rounded-full flex items-center px-1 cursor-pointer transition-all duration-300 ${
                    notify ? "bg-[#0E9EE7]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                      notify ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Project reminder will be sent to task assignee and creator
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-6 py-3 rounded-lg bg-gray-200 text-black">
              Back
            </button>
            <button className="px-6 py-3 rounded-lg bg-gray-300 text-white cursor-not-allowed">
              Save (Disabled)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
