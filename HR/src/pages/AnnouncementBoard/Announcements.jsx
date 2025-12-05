import React, { useState } from "react";
import { useToggle } from "../../context/Toggle";
import { useNavigate } from "react-router-dom";
import { Download, Search } from "lucide-react";
import { MdEvent, MdHolidayVillage, MdMeetingRoom } from "react-icons/md";
import Holiday from "../../components/Announcement/Holidays/Holiday";
import { CgAdd } from "react-icons/cg";
import AddHoliday from "../../components/Announcement/Holidays/AddHoliday";
import Meeting from "../../components/Announcement/Meetings/Meeting";
import AddMeeting from "../../components/Announcement/Meetings/AddMeeting";
import Event from "../../components/Announcement/Events/Events";
import AddEvent from "../../components/Announcement/Events/AddEvent";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import ToggleButton from "../../components/ToggleButton";

const Announcements = () => {
  const { toggleSidebar, isSidebarOpen } = useToggle();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Holidays");
  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  return (
    <div className="bg-white  flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Announcement Board</h1>
        </div>
      </div>

      {/* Top Bar with Tabs + Search + Export */}
      <div className="px-[39px] pt-[26px] flex justify-between items-center ">
        {/* Tabs */}
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("Holidays")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "Holidays"
                ? "text-[#0E9EE7] border-b-3 border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdHolidayVillage size={22} />
            Holidays
          </button>

          <button
            onClick={() => setActiveTab("Meetings")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "Meetings"
                ? "text-[#0E9EE7] border-b-[3px] border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdMeetingRoom size={22} />
            Meetings
          </button>

          <button
            onClick={() => setActiveTab("Events")}
            className={`flex items-center gap-2 text-[16px] font-semibold ${
              activeTab === "Events"
                ? "text-[#0E9EE7] border-b-[3px] border-[#0E9EE7]"
                : "text-gray-500 hover:text-[#0E9EE7]"
            }`}
          >
            <MdEvent size={22} />
            Events
          </button>
        </div>

        {/* Search + Export */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <SearchBar />

          {activeTab === "Holidays" && (
            <Button
              icon={CgAdd}
              label={"New Holiday"}
              onClick={() => setHolidayModalOpen(true)}
            />
          )}
          {activeTab === "Meetings" && (
            <Button
              icon={CgAdd}
              label={"New Meeting"}
              onClick={() => setMeetingModalOpen(true)}
            />
          )}
          {activeTab === "Events" && (
            <Button
              icon={CgAdd}
              label={"New Event"}
              onClick={() => setEventModalOpen(true)}
            />
          )}
        </div>
      </div>
      <div className="inset-0 z-50 w-full h-full flex justify-center items-center mx-auto  ">
        {holidayModalOpen && (
          <AddHoliday setHolidayModalOpen={setHolidayModalOpen} />
        )}
        {meetingModalOpen && (
          <AddMeeting setMeetingModalOpen={setMeetingModalOpen} />
        )}
        {eventModalOpen && <AddEvent setEventModalOpen={setEventModalOpen} />}
      </div>

      {/* Content */}
      <div className="">
        {activeTab === "Holidays" && <Holiday />}
        {activeTab === "Meetings" && <Meeting />}
        {activeTab === "Events" && <Event />}
      </div>
    </div>
  );
};

export default Announcements;
