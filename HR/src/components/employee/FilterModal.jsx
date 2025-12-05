import React from "react";

const FilterModal = () => {
  return (
    <div className="absolute top-full mt-2 right-0 z-20 w-[383px] rounded-2xl bg-white shadow-lg border border-gray-200 p-5">
      {/* Header */}
      <div className="border-b border-[#A2A1A8]/20 pb-2">
        <h1 className="text-lg font-semibold text-gray-800">Filter</h1>
      </div>

      {/* Department Section */}
      <div className="mt-5">
        <h2 className="font-semibold text-sm mb-2 text-gray-800">Department</h2>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {[
            "Design",
            "HR",
            "Sales",
            "Business Analyst",
            "Project Manager",
            "Java",
            "Python",
            "React JS",
            "Account",
            "Nods JS",
          ].map((dept, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-sky-500 h-4 w-4 rounded"
              />
              <span className="text-sm text-gray-700">{dept}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Select Type Section */}
      <div className="mt-6">
        <h2 className="font-semibold text-sm mb-2 text-gray-800">
          Select Type
        </h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              className="accent-sky-500 h-4 w-4"
            />
            <span className="text-sm text-gray-700">Office</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              className="accent-sky-500 h-4 w-4"
            />
            <span className="text-sm text-gray-700">Work from Home</span>
          </label>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-between gap-3">
        <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button className="w-full py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
