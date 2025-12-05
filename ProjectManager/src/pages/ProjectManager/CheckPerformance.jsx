import React from "react";
import { PerformanceCards } from "../../components/TeamLeadTasks/PerformanceCards";
import { dummyPerformanceReports } from "../../assets/assets"; // import dummy reports
import { useToggle } from "../../context/Toggle";
import ToggleButton from "../../components/ToggleButton";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const CheckPerformance = () => {
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useToggle();
  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src="/notifi.png"
            alt=""
          />
          <h1>Check Performance</h1>
        </div>
      </div>
      <div className="px-[39px] pt-[26px] w-full flex justify-end">
        <Button
          onClick={() => navigate("/view-reports")}
          label={"View Reports"}
        />
      </div>
      <div className="p-7 w-full">
        <div className="bg-[#E3E3E3]/15 rounded-xl p-6 flex flex-col gap-4">
          {dummyPerformanceReports.map((report) => (
            <PerformanceCards key={report.reportId} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckPerformance;
