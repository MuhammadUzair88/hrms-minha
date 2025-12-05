import React from "react";
import { useNavigate } from "react-router-dom";

const AllInternCard = ({ name, image, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/intern-attendence/view/${id}`)}
      className="w-72 max-w-full h-auto bg-stone-50 rounded-xl outline outline-1 outline-zinc-400/20 p-4 flex flex-col items-center"
    >
      <img
        className="w-20 h-20 rounded-full object-cover"
        src={image || "https://placehold.co/85x85"}
        alt={name}
      />
      <h2 className="mt-4 text-slate-900 text-xl font-semibold">{name}</h2>
    </div>
  );
};

export default AllInternCard;
