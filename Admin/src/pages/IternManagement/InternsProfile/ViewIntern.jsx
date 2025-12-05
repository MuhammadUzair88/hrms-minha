import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyInterns } from "../../../assets/assets";
import {
  Briefcase,
  FileText,
  Handbag,
  Lock,
  User,
  PencilIcon,
} from "lucide-react";
import { TfiEmail } from "react-icons/tfi";

import Button from "../../../components/Button";
import PersonalInfo from "../../../components/Interns/ViewInterns/PersonalInfo";
import ProfessionalInfo from "../../../components/Interns/ViewInterns/ProfessionalInfo";
import Documents from "../../../components/Interns/ViewInterns/Documents";
import AccountAccess from "../../../components/Interns/ViewInterns/AccountAccess";

const ViewIntern = () => {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const intern = dummyInterns.find((int) => int.id === Number(id));
    setSelectedIntern(intern);
  }, [id]);

  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    {
      key: "personal",
      label: "Personal Info",
      icon: <User className="w-4 h-4" />,
    },
    {
      key: "professional",
      label: "Professional Info",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      key: "documents",
      label: "Documents",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      key: "account",
      label: "Account Access",
      icon: <Lock className="w-4 h-4" />,
    },
  ];

  if (!selectedIntern) {
    return <div>Loading...</div>;
  }

  // personal info
  const personalInfoFields = [
    { label: "Intern Name", value: selectedIntern.internName || "-" },
    {
      label: "Email Address",
      value: selectedIntern.personalInfo?.email || "-",
    },
    {
      label: "Mobile Number",
      value: selectedIntern.personalInfo?.contactNumber || "-",
    },
    {
      label: "Emergency Contact",
      value: selectedIntern.personalInfo?.emergencyContact || "-",
    },
    {
      label: "Joining Date",
      value: selectedIntern.personalInfo?.joiningDate || "-",
    },
    { label: "Start Date", value: selectedIntern.startDate || "-" },
    { label: "Designation", value: selectedIntern.designation || "-" },
    { label: "Department", value: selectedIntern.department || "-" },
    {
      label: "Employee ID",
      value: selectedIntern.professionalInfo?.employeeId || "-",
    },
    { label: "Type", value: selectedIntern.type || "-" },
    { label: "Status", value: selectedIntern.status || "-" },
  ];

  // professional info
  const professionalInfoFields = [
    {
      label: "Skills",
      value: selectedIntern.professionalInfo?.skills?.join(", ") || "-",
    },
    {
      label: "Projects",
      value: selectedIntern.professionalInfo?.projects?.join(", ") || "-",
    },
    {
      label: "Trainings",
      value: selectedIntern.professionalInfo?.trainings?.join(", ") || "-",
    },
    {
      label: "Reporting To",
      value: selectedIntern.professionalInfo?.reportingTo || "-",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/intern-profile")}
          className="cursor-pointer"
        />
        <h1>Intern Management</h1>
      </div>

      {/* Profile Info */}
      <div className="px-[39px] pt-[26px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={selectedIntern.image}
            className="w-[101px] h-[101px] object-cover rounded-lg"
            alt="profile"
          />
          <div className="flex flex-col gap-2 text-[#09182B]">
            <h1 className="font-semibold text-xl">
              {selectedIntern.internName}{" "}
              <span className="text-[#3FC28A] text-lg">
                ({selectedIntern.status})
              </span>
            </h1>
            <h1 className="flex items-center gap-1 font-light text-[16px]">
              <Handbag size={20} />
              <span>{selectedIntern.designation}</span>
            </h1>
            <h1 className="flex items-center gap-1 font-light text-[16px]">
              <TfiEmail size={20} />
              <span>{selectedIntern.personalInfo?.email}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8">
        <div className="rounded-lg mt-6 pb-10">
          {/* Tab Buttons */}
          <div className="flex gap-6 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-2 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && (
            <PersonalInfo fields={personalInfoFields} />
          )}
          {activeTab === "professional" && (
            <ProfessionalInfo fields={professionalInfoFields} />
          )}
          {activeTab === "documents" && (
            <Documents documents={selectedIntern.documents} />
          )}
          {activeTab === "account" && (
            <AccountAccess access={selectedIntern.accountAccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewIntern;
