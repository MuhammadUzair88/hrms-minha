import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyEmployees } from "../../assets/assets";

// Icons
import { User, Briefcase, FileText, Lock } from "lucide-react";
import PersonalInfo from "../../components/employee/editEmployee/PersonalInfo";
import ProfessionalInfo from "../../components/employee/editEmployee/ProfessionalInfo";
import Documents from "../../components/employee/editEmployee/Documents";
import AccountAccess from "../../components/employee/editEmployee/AccountAccess";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [personalData, setPersonalData] = useState({});
  const [professionalData, setProfessionalData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const [accountData, setAccountData] = useState({});
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const employee = dummyEmployees.find((emp) => emp.id === parseInt(id));
    if (!employee) {
      alert("Employee not found!");
      navigate("/employees");
      return;
    }

    // Pre-fill data
    setPersonalData({
      ...employee.personalInfo,
      firstName: employee.name.split(" ")[0],
      lastName: employee.name.split(" ")[1] || "",
      photo: employee.image,
      mobile: employee.personalInfo.contactNumber,
      email: employee.personalInfo.email,
      address: employee.personalInfo.address,
      dob: employee.personalInfo.dob,
      maritalStatus: employee.personalInfo.maritalStatus,
      gender: employee.personalInfo.gender,
      nationality: employee.personalInfo.nationality,
      city: employee.personalInfo.city,
      bankName: employee.personalInfo.bankName,
      accountNumber: employee.personalInfo.accountNumber,
    });

    setProfessionalData({
      ...employee.professionalInfo,
      employeeId: employee.employeeId,
      department: employee.department,
      designation: employee.designation,
      type: employee.type,
      status: employee.status,
    });

    // setDocumentData({
    //   documents: employee.documents,
    //   appointment: true, // Simulate the logic
    // });

    setAccountData(employee.accountAccess);
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
    console.log("Updated Employee Data:", fullData);
    alert("Employee data updated! (Check console)");
  };

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
        <h1>Edit Employee</h1>
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

export default EditEmployee;
