import React, { useState } from "react";

const AddExpense = ({ setOpenAddModal }) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    const newExpense = { category, description, date, amount, status };
    console.log("✅ New Expense:", newExpense);

    // Close modal after adding
    setOpenAddModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 border border-[#0E9EE7]">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New</h2>

        <hr className="mb-4 border-b border-[#A2A1A8]/10" />

        {/* Form */}
        <form className="space-y-4" onSubmit={handleAdd}>
          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Status */}
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0E9EE7] text-gray-700"
          />

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpenAddModal(false)}
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

export default AddExpense;
