// src/components/Notifications.jsx
import { Search } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const notifications = [
  {
    id: 1,
    img: "/Ellipse 949.png",
    title: "Leave Request",
    message: "@Talha send sick leave",
    time: "Just Now",
  },
  {
    id: 2,
    img: "/Ellipse 950.png",
    title: "Leave Accepted",
    message: "@Admin accepted Talha leave",
    time: "11:16 AM",
  },
  {
    id: 3,
    img: "/Ellipse 952.png",
    title: "Check In Issue",
    message: "@Simrah shared a message regarding check in issue",
    time: "09:00 AM",
  },
  {
    id: 4,
    img: "/Ellipse 949.png",
    title: "Password Update successfully",
    message: "@Muzna Your password has been updated successfully",
    time: "Yesterday",
  },
  {
    id: 5,
    img: "/Ellipse 949.png",
    title: "Password Update successfully",
    message: "@Muzna Your password has been updated successfully",
    time: "Yesterday",
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/")}
            src="/notifi.png"
            alt=""
          />
          <h1>Notifications</h1>
        </div>
      </div>

      {/* Top Bar (Search) */}
      <div className="px-[39px] pt-[26px] flex justify-start items-center">
        <SearchBar />
      </div>

      {/* Notifications List */}
      <div className="px-[39px] pt-[26px]">
        <div className="rounded-xl border border-[#A2A1A8]/20 bg-white">
          {notifications.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-start justify-between px-6 py-4">
                {/* Left: image + text */}
                <div className="flex items-start gap-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-[17px] font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A2A1A8]">{item.message}</p>
                  </div>
                </div>

                {/* Right: time */}
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              {/* Divider (not after last item) */}
              {index < notifications.length - 1 && (
                <div className="border-b border-gray-200 mx-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
