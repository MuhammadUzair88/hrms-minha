import React, { useState } from "react";

const AddEvent = ({ setEventModalOpen }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!eventName || !date) return;

    const newEvent = { eventName, description, date };
    console.log("✅ New Event:", newEvent);

    // Close modal after adding
    setEventModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 border border-[#0E9EE7]">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Event
        </h2>

        <hr className="mb-4 border-b border-[#A2A1A8]/10" />

        {/* Form */}
        <form className="space-y-4" onSubmit={handleAdd}>
          {/* Event Name */}
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Description (moved before date) */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
            rows={2}
          />

          {/* Date Picker */}
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEventModalOpen(false)}
              className="w-1/2 px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 px-6 py-2 rounded-xl bg-[#0E9EE7] text-white font-medium hover:bg-[#0c8ecf]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
