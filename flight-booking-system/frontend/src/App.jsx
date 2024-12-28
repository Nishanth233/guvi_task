import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "VmAhiFofbKIxOPJCS4V0GrHlkJgJUssfgY75whYGhTWtUUAQm6ULoNqNB8SyhBclmdmCtGl9tX7m7YS79zuo00QN6vCxTt"
);
const App = () => {
  return (
    <div>
      <Header />
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
          <Route path="/terms-of-service" element={<TermsOfService />} />{" "}
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Elements>
      <Footer />
    </div>
  );
};

export default App;
