// StatCard.jsx
import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="w-full  h-[104px] bg-[#F8F8F8] rounded-xl p-4 flex flex-col justify-between">
      <span className="text-slate-900 text-lg md:text-xl font-semibold">
        {title}
      </span>
      <span className="text-slate-900 text-2xl font-light font-['Lexend']">
        {value}
      </span>
    </div>
  );
};

export default StatCard;
