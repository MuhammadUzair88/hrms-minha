import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import EmployeeManagement from "./pages/EmployeeModule/EmployeeManagement";
import AddEmployee from "./pages/EmployeeModule/AddEmployees";
import ViewEmployee from "./pages/EmployeeModule/ViewEmployee";
import EditEmployee from "./pages/EmployeeModule/EditEmployee";
import AttendanceManagement from "./pages/AttendenceModule/AttendenceManagement";
import AllEmployees from "./pages/AttendenceModule/AllEmployees";
import ViewAttendence from "./pages/AttendenceModule/ViewAttendence";
import EditAttendence from "./pages/AttendenceModule/EditAttendence";
import ExportAttendence from "./pages/AttendenceModule/ExportAttendence";
import LeaveManagement from "./pages/LeaveModule/LeaveManagement";
import LeaveApplication from "./pages/LeaveModule/LeaveApplication";
import AllEmployeesLeaves from "./pages/LeaveModule/AllEmployeesLeaves";
import ViewLeaves from "./pages/LeaveModule/ViewLeaves";
import PayRollManagement from "./pages/PayrollModule/PayRollManagement";
import AllEmployeesPayroll from "./pages/PayrollModule/AllEmployeesPayroll";
import ViewPayroll from "./pages/PayrollModule/ViewPayroll";
import PerformanceReview from "./pages/PerformanceReviewModule/PerformanceReview";
import AddFeedback from "./pages/PerformanceReviewModule/AddFeedback";
import ViewFeedback from "./pages/PerformanceReviewModule/ViewFeedback";
import EditFeedback from "./pages/PerformanceReviewModule/EditFeedback";
import TaskManagement from "./pages/TaskManagement/TaskManagement";
import Announcements from "./pages/AnnouncementBoard/Announcements";
import EditHoliday from "./components/Announcement/Holidays/EditHoliday";
import EditMeeting from "./components/Announcement/Meetings/EditMeeting";
import EditEvent from "./components/Announcement/Events/EditEvent";
import CompanyExpense from "./pages/CompanyExpense/CompanyExpense";
import InternManagement from "./pages/IternManagement/InternManagement";
import EditIntern from "./pages/IternManagement/EditIntern";
import InternCertificate from "./pages/IternManagement/InternCertificate/InternCertificate";
import ViewCertificate from "./pages/IternManagement/InternCertificate/ViewCertificate";
import AddCertificate from "./pages/IternManagement/InternCertificate/AddCertificate";
import EditCertificate from "./pages/IternManagement/InternCertificate/EditCertificate";
import InternsProfile from "./pages/IternManagement/InternsProfile/InternsProfile";
import AddIntern from "./components/Interns/AddIntern";
import AddIntern2 from "./pages/IternManagement/InternsProfile/AddIntern";
import EditIntern2 from "./pages/IternManagement/InternsProfile/EditIntern";
import ViewIntern from "./pages/IternManagement/InternsProfile/ViewIntern";
import InternAttendanceManagement from "./pages/IternManagement/InternAttendence/InternAttendenceManagement";
import AllInterns from "./pages/IternManagement/InternAttendence/AllInterns";
import ViewInternAttendance from "./pages/IternManagement/InternAttendence/ViewInternAttendence";
import EditInternAttendence from "./pages/IternManagement/InternAttendence/EditInternAttendence";
import InternPerformanceReview from "./pages/IternManagement/InternPerformanceReview/InternPerformanceReview";
import InternAddFeedback from "./pages/IternManagement/InternPerformanceReview/InternAddFeedback";
import InternViewFeedback from "./pages/IternManagement/InternPerformanceReview/InternViewFeedback";
import EditExpense from "./pages/CompanyExpense/EditExpense";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/employees" element={<EmployeeManagement />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/viewemployee/:id" element={<ViewEmployee />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/allemployees" element={<AllEmployees />} />
        <Route path="/view-attendance/:id" element={<ViewAttendence />} />
        <Route path="/edit-attendance/:id" element={<EditAttendence />} />
        <Route path="/export-attendance/:id" element={<ExportAttendence />} />
        <Route path="/leaves" element={<LeaveManagement />} /> 
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="/leaves-allemployees" element={<AllEmployeesLeaves />} />
        <Route path="/view-leaves/:id" element={<ViewLeaves />} />
        <Route path="/payroll" element={<PayRollManagement />} />
        <Route path="/payroll-allemployees" element={<AllEmployeesPayroll />} />
        <Route path="/view-payroll/:id" element={<ViewPayroll />} />
        <Route path="/performance" element={<PerformanceReview />} />
        <Route path="/add-feedback/:id" element={<AddFeedback />} />
        <Route path="/view-feedback/:id" element={<ViewFeedback />} />
        <Route path="/edit-feedback/:id" element={<EditFeedback />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/edit-holiday/:id" element={<EditHoliday />} />
        <Route path="/edit-meeting/:id" element={<EditMeeting />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/expenses" element={<CompanyExpense />} />
        <Route path="/expenses-edit/:id" element={<EditExpense />} />
        <Route path="/interns" element={<InternManagement />} />
        <Route path="/edit-intern/:id" element={<EditIntern />} />
        <Route path="/intern-certificate" element={<InternCertificate />} />
        <Route
          path="/intern-certificate/view/:id"
          element={<ViewCertificate />}
        />
        <Route path="/intern-certificate/add" element={<AddCertificate />} />
        <Route
          path="/intern-certificate/edit/:id"
          element={<EditCertificate />}
        />
        <Route path="/intern-profile" element={<InternsProfile />} />
        <Route path="/intern-profile/add" element={<AddIntern2 />} />
        <Route path="/intern-profile/edit/:id" element={<EditIntern2 />} />
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
          path="/intern-attendence/edit/:id"
          element={<EditInternAttendence />}
        />
        <Route
          path="/intern-performance-review"
          element={<InternPerformanceReview />}
        />
        <Route
          path="/intern-performance-review/feedback/:id"
          element={<InternAddFeedback />}
        />
        <Route
          path="/intern-performance-review/feedback/view/:id"
          element={<InternViewFeedback />}
        />
      </Route>
    </Routes>
  );
};

export default App;
