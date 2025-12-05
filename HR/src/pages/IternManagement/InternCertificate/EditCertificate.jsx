import { Book, BookCheckIcon } from "lucide-react";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditCertificate = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/intern-certificate")}
          className="cursor-pointer"
        />
        <h1>Edit Intern Certificate</h1>
      </div>
      <div className="flex flex-col w-full items-center justify-center ">
        <h1 className="text-[40px] flex items-center gap-3 px-[39px] pt-[26px]">
          {" "}
          <span>
            <FaBookOpen size={45} />
          </span>{" "}
          Intern Certificate
        </h1>
        <div className="px-[39px] pt-[26px]">
          <img src="/Certificate.png" alt="certificate" />
        </div>
      </div>
      <div className="w-full flex justify-end items-end px-[85px] py-[17px]">
        <button className="bg-[#0E9EE7] rounded-xl w-[272px] h-[70px] text-white text-[32px] font-medium">
          Save Change
        </button>
      </div>
    </div>
  );
};

export default EditCertificate;
