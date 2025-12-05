import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Subcomponents

// Icons
import { User, Briefcase, FileText, Lock } from "lucide-react";
import PersonalInfo from "../../../components/Interns/AddInterns/PersonalInfo";
import ProfessionalInfo from "../../../components/Interns/AddInterns/ProfessionalInfo";
import Documents from "../../../components/Interns/AddInterns/Documents";
import AccountAccess from "../../../components/Interns/AddInterns/AccountAccess";

const AddIntern = () => {
  const navigate = useNavigate();

  // Form data states
  const [personalData, setPersonalData] = useState({});
  const [professionalData, setProfessionalData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [accountData, setAccountData] = useState({});

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
    console.log("Submitted Intern Data:", fullData);
    alert("Data logged to console!");
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
        <h1>Intern Management</h1>
      </div>

      {/* Tabs */}
      <div className="px-10">
        <div className="bg-[#E3E3E3]/15 shadow-md rounded-lg mt-6 pb-10">
          <div className="flex gap-6 mt-6 border-b border-gray-200 px-6">
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

export default AddIntern;
