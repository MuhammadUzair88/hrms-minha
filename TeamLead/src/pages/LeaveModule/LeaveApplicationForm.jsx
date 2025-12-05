// src/components/LeaveApplicationForm.jsx
import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeaveApplicationForm = () => {
  const [form, setForm] = useState({
    leaveType: "Casual",
    employeeName: "Muzna Ahmad",
    startDate: "2025-06-16",
    endDate: "2025-06-16",
    duration: 1,
    department: "UI UX Designer",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Replace with your submit logic
  };

  const handleReset = () => {
    setForm({
      leaveType: "",
      employeeName: "",
      startDate: "",
      endDate: "",
      duration: 1,
      department: "",
      reason: "",
    });
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/leaves")}
          className="cursor-pointer"
        />
        <h1> Leave Application</h1>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <span className="text-2xl">📖</span>
          </div>
          <h2 className="text-2xl font-semibold">Leave Application</h2>
          <p className="text-sm text-gray-500">
            Fill the required fields below to apply for sick leave.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Leave Type + Employee Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="leaveType"
              placeholder="Leave Type"
              value={form.leaveType}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="employeeName"
              placeholder="Employee Name"
              value={form.employeeName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Row 2: Start Date + End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <CalendarDays className="absolute right-2 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <CalendarDays className="absolute right-2 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Row 3: Duration + Department */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              min={1}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Duration"
            />
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Department"
            />
          </div>

          {/* Reason */}
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for leave"
            className="border border-gray-300 rounded-md p-2 w-full h-24 resize-none"
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-start mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
