import React from "react";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div>
    <div className="container mx-auto  px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-gray-700 mb-4">
        Please read our terms and conditions carefully before using our
        services. By using our platform, you agree to the following terms and
        conditions.
      </p>
      <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
      <p className="text-gray-700 mb-4">
        These Terms & Conditions govern your use of our website and services. By
        accessing or using our platform, you agree to be bound by these terms.
      </p>
      <h2 className="text-2xl font-bold mb-4">2. Booking and Payment</h2>
      <p className="text-gray-700 mb-4">
        All bookings are subject to availability and confirmation by the
        airline. Payments must be made in full at the time of booking.
      </p>
      <h2 className="text-2xl font-bold mb-4">3. Changes and Cancellations</h2>
      <p className="text-gray-700 mb-4">
        Changes and cancellations are subject to our cancellation policy. Fees
        may apply for changes and cancellations.
      </p>
      <h2 className="text-2xl font-bold mb-4">4. Privacy</h2>
      <p className="text-gray-700 mb-4">
        We respect your privacy and are committed to protecting your personal
        information. Please review our Privacy Policy for more details.
      </p>
      <h2 className="text-2xl font-bold mb-4">5. Governing Law</h2>
      <p className="text-gray-700 mb-4">
        These Terms & Conditions are governed by the laws of [Your Country]. Any
        disputes arising from the use of our services will be subject to the
        exclusive jurisdiction of the courts of [Your Country].
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
