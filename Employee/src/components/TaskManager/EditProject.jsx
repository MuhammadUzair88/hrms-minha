import React, { useRef, useState } from "react";
import Button from "../Button";

const EditProject = () => {
  // -------------------- STATES --------------------
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [assignBy, setAssignBy] = useState("");
  const [assignTo, setAssignTo] = useState("Project Manager");
  const [priority, setPriority] = useState("Normal");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const inputClass =
    "px-[30px] py-[10px] w-full h-[60px] bg-white border border-[#E3E3E34D] rounded-[12px] text-sm outline-none";

  const labelClass = "text-black text-[18px] mb-1 font-semibold";

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <h1 className="text-[#09182B]">Edit Project</h1>
        </div>
      </div>

      <div className="px-10">
        <div className="bg-[#E3E3E3]/15 shadow-md rounded-lg mt-6 pb-10">
          <div className="flex flex-col gap-4 px-12 pt-4">
            {/* ------------------- ROW 1 ------------------- */}
            <div className="flex items-center gap-2">
              <div className="w-full flex flex-col gap-2">
                <label className={labelClass}>Project Title</label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Funny Ringtones"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <label className={labelClass}>Deadline</label>
                <input
                  className={inputClass}
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            {/* ------------------- DESCRIPTION ------------------- */}
            <div className="w-full flex flex-col gap-2">
              <label className={labelClass}>Project Description</label>
              <textarea
                className="px-[30px] py-[10px] w-full h-[70px] bg-white border border-[#E3E3E34D] rounded-[12px] text-sm outline-none"
                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* ------------------- ROW 2 ------------------- */}
            <div className="flex items-center gap-2 mt-4">
              {/* Project Assign */}
              <div className="w-full flex flex-col gap-2">
                <label className={labelClass}>Project Assign</label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Sir Wasiq"
                  value={assignBy}
                  onChange={(e) => setAssignBy(e.target.value)}
                />
              </div>

              {/* Assign To */}
              <div className="w-full flex flex-col gap-2">
                <label className={labelClass}>Assign To</label>
                <select
                  className={inputClass}
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                >
                  <option>Project Manager</option>
                  <option>Team Lead</option>
                  <option>Developer</option>
                  <option>Designer</option>
                </select>
              </div>

              {/* Project Priority */}
              <div className="w-full flex flex-col gap-2">
                <label className={labelClass}>Project Priority</label>
                <select
                  className={inputClass}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            {/* ------------------- ATTACH FILE ------------------- */}
            <div className="flex flex-col gap-2 mt-6">
              <label className={labelClass}>Attached File</label>

              <button
                onClick={handleAttachClick}
                className="border border-[#E3E3E34D] px-6 py-3 rounded-[12px] text-sm text-gray-700 w-[150px]"
              >
                + Attach File
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end items-end px-10 py-6">
        <div className="flex items-center gap-2">
          <Button label={"Save"} />
          <button className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
