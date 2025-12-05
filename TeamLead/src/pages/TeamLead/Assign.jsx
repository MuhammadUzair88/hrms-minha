// src/pages/Tasks/Assign.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";
import { useToggle } from "../../context/Toggle";
import { TeamLeadDummyTask, dummyEmployees } from "../../assets/assets";

const Assign = () => {
  const { id } = useParams();
  const { toggleSidebar, isSidebarOpen } = useToggle();

  // Find the task by ID
  const task = TeamLeadDummyTask.find((t) => t.id === Number(id));

  // Form states
  const [projectTitle, setProjectTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedby, setAssignedBy] = useState("");
  const [notify, setNotify] = useState(false);

  // Pre-fill the form on component mount
  useEffect(() => {
    if (task) {
      setProjectTitle(task.projectTitle || "");
      setDeadline(task.deadline || "");
      setDescription(task.description || "");
      setFigmaLink(task.figmaLink || "");
      setAssignedTo(task.assignedTo || "");
      setPriority(task.priority || "");
      setAssignedBy(task.assignBy || "");
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
            onClick={() => navigate("/teamlead")}
            src="/notifi.png"
            alt=""
          />
          <h1>Assign Task</h1>
        </div>
      </div>

      <div className="p-7 w-full">
        <div className="bg-[#E3E3E3]/15 rounded-xl p-6 flex flex-col gap-8">
          {/* Row 1: Project Title + Deadline */}
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

          {/* Row 2: Figma Link + Assign To */}
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
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Select Employee</option>
                {dummyEmployees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Priority */}
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
                className="rounded-lg bg-white border h-[60px] px-4 text-lg focus:outline-none bg-gray-100 cursor-not-allowed"
                value={
                  dummyEmployees.find((e) => e.employeeId === assignedby)
                    ?.name || "Unknown"
                }
              />
            </div>
          </div>

          {/* Attach File + Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[21px]">Attach File</label>
              <label className="w-full h-[60px] border border-[#A2A1A8]/15 rounded-lg bg-white flex items-center justify-center cursor-pointer text-[#6F6F6F]">
                + Attach File
                <input type="file" className="hidden" />
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
                  Project reminder will be sent to task assignee and Project
                  creator
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-6 py-3 rounded-lg bg-gray-200 text-black">
              Cancel
            </button>
            <button className="px-6 py-3 rounded-lg bg-[#0E9EE7] text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assign;
