import React from "react";
import Button from "../Button";
import { Timer } from "lucide-react";
import { dummyEmployees } from "../../assets/assets"; // import employees to get names/images

export const PerformanceCards = ({ report }) => {
  const assignedEmployee = dummyEmployees.find(
    (emp) => emp.employeeId === report.assignedTo
  );
  const assignedByEmployee = dummyEmployees.find(
    (emp) => emp.employeeId === report.assignedBy
  );

  return (
    <div className="w-full bg-[#A2A1A8]/7 px-4 sm:px-6 md:px-11 py-5 rounded-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        <div className="flex flex-col w-full md:w-auto">
          <h1 className="font-bold text-[13px] break-words">
            {report.taskDescription}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-[11px]">
              {report.reportId} Opened {report.openedDaysAgo} days ago by{" "}
              <span className="font-bold">
                {assignedByEmployee?.name || "Unknown"}
              </span>
            </p>
            <span
              className={`rounded-full px-2 text-white text-[11px] font-semibold ${
                report.status === "Completed"
                  ? "bg-[#00B172]"
                  : report.status === "In Progress"
                  ? "bg-[#F0A500]"
                  : "bg-[#0E9EE7]"
              }`}
            >
              {report.status}
            </span>
            <span
              className={`bg-[#0E9EE7] rounded-full px-2 text-white text-[11px] font-semibold ${
                report.priority === "high priority"
                  ? "bg-[#F45B69]"
                  : report.priority === "low priority"
                  ? "bg-[#0E9EE7]"
                  : "bg-[#0E9EE7]"
              }`}
            >
              {report.priority}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 mt-2 md:mt-0">
          <Button label={"Generate Report"} />
          <span className="bg-white px-3 py-2 text-[#0E9EE7] rounded-lg flex items-center gap-1 whitespace-nowrap">
            <Timer /> {report.timeSpent}
          </span>
          {assignedEmployee && (
            <img
              className="w-8 h-8 rounded-full ml-0 md:ml-2"
              src={assignedEmployee.image}
              alt={assignedEmployee.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};
