// src/pages/Holidays/EditHoliday.jsx
import React, { useEffect, useState } from "react";
import { MdHolidayVillage } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { holidays } from "../../../assets/assets";
import Table from "../../../components/Table";

const EditHoliday = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const holiday = holidays.find((h) => h.id === parseInt(id));
    if (holiday) {
      setData(holiday);
    }
  }, [id]);

  const columns = ["Date", "Day", "Holiday Name", "Description", "Action"];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/announcements")}
          className="cursor-pointer"
        />
        <h1>Edit Holiday</h1>
      </div>

      {/* Tabs */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-3 border-[#0E9EE7]">
          <MdHolidayVillage size={22} />
          Holidays
        </button>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={data ? [data] : []}
          renderRow={(holiday) => [
            holiday.date,
            holiday.day,
            <span className="font-medium">{holiday.name}</span>,
            holiday.description || "-",
            <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg">
              Save
            </button>,
          ]}
        />

        {!data && (
          <div className="text-center py-6 text-gray-500">
            No holiday found.
          </div>
        )}
      </div>
    </div>
  );
};

export default EditHoliday;
