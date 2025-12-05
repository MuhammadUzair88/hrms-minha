// src/components/TaskManager/DesignCard.jsx
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const DesignCard = ({
  category,
  title,
  description,
  statusColor,
  buttonLabel,
  columnType,
  onAction,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = {
    pending: ["Delete"],
    inprogress: ["Delete", "Complete", "Pending"],
    done: ["Delete", "Pending"],
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor || "#22C55E" }}
          />
          <span className="text-neutral-500 text-xs font-medium font-poppins">
            {category}
          </span>
        </div>

        {/* Three dots menu */}
        <div className="relative">
          <BsThreeDots
            className="w-5 h-5 text-gray-400 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-10">
              {menuItems[columnType]?.map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onAction(item);
                    setMenuOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-col gap-2 flex-1">
        <h3 className="text-black text-lg font-medium font-poppins">{title}</h3>
        <p className="text-black text-sm font-normal font-poppins">
          {description}
        </p>
      </div>

      {/* Button */}
      {buttonLabel && (
        <div className="mt-auto flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold font-lexend px-4 py-2 rounded-lg">
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignCard;
