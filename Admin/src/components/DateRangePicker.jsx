import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeSelector({
  value,
  onChange,
  position = "right",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const safeValue = Array.isArray(value)
    ? value
    : [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    else document.removeEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border border-gray-300 rounded-lg px-4 py-1.5 text-sm flex items-center gap-2 bg-white"
      >
        {`${format(safeValue[0].startDate, "MMM dd")} - ${format(
          safeValue[0].endDate,
          "MMM dd"
        )}`}
        <CalendarDays size={16} />
      </button>

      {open && (
        <div
          className={`absolute top-12 shadow-lg z-50 ${
            position === "left" ? "left-0" : "right-0"
          }`}
        >
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={safeValue}
            onChange={(item) => onChange([item.selection])}
          />
        </div>
      )}
    </div>
  );
}
