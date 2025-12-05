// src/components/DateRangePicker.jsx
import React from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

const DateRangePicker = ({ range, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className=" border border-gray-300 rounded-lg px-4 py-1.5 text-sm flex items-center gap-2"
    >
      {`${format(range[0].startDate, "MMM dd")} - ${format(
        range[0].endDate,
        "MMM dd"
      )}`}
      <CalendarDays size={16} />
    </button>
  );
};

export default DateRangePicker;
