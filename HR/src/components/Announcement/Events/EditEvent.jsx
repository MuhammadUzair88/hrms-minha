// src/pages/Events/EditEvent.jsx
import React, { useEffect, useState } from "react";
import { MdEventNote } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { events } from "../../../assets/assets";
import Table from "../../../components/Table";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const event = events.find((e) => e.id === parseInt(id));
    if (event) {
      setData(event);
    }
  }, [id]);

  const columns = ["Date", "Day", "Event", "Description", "Action"];

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
        <h1>Edit Event</h1>
      </div>

      {/* Tabs */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-3 border-[#0E9EE7] ">
          <MdEventNote size={22} />
          Events
        </button>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={data ? [data] : []}
          renderRow={(event) => [
            event.date,
            event.day,
            <span className="font-medium">{event.name}</span>,
            event.description || "-",
            <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg">
              Save
            </button>,
          ]}
        />

        {!data && (
          <div className="text-center py-6 text-gray-500">No event found.</div>
        )}
      </div>
    </div>
  );
};

export default EditEvent;
