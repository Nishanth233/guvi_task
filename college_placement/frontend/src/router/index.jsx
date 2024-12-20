import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import Login from "../pages/Login";
import SignupPage from "../pages/SignUpPage";
import Dashboard from "../pages/Dashboard";
import HomeLandingPage from "../pages/HomeLandingPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import ContactUs from "../pages/ContactUs";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* Added route */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
