import React from "react";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        Your privacy is important to us. Please review our privacy policy to
        understand how we collect, use, and protect your personal information.
      </p>
      <h2 className="text-2xl font-bold mb-4">1. Information Collection</h2>
      <p className="text-gray-700 mb-4">
        We collect personal information that you provide to us when you use our
        services. This includes your name, email address, phone number, and
        payment information.
      </p>
      <h2 className="text-2xl font-bold mb-4">2. Information Use</h2>
      <p className="text-gray-700 mb-4">
        We use your personal information to process your bookings, communicate
        with you, and improve our services. We do not share your personal
        information with third parties without your consent.
      </p>
      <h2 className="text-2xl font-bold mb-4">3. Information Protection</h2>
      <p className="text-gray-700 mb-4">
        We implement appropriate security measures to protect your personal
        information from unauthorized access, use, or disclosure.
      </p>
      <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
      <p className="text-gray-700 mb-4">
        Our website uses cookies to enhance your browsing experience and analyze
        our traffic. You can choose to disable cookies through your browser
        settings.
      </p>
      <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions or concerns about our privacy policy, please
        contact our customer support team at privacy@flightbooking.com.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
