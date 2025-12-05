// src/pages/CompanyExpense/EditExpense.jsx
import React, { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { dummyExpenses } from "../../assets/assets";
import Table from "../../components/Table";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const expense = dummyExpenses.find((e) => e.id === parseInt(id));
    if (expense) {
      setData(expense);
    }
  }, [id]);

  const columns = [
    "Date",
    "Category",
    "Name",
    "Description",
    "Taker",
    "Rs.",
    "Status",
    "Action",
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/expenses")}
          className="cursor-pointer"
        />
        <h1>Edit Company Expense</h1>
      </div>

      {/* Table */}
      <div className="px-[39px] pt-[26px]">
        <Table
          columns={columns}
          data={data ? [data] : []}
          renderRow={(expense) => [
            expense.date,
            expense.category,
            <span className="font-medium">{expense.name}</span>,
            expense.description || "-",
            expense.taker,
            expense.amount,
            <span
              className={`px-3 py-1 rounded-md text-sm text-white ${
                expense.status === "Completed" ? "bg-[#00B172]" : "bg-gray-700"
              }`}
            >
              {expense.status}
            </span>,
            <button className="bg-[#0E9EE7] text-white px-5  rounded-lg">
              Save
            </button>,
          ]}
        />

        {!data && (
          <div className="text-center py-6 text-gray-500">
            No expense found.
          </div>
        )}
      </div>
    </div>
  );
};

export default EditExpense;
