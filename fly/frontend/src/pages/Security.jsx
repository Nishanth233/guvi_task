import React from "react";
import Footer from "../components/Footer";

const Security = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Security</h1>
        <p className="text-gray-700 mb-4">
          We take your security seriously. Learn about the measures we take to
          protect your personal and financial information.
        </p>
        <h2 className="text-2xl font-bold mb-4">1. Data Encryption</h2>
        <p className="text-gray-700 mb-4">
          We use industry-standard encryption technologies to protect your data
          during transmission and storage.
        </p>
        <h2 className="text-2xl font-bold mb-4">
          2. Secure Payment Processing
        </h2>
        <p className="text-gray-700 mb-4">
          Our payment processing systems are PCI-DSS compliant, ensuring your
          payment information is handled securely.
        </p>
        <h2 className="text-2xl font-bold mb-4">3. Fraud Detection</h2>
        <p className="text-gray-700 mb-4">
          We employ advanced fraud detection systems to identify and prevent
          unauthorized transactions.
        </p>
        <h2 className="text-2xl font-bold mb-4">4. Regular Security Audits</h2>
        <p className="text-gray-700 mb-4">
          We conduct regular security audits to identify and address potential
          vulnerabilities in our systems.
        </p>
        <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or concerns about our security practices,
          please contact our customer support team at
          security@flightbooking.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Security;
