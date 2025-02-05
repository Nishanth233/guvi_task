import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ApplicationForm from "./components/ApplicationForm";
import InterviewScheduler from "./components/InterviewScheduler";
import CompanyDashboard from "./components/CompanyDashboard";
import PlacementDriveManager from "./components/PlacementDriveManager";
import RecruitmentDashboard from "./components/RecruitmentDashboard";
import AcademicRecords from "./components/AcademicRecords";
import CompanyDataIntegration from "./components/CompanyDataIntegration";
import Reports from "./components/Reports";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import RegisterCompany from "./components/RegisterCompany";
import SubmittedApplications from "./components/SubmittedApplications";
import Navigation from "./components/Navigation";
import Home from "./components/Home.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import ContactUs from "./pages/ContactUs.jsx";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-2xl font-bold mb-6">
        College Placement Management System
      </h1>
      {userRole && <Navigation role={userRole} />}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/logout" element={<Logout setUserRole={setUserRole} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/applications" element={<ApplicationForm />} />
        <Route path="/interviews" element={<InterviewScheduler />} />
        <Route path="/companies" element={<CompanyDashboard />} />
        <Route path="/placement-drives" element={<PlacementDriveManager />} />
        <Route path="/recruitment" element={<RecruitmentDashboard />} />
        <Route path="/academic-records" element={<AcademicRecords />} />
        <Route path="/company-data" element={<CompanyDataIntegration />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route
          path="/submitted-applications"
          element={<SubmittedApplications />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
  );
};

export default App;
