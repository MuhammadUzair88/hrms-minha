import { Book, BookOpen } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveApplication = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/leaves")}
          className="cursor-pointer"
        />
        <h1> Leave Application</h1>
      </div>
      <div className="px-[39px] pt-[26px]">
        <div className="flex flex-col items-center justify-center bg-[#FCFCFC] shadow rounded-lg gap-8 ">
          <div className="pt-[30px]">
            <h1 className="flex items-center gap-2 text-[#1D1D1D] text-2xl font-semibold">
              <BookOpen /> Leave Application
            </h1>
          </div>
          <div className="flex flex-col w-full items-start justify-start px-11 text-[#1D1D1D] gap-[31px]">
            <div>
              <h1 className="font-normal text-[28px] ">Jun 16,2025</h1>
              <h1 className="font-medium text-[18px]">Muzna Ahmad</h1>
              <h1 className="font-light text-[20px]">UI UX Designer</h1>
              <h1 className="font-light text-[20px]">May 05-May 06</h1>
              <h1 className="font-light text-[20px]">Casual</h1>
            </div>
            <div>
              <h1 className="font-semibold text-[28px] ">Dear Sir,</h1>

              <h1 className="font-light text-[20px]">Hi [hr Manager],</h1>
              <h1 className="font-light text-[20px]">
                I hope you're doing well. I wanted to inform you that I need a
                day off on [16 jun] due to [a personal reason / some urgent
                work].
              </h1>
              <h1 className="font-light text-[20px] pt-2 pb-20">
                Please let me know if that's okay.
              </h1>
            </div>
          </div>
        </div>

        <textarea
          className="h-[120px] w-full p-4 rounded-lg text-[25px] shadow bg-[#FCFCFC] mt-11 "
          placeholder="If No, state reason why?"
        ></textarea>

        {/* Buttons Section - Added to complete the design */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => navigate("/leaves")}
            className="px-5  py-1 rounded-lg text-[20px]  bg-[#00B172] text-white shadow cursor-pointer"
          >
            Approve
          </button>

          <button
            className="px-5 py-1 rounded-lg text-[20px]  bg-[#09182B] text-white border border-gray-300 shadow cursor-pointer"
            onClick={() => navigate("/leaves")}
          >
            Rejected
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
