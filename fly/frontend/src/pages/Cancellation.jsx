import React from "react";
import Footer from "../components/Footer";

const Cancellation = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cancellation</h1>
      <p className="text-gray-700 mb-4">
        Need to cancel your booking? Our cancellation policy is designed to be
        fair and transparent. Please review our cancellation terms and
        conditions below.
      </p>
      <p className="text-gray-700 mb-4">Cancellation Policy:</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          Cancellations made within 24 hours of booking will receive a full
          refund.
        </li>
        <li>
          Cancellations made 24 hours to 7 days before departure will incur a
          10% cancellation fee.
        </li>
        <li>
          Cancellations made less than 24 hours before departure are
          non-refundable.
        </li>
        <li>
          For special circumstances, please contact our customer support team.
        </li>
      </ul>
      <p className="text-gray-700 mb-4">
        If you need further assistance with your cancellation, please contact
        our customer support team at support@flightbooking.com or call
        1-800-123-4567. We are here to help you 24/7.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Cancellation;
