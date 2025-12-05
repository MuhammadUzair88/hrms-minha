import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyInterns } from "../../../assets/assets";

// Icons
import { User, Briefcase, FileText, Lock } from "lucide-react";
import PersonalInfo from "../../../components/Interns/EditInterns/PersonalInfo";
import ProfessionalInfo from "../../../components/Interns/EditInterns/ProfessionalInfo";
import Documents from "../../../components/Interns/EditInterns/Documents";
import AccountAccess from "../../../components/Interns/EditInterns/AccountAccess";

const EditIntern = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [personalData, setPersonalData] = useState({});
  const [professionalData, setProfessionalData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const intern = dummyInterns.find((i) => i.id === parseInt(id));
    if (!intern) {
      alert("Intern not found!");
      navigate("/interns");
      return;
    }

    // Pre-fill data

    setPersonalData({
      firstName: intern.internName.split(" ")[0], // split for form
      lastName: intern.internName.split(" ")[1] || "",
      photo: intern.image || "/Profile Photo.png",
      mobile: intern.personalInfo?.contactNumber || "",
      email: intern.personalInfo?.email || "",
      address: intern.personalInfo?.address || "",
      dob: intern.personalInfo?.dob || "",
      gender: intern.personalInfo?.gender || "",
      nationality: intern.personalInfo?.nationality || "",
      city: intern.personalInfo?.city || "",
      university: intern.personalInfo?.university || "",
      degree: intern.personalInfo?.degree || "",
      semester: intern.personalInfo?.semester || "",
      bankName: intern.personalInfo?.bankName || "",
      accountNumber: intern.personalInfo?.accountNumber || "",
    });

    setProfessionalData({
      employeeId: intern.professionalInfo.employeeId, // fallback
      username: intern.internName.replace(" ", "").toLowerCase(),
      employeeType: intern.type,
      email: intern.personalInfo?.email || "",
      department: intern.department,
      designation: intern.designation,
      workingDays: "5 Days", // default
      joiningDate: intern.startDate,
      fixedSalary: "0", // default
    });

    setDocumentData(intern.documents || {});
    setAccountData(intern.accountAccess || {});
  }, [id, navigate]);

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

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleFinalSubmit = () => {
    const fullData = {
      personal: personalData,
      professional: professionalData,
      documents: documentData,
      account: accountData,
    };
    console.log("Updated Intern Data:", fullData);
    alert("Intern data updated! (Check console)");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-black/30 px-4 py-6 flex items-center gap-3 text-2xl font-semibold">
        <img
          src="/notifi.png"
          alt="back"
          onClick={() => navigate("/interns")}
          className="cursor-pointer"
        />
        <h1>Edit Intern</h1>
      </div>

      {/* Tabs */}
      <div className="px-[39px] pt-[26px]">
        <div className="bg-[#E3E3E3]/15 shadow-md rounded-lg">
          <div className="flex gap-6 border-b border-gray-200 ">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`flex items-center gap-2 px-2 py-3 font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="px-6">
            {activeTab === "personal" && (
              <PersonalInfo data={personalData} setData={setPersonalData} />
            )}
            {activeTab === "professional" && (
              <ProfessionalInfo
                data={professionalData}
                setData={setProfessionalData}
              />
            )}
            {activeTab === "documents" && (
              <Documents data={documentData} setData={setDocumentData} />
            )}
            {activeTab === "account" && (
              <AccountAccess
                data={accountData}
                setData={setAccountData}
                onSubmit={handleFinalSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIntern;
