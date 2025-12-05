import React, { useRef, useState, useEffect } from "react";
import Button from "../../Button";

const PersonalInfo = ({ data, setData }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(
    data?.photo || "/Profile Photo.png"
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Set initial image if exists in parent
    if (data?.photo) {
      setSelectedPhoto(data.photo);
    }
  }, [data]);

  const handlePhotoClick = () => fileInputRef.current.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedPhoto(imageUrl);
      setData((prev) => ({ ...prev, photo: imageUrl }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const required = ["firstName", "lastName", "email"];
    const missing = required.find((key) => !data?.[key]);
    if (missing) {
      alert(`Please fill out ${missing} before proceeding.`);
      return;
    }
    const event = new CustomEvent("nextTab", { detail: "professional" });
    window.dispatchEvent(event);
  };

  const inputClass =
    "px-[30px] py-[10px] w-full h-[56px] bg-white border border-[#E3E3E34D] rounded-[12px] text-sm outline-none";

  const labelClass = "text-black text-[16px] mb-1 font-semibold";

  return (
    <div className="px-1 py-10 flex flex-col gap-5">
      {/* Photo Upload */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={handlePhotoClick}
      >
        <img
          src={selectedPhoto}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full"
        />
        <h1 className="font-semibold text-[16px]">Choose Photo</h1>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handlePhotoChange}
        style={{ display: "none" }}
      />

      {/* Form Fields */}
      <div className="flex flex-col gap-6 mt-4">
        {/* Row 1 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>First Name</label>
            <input
              className={inputClass}
              type="text"
              name="firstName"
              value={data.firstName || ""}
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Last Name</label>
            <input
              className={inputClass}
              type="text"
              name="lastName"
              value={data.lastName || ""}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Mobile Number</label>
            <input
              className={inputClass}
              type="text"
              name="mobile"
              value={data.mobile || ""}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Email Address</label>
            <input
              className={inputClass}
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              placeholder="Email Address"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Date of Birth</label>
            <input
              className={inputClass}
              type="date"
              name="dob"
              value={data.dob || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Marital Status</label>
            <select
              className={inputClass}
              name="maritalStatus"
              value={data.maritalStatus || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>Gender</label>
            <select
              className={inputClass}
              name="gender"
              value={data.gender || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="w-full">
            <label className={labelClass}>Nationality</label>
            <input
              className={inputClass}
              type="text"
              name="nationality"
              value={data.nationality || ""}
              onChange={handleChange}
              placeholder="Nationality"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>Address</label>
          <input
            className={inputClass}
            type="text"
            name="address"
            value={data.address || ""}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        {/* Row 5 */}
        <div className="flex gap-6">
          <div className="w-full">
            <label className={labelClass}>City</label>
            <select
              className={inputClass}
              name="city"
              value={data.city || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="newyork">New York</option>
              <option value="losangeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
            </select>
          </div>
          <div className="w-full">
            <label className={labelClass}>Bank Name</label>
            <input
              className={inputClass}
              type="text"
              name="bankName"
              value={data.bankName || ""}
              onChange={handleChange}
              placeholder="Bank Name"
            />
          </div>
          <div className="w-full">
            <label className={labelClass}>Account Number</label>
            <input
              className={inputClass}
              type="text"
              name="accountNumber"
              value={data.accountNumber || ""}
              onChange={handleChange}
              placeholder="Account Number"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-10">
        <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600">
          Cancel
        </button>
        <Button label={"Next"} />
      </div>
    </div>
  );
};

export default PersonalInfo;
