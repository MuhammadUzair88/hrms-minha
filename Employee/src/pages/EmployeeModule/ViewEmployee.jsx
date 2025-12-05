import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyEmployees } from "../../assets/assets";
import { Briefcase, FileText, Handbag, Lock, User } from "lucide-react";
import { TfiEmail } from "react-icons/tfi";
import PersonalInfo from "../../components/employee/viewEmployee/PersonalInfo";
import ProfessionalInfo from "../../components/employee/viewEmployee/ProfessionalInfo";
import Documents from "../../components/employee/viewEmployee/Documents";
import AccountAccess from "../../components/employee/viewEmployee/AccountAccess";

const ViewEmployee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch employee directly (no ID, no useParams)
  useEffect(() => {
    const employee = dummyEmployees.find((emp) => emp.id === 2);
    setSelectedEmployee(employee);
  }, []);

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

  if (!selectedEmployee) return <div>Loading...</div>;

  // Personal Info
  const personalInfoFields = [
    { label: "Name", value: selectedEmployee.name || "-" },
    {
      label: "Email Address",
      value: selectedEmployee.personalInfo?.email || "-",
    },
    {
      label: "Mobile Number",
      value: selectedEmployee.personalInfo?.contactNumber || "-",
    },
    {
      label: "Emergency Contact",
      value: selectedEmployee.personalInfo?.emergencyContact || "-",
    },
    {
      label: "Joining Date",
      value: selectedEmployee.personalInfo?.joiningDate || "-",
    },
    { label: "Designation", value: selectedEmployee.designation || "-" },
    { label: "Department", value: selectedEmployee.department || "-" },
    { label: "Employee ID", value: selectedEmployee.employeeId || "-" },
    { label: "Type", value: selectedEmployee.type || "-" },
    { label: "Status", value: selectedEmployee.status || "-" },
  ];

  // Professional Info
  const professionalInfoFields = [
    {
      label: "Experience (Years)",
      value: selectedEmployee.professionalInfo?.experienceYears || "-",
    },
    {
      label: "Previous Employer",
      value: selectedEmployee.professionalInfo?.previousEmployer || "-",
    },
    {
      label: "Skills",
      value: selectedEmployee.professionalInfo?.skills?.join(", ") || "-",
    },
    {
      label: "Projects",
      value: selectedEmployee.professionalInfo?.projects?.join(", ") || "-",
    },
    {
      label: "Trainings",
      value: selectedEmployee.professionalInfo?.trainings?.join(", ") || "-",
    },
    {
      label: "Reporting To",
      value: selectedEmployee.professionalInfo?.reportingTo || "-",
    },
    {
      label: "Team Size",
      value: selectedEmployee.professionalInfo?.teamSize || "-",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/employees")}
          className="cursor-pointer"
        />
        <h1>Employee Management</h1>
      </div>

      {/* Profile Info */}
      <div className="px-[39px] pt-[26px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={selectedEmployee.image}
            className="w-[101px] h-[101px] object-cover rounded-lg"
            alt="profile"
          />
          <div className="flex flex-col gap-2 text-[#09182B]">
            <h1 className="font-semibold text-xl">
              {selectedEmployee.name}{" "}
              <span className="text-[#3FC28A] text-lg">(Active)</span>
            </h1>

            <h1 className="flex items-center gap-1 font-light text-[16px]">
              <Handbag size={20} />
              <span>{selectedEmployee.designation}</span>
            </h1>

            <h1 className="flex items-center gap-1 font-light text-[16px]">
              <TfiEmail size={20} />
              <span>{selectedEmployee.personalInfo?.email}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8">
        <div className="rounded-lg mt-6 pb-10">
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
            <Documents documents={selectedEmployee.documents} />
          )}
          {activeTab === "account" && (
            <AccountAccess access={selectedEmployee.accountAccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
