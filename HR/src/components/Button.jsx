import React from "react";

const Button = ({ label, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#0E9EE7] hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-4 py-2 flex items-center gap-2"
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default Button;
