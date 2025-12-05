import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

import EmployeeManagement from "./pages/EmployeeModule/EmployeeManagement";

import ViewEmployee from "./pages/EmployeeModule/ViewEmployee";

import AttendanceManagement from "./pages/AttendenceModule/AttendenceManagement";
import AllEmployees from "./pages/AttendenceModule/AllEmployees";
import ViewAttendence from "./pages/AttendenceModule/ViewAttendence";

import LeaveManagement from "./pages/LeaveModule/LeaveManagement";
import LeaveApplication from "./pages/LeaveModule/LeaveApplication";
import AllEmployeesLeaves from "./pages/LeaveModule/AllEmployeesLeaves";
import ViewLeaves from "./pages/LeaveModule/ViewLeaves";
import PayRollManagement from "./pages/PayrollModule/PayRollManagement";
import AllEmployeesPayroll from "./pages/PayrollModule/AllEmployeesPayroll";
import ViewPayroll from "./pages/PayrollModule/ViewPayroll";
import PerformanceReview from "./pages/PerformanceReviewModule/PerformanceReview";

import TaskManagement from "./pages/TaskManagement/TaskManagement";
import Announcements from "./pages/AnnouncementBoard/Announcements";

import CompanyExpense from "./pages/CompanyExpense/CompanyExpense";
import InternManagement from "./pages/IternManagement/InternManagement";
import EditIntern from "./pages/IternManagement/EditIntern";
import InternCertificate from "./pages/IternManagement/InternCertificate/InternCertificate";
import ViewCertificate from "./pages/IternManagement/InternCertificate/ViewCertificate";

import InternsProfile from "./pages/IternManagement/InternsProfile/InternsProfile";

import ViewIntern from "./pages/IternManagement/InternsProfile/ViewIntern";
import InternAttendanceManagement from "./pages/IternManagement/InternAttendence/InternAttendenceManagement";
import AllInterns from "./pages/IternManagement/InternAttendence/AllInterns";
import ViewInternAttendance from "./pages/IternManagement/InternAttendence/ViewInternAttendence";

import InternPerformanceReview from "./pages/IternManagement/InternPerformanceReview/InternPerformanceReview";

import NewProject from "./components/TaskManager/NewProject";
import EditProject from "./components/TaskManager/EditProject";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/viewemployee/:id" element={<ViewEmployee />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/allemployees" element={<AllEmployees />} />
        <Route path="/view-attendance/:id" element={<ViewAttendence />} />
        <Route path="/leaves" element={<LeaveManagement />} /> //errors
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="/leaves-allemployees" element={<AllEmployeesLeaves />} />
        <Route path="/view-leaves/:id" element={<ViewLeaves />} />
        <Route path="/payroll" element={<PayRollManagement />} />
        <Route path="/payroll-allemployees" element={<AllEmployeesPayroll />} />
        <Route path="/view-payroll/:id" element={<ViewPayroll />} />
        <Route path="/performance" element={<PerformanceReview />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/task-management/newproject" element={<NewProject />} />
        <Route
          path="/task-management/editproject/:id"
          element={<EditProject />}
        />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/expenses" element={<CompanyExpense />} />
        <Route path="/interns" element={<InternManagement />} />
        <Route path="/edit-intern/:id" element={<EditIntern />} />
        <Route path="/intern-certificate" element={<InternCertificate />} />
        <Route
          path="/intern-certificate/view/:id"
          element={<ViewCertificate />}
        />
        <Route path="/intern-profile" element={<InternsProfile />} />
        <Route path="/intern-profile/view/:id" element={<ViewIntern />} />
        <Route
          path="/intern-attendence"
          element={<InternAttendanceManagement />}
        />
        <Route path="/intern-attendence/allinterns" element={<AllInterns />} />
        <Route
          path="/intern-attendence/view/:id"
          element={<ViewInternAttendance />}
        />
        <Route
          path="/intern-performance-review"
          element={<InternPerformanceReview />}
        />
      </Route>
    </Routes>
  );
};

export default App;
