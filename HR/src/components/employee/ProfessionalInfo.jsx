import React from "react";
import Button from "../Button";

const ProfessionalInfo = ({ data, setData }) => {
  const inputClass =
    "px-[30px] py-[10px] w-full h-[56px] bg-white border border-[#E3E3E34D] rounded-[12px] text-sm outline-none";
  const labelClass = "text-black text-[16px] mb-1 font-semibold";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!data?.employeeId) {
      alert("Please enter Employee ID before continuing.");
      return;
    }
    const event = new CustomEvent("nextTab", { detail: "documents" });
    window.dispatchEvent(event);
  };

  return (
    <div className="px-1 py-10 flex flex-col gap-5">
      {/* Inputs */}
      <div className="flex flex-col gap-6 mt-4">
        {/* Row 1 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Employee ID</label>
            <input
              className={inputClass}
              type="text"
              name="employeeId"
              value={data.employeeId || ""}
              onChange={handleChange}
              placeholder="Employee ID"
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Username</label>
            <input
              className={inputClass}
              type="text"
              name="username"
              value={data.username || ""}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Select Employee Type</label>
            <select
              className={inputClass}
              name="employeeType"
              value={data.employeeType || ""}
              onChange={handleChange}
            >
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="w-full">
            <label className={labelClass}>Email Address</label>
            <input
              className={inputClass}
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              placeholder="Email Address"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Enter Department</label>
            <input
              className={inputClass}
              type="text"
              name="department"
              value={data.department || ""}
              onChange={handleChange}
              placeholder="Department"
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Enter Designation</label>
            <input
              className={inputClass}
              type="text"
              name="designation"
              value={data.designation || ""}
              onChange={handleChange}
              placeholder="Designation"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Total Working Days</label>
            <select
              className={inputClass}
              name="workingDays"
              value={data.workingDays || ""}
              onChange={handleChange}
            >
              <option value="5 Days">5 Days</option>
              <option value="6 Days">6 Days</option>
              <option value="7 Days">7 Days</option>
            </select>
          </div>
          <div className="w-full">
            <label className={labelClass}>Select Joining Date</label>
            <input
              className={inputClass}
              type="date"
              name="joiningDate"
              value={data.joiningDate || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Fixed Salary */}
        <div className="w-full">
          <label className={labelClass}>Fixed Salary</label>
          <input
            className={inputClass}
            type="text"
            name="fixedSalary"
            value={data.fixedSalary || ""}
            onChange={handleChange}
            placeholder="e.g. 50000"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-10">
        <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600">
          Cancel
        </button>
        <Button label={"Next"} />
      </div>
    </div>
  );
};

export default ProfessionalInfo;
