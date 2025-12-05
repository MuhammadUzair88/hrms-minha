import React from "react";
import { Filter } from "lucide-react";

const FilterButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border border-[#0E9EE7] text-[#0E9EE7] hover:bg-sky-600 text-sm font-medium rounded-lg px-4 py-[7px] flex items-center gap-2 transition box-border"
    >
      <Filter size={16} />
      <span>{isOpen ? "Close Filter" : "Filter"}</span>
    </button>
  );
};

export default FilterButton;
