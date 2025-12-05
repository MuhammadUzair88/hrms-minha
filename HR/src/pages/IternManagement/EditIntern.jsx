// src/pages/Interns/EditIntern.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyInterns } from "../../assets/assets";
import Table from "../../components/Table";

const EditIntern = () => {
  const [intern, setIntern] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const foundIntern = dummyInterns.find(
      (item) => String(item.id) === String(id)
    );
    setIntern(foundIntern);
  }, [id]);

  if (!intern) return <div className="p-6">Loading intern details...</div>;

  // Columns
  const columns = [
    "Start Date",
    "Intern Name",
    "Department",
    "Duration",
    "Type",
    "Action",
  ];

  // Data → single row in an array so Table works
  const data = [intern];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Edit Intern</h1>
      </div>

      {/* Selected Intern Info */}
      <div className="px-[39px] pt-[26px] flex items-center gap-2">
        <div>
          <img
            src={intern?.image}
            alt="img"
            className="rounded-full w-[69px] h-[69px]"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-[20px]">{intern?.internName}</h1>
          <h1 className="font-light text-[15px]">{intern?.department}</h1>
        </div>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={data}
          renderRow={(row) => [
            row.startDate,
            row.internName,
            <div className="font-medium">{row.department}</div>,
            <div className="font-medium">{row.duration}</div>,
            row.type,
            <button className="bg-[#0E9EE7] text-white px-5 py-1 rounded-lg">
              Save
            </button>,
          ]}
        />
      </div>
    </div>
  );
};

export default EditIntern;
