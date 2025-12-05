// PersonalInfo.jsx
import React from "react";

const PersonalInfo = ({ fields }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-10">
      {fields.map((field, idx) => (
        <div key={idx} className="w-full flex flex-col gap-1.5">
          <label className="text-[20px] font-medium text-zinc-400">
            {field.label}
          </label>
          <div className="text-[18px] font-light text-zinc-900">
            {field.value}
          </div>
          <div className="w-full h-px bg-zinc-400/30" />
        </div>
      ))}
    </div>
  );
};

export default PersonalInfo;
