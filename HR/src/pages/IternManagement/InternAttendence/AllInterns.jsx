import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

// Import dummy data
import {
  dummyInterns,
  dummyInternAttendanceRecords,
} from "../../../assets/assets";
import AllInternCard from "../../../components/Interns/InternAttendence/AllInternCard";

const AllInterns = () => {
  const [internsWithAttendance, setInternsWithAttendance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getInterns = () => {
      // Merge attendance with intern details
      const merged = dummyInternAttendanceRecords.records.map((record) => {
        const intern = dummyInterns.find(
          (int) => int.internId === record.internId || int.id === record.id
        );
        return {
          ...record,
          image: intern?.image || "",
          name: intern?.internName || record.name, // fallback
        };
      });

      setInternsWithAttendance(merged);
    };

    getInterns();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/intern-attendence")}
          className="cursor-pointer"
        />
        <h1>All Interns</h1>
      </div>

      {/* Intern Grid */}
      <div className="flex justify-center w-full px-[39px] pt-[26px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {internsWithAttendance.map((intern) => (
            <AllInternCard
              key={intern.id}
              id={intern.id}
              name={intern.name}
              image={intern.image}
              status={intern.status} // shows Present/Late/Absent
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllInterns;
