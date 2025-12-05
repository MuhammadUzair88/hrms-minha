// Documents.jsx
import React from "react";
import { Download } from "lucide-react";

const Documents = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return <div className="text-gray-500 mt-6">No documents uploaded.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {documents.map((doc, index) => (
        <button
          key={index}
          className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-gray-200 hover:shadow-sm transition duration-200"
        >
          <span className="text-[16px] font-medium text-gray-800">
            {doc.name}
          </span>
          <Download className="w-5 h-5 text-gray-500" />
        </button>
      ))}
    </div>
  );
};

export default Documents;
