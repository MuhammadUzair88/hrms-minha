// src/pages/Tasks/EditTask.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";
import { useToggle } from "../../context/Toggle";
import { ViewAssignTask, dummyEmployees } from "../../assets/assets";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // -----------------------------
  // Find Task by ID
  // -----------------------------
  const task = ViewAssignTask.find((t) => t.id === Number(id));

  // -----------------------------
  // States
  // -----------------------------
  const [projectTitle, setProjectTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [apkLink, setApkLink] = useState("");
  const [assignedTo, setAssignedTo] = useState([]); // store employeeIds
  const [priority, setPriority] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [notify, setNotify] = useState(false);

  // -----------------------------
  // Pre-fill values
  // -----------------------------
  useEffect(() => {
    if (task) {
      setProjectTitle(task.projectTitle || "");
      const [day, month, year] = task.deadline.split("-");
      setDeadline(
        `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
      setDescription(task.description || "");
      setFigmaLink(task.figmaLink || "");
      setApkLink(task.apkLink || "");
      setPriority(task.priority || "");
      setAssignedBy(task.assignBy || "");
      setNotify(task.notify || false);

      // Convert assignedTo string → array of IDs
      setAssignedTo(
        task.assignedTo ? task.assignedTo.split(",").map((id) => id.trim()) : []
      );
    }
  }, [task]);

  // -----------------------------
  // Handle Save
  // -----------------------------
  const handleSave = () => {
    const updatedTask = {
      ...task,
      projectTitle,
      deadline,
      description,
      figmaLink,
      apkLink,
      priority,
      assignedTo: assignedTo.join(","), // save as string
      notify,
    };
    console.log("Updated Task:", updatedTask);
    alert("Task updated! Check console for output.");
    navigate(-1);
  };

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
          <h1>Edit Task</h1>
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
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Deadline</label>
              <input
                type="date"
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setFigmaLink(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Assign To</label>
              <select
                multiple
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={assignedTo}
                onChange={(e) =>
                  setAssignedTo(
                    Array.from(e.target.selectedOptions, (opt) => opt.value)
                  )
                }
              >
                {dummyEmployees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">
                Project Priority
              </label>
              <select
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">
                Project Assign
              </label>
              <input
                type="text"
                readOnly
                className="rounded-lg bg-white border h-[60px] px-4 text-lg bg-gray-100 cursor-not-allowed"
                value={
                  dummyEmployees.find((e) => e.employeeId === assignedBy)
                    ?.name || "Unknown"
                }
              />
            </div>
          </div>

          {/* File + Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Attach File</label>
              <label className="w-full h-[60px] border border-[#A2A1A8]/15 rounded-lg bg-white flex items-center justify-center text-[#6F6F6F]">
                No File Uploaded
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">
                Activate Notifications
              </label>
              <div className="flex items-center gap-4 mt-2">
                <div
                  onClick={() => setNotify(!notify)}
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
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg bg-gray-200 text-black"
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-lg bg-[#0E9EE7] text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
