import React from "react";
import { X } from "lucide-react";

const CheckInModal = ({ onClose, onCheckout }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[486px] h-64 relative">
        <div className="w-full h-full bg-sky-500 rounded-xl relative p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl text-white font-semibold mb-2">
            Clock Out at 08h 00m 05s
          </h2>

          <p className="text-white text-base mb-8">
            Your total working time for today is 08h 00m 05s
          </p>

          {/* Checkout Button */}
          <button
            onClick={() => {
              onCheckout();
              onClose();
            }}
            className="absolute bottom-6 right-6 bg-sky-500 border border-white 
                       text-white font-bold text-lg rounded-lg px-6 py-2"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
