import React from "react";

const DashboardCards = ({
  title,
  value,
  percentage,
  icon,
  percentageColor,
  arrowIcon,
}) => {
  return (
    <div className="flex-1 min-w-[220px] h-32 bg-white border border-zinc-200 rounded-lg p-4 flex flex-col justify-between shadow-sm">
      {/* Top Section */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center bg-indigo-500/5 rounded-md">
          {icon}
        </div>

        {/* Title */}
        <p className="text-lg text-black font-medium">{title}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-2">
        {/* Value */}
        <h2 className="text-2xl font-semibold text-slate-900">{value}</h2>

        {/* Percentage Badge */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded ${percentageColor}`}
        >
          <span className="w-3.5 h-3.5 flex items-center justify-center text-white">
            {arrowIcon}
          </span>
          <span className="text-xs font-medium text-white">{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
