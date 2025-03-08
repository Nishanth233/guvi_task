import React from "react";
import Footer from "../components/Footer";

const Refund = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Refund</h1>
      <p className="text-gray-700 mb-4">
        Our refund policy ensures that you receive your money back in a timely
        manner. Please review our refund process and terms below.
      </p>
      <p className="text-gray-700 mb-4">Refund Policy:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Refunds will be processed within 7-10 business days.</li>
        <li>Refunds will be credited back to the original payment method.</li>
        <li>
          Refunds are subject to the cancellation policy terms and conditions.
        </li>
      </ul>
      <p className="text-gray-700 mb-4">
        If you have any questions or concerns regarding your refund, please
        contact our customer support team at support@flightbooking.com or call
        1-800-123-4567.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Refund;
