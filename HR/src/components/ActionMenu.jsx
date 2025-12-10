import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

const ActionMenu = ({ emp, openActionMenu, setOpenActionMenu, actions }) => {
  const buttonRef = useRef(null);
  const [openUpward, setOpenUpward] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".action-menu-fixed")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenActionMenu]);

  // Calculate menu direction + fixed position
  useEffect(() => {
    if (openActionMenu === emp.id && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const shouldOpenUp = viewportHeight - rect.bottom < 150;
      setOpenUpward(shouldOpenUp);

      setMenuPos({
        top: shouldOpenUp ? rect.top - 10 : rect.bottom + 10,
        left: rect.left + rect.width / 2,
      });
    }
  }, [openActionMenu, emp.id]);

  return (
    <div className="relative inline-block">
      {/* Toggle button */}
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpenActionMenu((prev) => (prev === emp.id ? null : emp.id));
        }}
        className="rounded hover:bg-gray-200 p-1"
      >
        <MoreVertical size={18} />
      </button>

      {/* Dropdown Menu - Now Fixed Position */}
      {openActionMenu === emp.id && (
        <div
          className="action-menu-fixed fixed z-50 w-32 bg-white rounded-xl shadow-xl"
          style={{
            top: menuPos.top,
            left: menuPos.left,
            transform: "translateX(-50%)",
          }}
        >
          <ul className="py-2 text-sm text-[#09182B] font-medium">
            {actions.map((action, index) => (
              <li
                key={index}
                onClick={() => {
                  action.onClick(emp);
                  setOpenActionMenu(null);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <action.icon className="w-4 h-4" />
                {action.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
