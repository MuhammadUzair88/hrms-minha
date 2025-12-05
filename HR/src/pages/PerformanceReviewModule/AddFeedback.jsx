import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyEmployees, dummyPerformanceReviews } from "../../assets/assets";

const AddFeedback = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const found = dummyPerformanceReviews.find(
      (item) => String(item.id) === String(id) // compare properly
    );
    const EmployeeId = found.employeeId;
    const Employee = dummyEmployees.find(
      (emp) => String(emp.employeeId) === String(EmployeeId)
    );
    setEmployee(Employee);

    setReview(found);
  }, [id]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/performance")}
          className="cursor-pointer"
        />
        <h1>Add Feedback</h1>
      </div>

      <div className="px-[39px] pt-[26px]">
        {review ? (
          <div className="flex items-center gap-4">
            <img
              src={employee?.image || "/default-avatar.png"}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold">{review.name}</h1>
              <h1 className="text-sm text-gray-600">{employee?.department}</h1>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading employee data...</p>
        )}
        <div className="px-[39px] pt-[26px]">
          <div className="w-full bg-[#E3E3E3]/15  ">
            <div className="px-[38px] py-[28px] flex flex-col gap-[21px]">
              <h1 className="font-medium text-[34px]">FeedBack</h1>
              <div className="bg-white w-full py-12 px-8 shadow rounded-lg">
                <h1 className="text-[20px] font-medium">{review?.name}</h1>
                <p className="text-[#09182B] text-[20px] font-light tracking-wide">
                  {review?.feedback?.[0]?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end px-14 pt-6">
        {" "}
        <button
          onClick={() => navigate("/performance")}
          className="bg-[#0E9EE7] py-1 px-8 flex items-center justify-center text-white rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddFeedback;
