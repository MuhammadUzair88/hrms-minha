import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, DollarSign } from "lucide-react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";
import Button from "../../components/Button";

// --------------------------------------
// Intern Data (Like Your Screenshot)
// --------------------------------------
const interns = [
  {
    startDate: "1-08-25",
    internName: "Hamza Parvaiz",
    department: "Android Developer",
    completeDuration: "1 month",
    leftDuration: "2 months left",
    type: "Remote",
    mentor: "Talha Tariq",
  },
];

const Intern = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalPages = Math.ceil(interns.length / rowsPerPage);
  const paginatedData = interns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const { toggleSidebar, isSidebarOpen } = useToggle();
  const Navigate = useNavigate();

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Intern</h1>
        </div>
      </div>

      {/* Top Section */}
      <div className="flex items-center justify-between relative px-[39px] py-[26px]">
        {/* Employee Info */}
        <button className="text-[#0E9EE7] border-b-3 border-[#0E9EE7] flex items-center gap-2 text-[16px] font-semibold">
          <DollarSign size={22} />
          Intern Detail
        </button>

        {/* Date Picker Button */}
        <Button
          onClick={() => Navigate("/intern-certificate")}
          label={"View Certificate"}
        />
      </div>

      {/* Table Section */}
      <div className="px-[39px] py-[26px]">
        <Table
          columns={[
            "Start Date",
            "Intern Name",
            "Department",
            "Complete Duration",
            "Left Duration",
            "Type",
            "Mentor",
          ]}
          data={paginatedData}
          renderRow={(item) => [
            item.startDate,
            item.internName,
            item.department,
            item.completeDuration,
            item.leftDuration,
            item.type,
            item.mentor,
          ]}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 px-[39px] py-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default Intern;
