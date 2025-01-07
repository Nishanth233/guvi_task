import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterStudent from "./components/RegisterStudent";
import ScheduleInterview from "./components/ScheduleInterview";
import ManageCompanies from "./components/ManageCompanies";
import ManagePlacementDrives from "./components/ManagePlacementDrives";
import AcademicRecords from "./components/AcademicRecords";
import Reports from "./components/Reports";
import Home from "./components/Home";
import ScheduledInterviews from "./components/ScheduledInterviews";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import "./App.css";

function App() {
  const [studentId, setStudentId] = useState(null);

  return (
    <Router>
      <div className="App">
        <main className="p-6 space-y-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register-student"
              element={
                <RegisterStudent
                  setStudentId={setStudentId}
                  studentId={studentId}
                />
              }
            />
            <Route path="/schedule-interview" element={<ScheduleInterview />} />
            <Route path="/manage-companies" element={<ManageCompanies />} />
            <Route
              path="/manage-placement-drives"
              element={<ManagePlacementDrives />}
            />
            <Route
              path="/academic-records"
              element={<AcademicRecords studentId={studentId} />}
            />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/scheduled-interviews"
              element={<ScheduledInterviews />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
