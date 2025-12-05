import React, { useState } from "react";

const AddIntern = ({ setOpenAddModal }) => {
  const [internName, setInternName] = useState("");
  const [department, setDepartment] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!internName || !department || !duration || !type || !startDate) return;

    const newIntern = { internName, department, duration, type, startDate };
    console.log("✅ New Intern:", newIntern);

    // Close modal after adding
    setOpenAddModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 border border-[#0E9EE7]">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Intern
        </h2>

        <hr className="mb-4 border-b border-[#A2A1A8]/10" />

        {/* Form */}
        <form className="space-y-4" onSubmit={handleAdd}>
          {/* Intern Name */}
          <input
            type="text"
            placeholder="Intern Name"
            value={internName}
            onChange={(e) => setInternName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Department */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
          </select>

          {/* Duration */}
          <input
            type="text"
            placeholder="Duration (e.g. 3 Months)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
          </select>

          {/* Start Date */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpenAddModal(false)}
              className="w-1/2 px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 px-6 py-2 rounded-xl bg-[#0E9EE7] text-white font-medium hover:bg-[#0c8ecf]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIntern;
