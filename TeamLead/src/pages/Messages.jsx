import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Messages = ({ onCancel, onSend }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full border-b border-black/30">
        <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
          <img
            src="/notifi.png"
            alt="back"
            onClick={() => navigate("/leaves")}
            className="cursor-pointer"
          />
          <h1>Leave Management</h1>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto mt-6">
        {/* TEXTAREA CONTAINER */}
        <div className="border rounded-xl p-4 bg-white shadow-sm h-48 relative">
          {/* Placeholder / Label */}
          {message.length === 0 && (
            <span className="text-gray-400 absolute top-4 left-4">
              Send Message
            </span>
          )}

          {/* ACTUAL TEXTAREA */}
          <textarea
            maxLength={50}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-full resize-none outline-none p-0 text-gray-800"
          />

          {/* CHARACTER COUNTER */}
          <span className="absolute bottom-4 right-4 text-gray-400 text-sm">
            {message.length}/50
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-md border text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>

          <Button label={"Send"} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
