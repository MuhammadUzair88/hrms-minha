import React from "react";

const Button = ({ label, onClick, icon: Icon, className = "", disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-[#0E9EE7] hover:bg-sky-600 text-white text-sm font-medium 
        rounded-lg px-4 py-2 flex items-center gap-2
        ${disabled ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""}
        ${className}
      `}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default Button;
