import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Login from "./pages/Login";

import Assign from "./pages/ProjectManager/Assign";
import CheckPerformance from "./pages/ProjectManager/CheckPerformance";
import ViewAssign from "./pages/ProjectManager/ViewAssign";
import ViewTask from "./pages/ProjectManager/ViewTask";
import EditTask from "./pages/ProjectManager/EditTask";
import ViewReports from "./pages/ProjectManager/ViewReports";
import ViewSingleReport from "./pages/ProjectManager/ViewSingleReport";
import GenerateReport from "./pages/ProjectManager/GenerateReport";
import ProjectManager from "./pages/ProjectManager/ProjectManager";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ProjectManager />} />
        <Route path="/assign/:id" element={<Assign />} />
        <Route path="/check-performance" element={<CheckPerformance />} />
        <Route path="/view-assign" element={<ViewAssign />} />
        <Route path="/view-task/:id" element={<ViewTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/view-reports" element={<ViewReports />} />
        <Route path="/view-single-report/:id" element={<ViewSingleReport />} />
        <Route path="/generate-report" element={<GenerateReport />} />
      </Route>
    </Routes>
  );
};

export default App;
