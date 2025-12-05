import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  dummyInterns,
  dummyInternPerformanceReviews,
} from "../../../assets/assets";
import Button from "../../../components/Button";

const InternViewFeedback = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [intern, setIntern] = useState(null);

  useEffect(() => {
    const found = dummyInternPerformanceReviews.find(
      (item) => String(item.id) === String(id)
    );
    if (!found) return;

    const InternId = found.internId;
    const Intern = dummyInterns.find(
      (i) => String(i.professionalInfo.employeeId) === String(InternId)
    );

    setIntern(Intern);
    setReview(found);
  }, [id]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/intern-performance-review")}
          className="cursor-pointer"
        />
        <h1>View Feedback</h1>
      </div>

      <div className="px-[39px] pt-[26px]">
        {review ? (
          <div className="flex items-center gap-4">
            <img
              src={intern?.image || "/default-avatar.png"}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold">{review.name}</h1>
              <h1 className="text-sm text-gray-600">{intern?.department}</h1>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading intern data...</p>
        )}

        <div className="px-[39px] pt-[26px]">
          <div className="w-full bg-[#E3E3E3]/15">
            <div className="px-[38px] py-[28px] flex flex-col gap-[21px]">
              <h1 className="font-medium text-[34px]">Feedback</h1>
              <div className="bg-white w-full py-12 px-8 shadow rounded-lg">
                <h1 className="text-[20px] font-medium">{review?.name}</h1>
                <p className="text-[#09182B] text-[20px] font-light tracking-wide">
                  {review?.feedback?.[0]?.content || "No feedback yet"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-end pr-[73px] pt-[26px]">
        <Button
          label={"Save"}
          onClick={() => navigate("/intern-performance-review")}
        />
      </div>
    </div>
  );
};

export default InternViewFeedback;
