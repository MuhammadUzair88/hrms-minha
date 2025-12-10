// src/components/common/Table.jsx
import React from "react";

const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="relative shadow-md rounded-lg bg-white ">
      {/* Scrollable container */}
      <div className="overflow-x-auto">
        <table className="w-full  text-sm text-left rtl:text-right text-black border-collapse min-w-max">
          {/* Header */}
          <thead className="uppercase bg-gray-200 border-b border-gray-400">
            <tr className="h-14">
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-6 py-2 font-semibold text-sm truncate w-[100px]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className="h-14 bg-white border-b border-gray-300"
              >
                {renderRow(row, index).map((cell, i) => (
                  <td
                    key={i}
                    className={`px-6 py-2 align-middle ${
                      columns[i] === "Action" ? "w-auto" : "truncate w-[100px]"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
