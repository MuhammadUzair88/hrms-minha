import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyEmployees, dummyPerformanceReviews } from "../../assets/assets";
import { useToggle } from "../../context/Toggle";
import ToggleButton from "../../components/ToggleButton";

const ViewFeedback = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // ✅ Fetch review directly using employeeId (NO ID)
    const foundReview = dummyPerformanceReviews.find(
      (item) => item.employeeId === "EMP004"
    );

    if (foundReview) {
      setReview(foundReview);

      // Find employee info
      const emp = dummyEmployees.find(
        (e) => e.employeeId === foundReview.employeeId
      );

      setEmployee(emp);
    }
  }, []);
  const { toggleSidebar, isSidebarOpen } = useToggle();

  return (
    <div className="flex flex-col">
      <div className="w-full border-b border-black/30">
        <div className="px-4 py-6 flex items-center gap-3 font-semibold text-2xl tracking-tighter">
          <ToggleButton
            checked={isSidebarOpen}
            onChange={toggleSidebar}
            label=""
          />
          <h1 className="text-[#09182B]">Feedback</h1>
        </div>
      </div>

      <div className="px-[39px] pt-[26px]">
        {review ? (
          <div className="flex items-center justify-between">
            {/* Employee Info */}
            <div className="flex items-center gap-4">
              <img
                src={employee?.image || "/default-avatar.png"}
                alt={review.name}
                className="w-[60px] h-[60px] rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-semibold">{review.name}</h1>
                <h1 className="text-sm text-gray-600">
                  {employee?.department}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading employee data...</p>
        )}

        {/* Feedback Section */}
        <div className="px-[39px] pt-[26px]">
          <div className="w-full bg-[#E3E3E3]/15">
            <div className="px-[38px] py-[28px] flex flex-col gap-[21px]">
              <h1 className="font-medium text-[34px]">Feedback</h1>

              <div className="bg-white w-full py-12 px-8 shadow rounded-lg">
                <h1 className="text-[20px] font-medium">{review?.name}</h1>

                <p className="text-[#09182B] text-[20px] font-light tracking-wide">
                  {review?.feedback?.[0]?.content}
                </p>

                <p className="text-gray-500 mt-4 text-sm">
                  Reviewed by: {review?.feedback?.[0]?.reviewer} <br />
                  Date: {review?.feedback?.[0]?.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
