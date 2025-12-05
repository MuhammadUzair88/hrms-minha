import React from "react";

const Cards = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full h-[101px] bg-[#F8F8F8] rounded-xl shadow-sm hover:shadow-md transition"
    >
      <div className="text-black">{icon}</div>
      <p className="mt-2 text-[16px] font-medium text-[#09182B]">{title}</p>
    </div>
  );
};

export default Cards;
