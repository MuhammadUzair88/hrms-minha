// src/pages/Meetings/EditMeeting.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { meetings } from "../../../assets/assets";
import Table from "../../../components/Table";
import { FaMeetup } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";

const EditMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const meeting = meetings.find((m) => m.id === parseInt(id));
    if (meeting) {
      setData(meeting);
    }
  }, [id]);

  const columns = [
    "Date",
    "Day",
    "Meeting Purpose",
    "Time",
    "Employee name",
    "Description",
    "Action",
  ];

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
        <h1>Edit Meeting</h1>
      </div>

      <div className="px-[39px] pt-[26px] flex justify-between items-center">
        <button className="flex items-center gap-2 text-[16px] font-semibold text-[#0E9EE7] border-b-3 border-[#0E9EE7] ">
          <MdMeetingRoom size={22} />
          Meetings
        </button>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        {data ? (
          <Table
            columns={columns}
            data={[data]}
            renderRow={(meeting) => [
              meeting.date,
              meeting.day,
              <span className="font-medium">{meeting.title}</span>,
              meeting.time,
              meeting.employees.join(", "),
              meeting.description,
              <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg">
                Save
              </button>,
            ]}
          />
        ) : (
          <div className="text-center py-6 text-gray-500">
            No meeting found.
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMeeting;
