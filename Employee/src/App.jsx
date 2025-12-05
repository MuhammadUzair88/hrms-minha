import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";

import ViewEmployee from "./pages/EmployeeModule/ViewEmployee";

import ViewAttendence from "./pages/AttendenceModule/ViewAttendence";

import LeaveApplication from "./pages/LeaveModule/LeaveApplication";

import ViewLeaves from "./pages/LeaveModule/ViewLeaves";

import ViewPayroll from "./pages/PayrollModule/ViewPayroll";

import ViewFeedback from "./pages/PerformanceReviewModule/ViewFeedback";

import TaskManagement from "./pages/TaskManagement/TaskManagement";
import Announcements from "./pages/AnnouncementBoard/Announcements";

import TaskStatus from "./pages/TaskManagement/TaskStatus";
import LeaveApplicationForm from "./pages/LeaveModule/LeaveApplicationForm";
import Messages from "./pages/Messages";
import DailyWork from "./pages/DailyWorkTimer/DailyWork";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/employee" element={<ViewEmployee />} />
        <Route path="/attendence" element={<ViewAttendence />} />
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="/newleave" element={<LeaveApplicationForm />} />
        <Route path="/leaves" element={<ViewLeaves />} />
        <Route path="/payroll" element={<ViewPayroll />} />
        <Route path="/feedback" element={<ViewFeedback />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/task-management/task-status" element={<TaskStatus />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/dailywork" element={<DailyWork />} />
      </Route>
    </Routes>
  );
};

export default App;
