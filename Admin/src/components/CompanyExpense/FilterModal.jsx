import React from "react";

const FilterModal = ({ setHolidayModalOpen }) => {
    
  return (
    <div className="w-96 h-80 relative bg-white rounded-[20px] outline outline-2 outline-offset-[-2px] outline-sky-500 overflow-hidden p-5">
      {/* Header */}
      <h2 className="text-slate-900 text-xl font-semibold leading-loose">
        Filter
      </h2>
      <div className="w-80 border border-zinc-400/10 my-4" />

      {/* Type Section */}
      <div>
        <p className="text-slate-900 text-base font-semibold mb-3">Type</p>
        <div className="grid grid-cols-2 gap-y-3 gap-x-8">
          {/* HR */}
          <label className="flex items-center gap-2 text-slate-900 text-base">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-sky-500 rounded"
            />
            HR
          </label>

          {/* Operations */}
          <label className="flex items-center gap-2 text-slate-900 text-base">
            <input type="checkbox" className="w-5 h-5 accent-sky-500 rounded" />
            Operations
          </label>

          {/* IT */}
          <label className="flex items-center gap-2 text-slate-900 text-base">
            <input type="checkbox" className="w-5 h-5 accent-sky-500 rounded" />
            IT
          </label>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-between">
        <button
          onClick={() => setHolidayModalOpen(false)}
          className="w-40 h-12 rounded-[10px] border border-zinc-400/20 text-slate-900 text-base"
        >
          Cancel
        </button>
        <button
          onClick={() => setHolidayModalOpen(false)}
          className="w-40 h-12 rounded-[10px] bg-sky-500 text-white text-base font-semibold"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
