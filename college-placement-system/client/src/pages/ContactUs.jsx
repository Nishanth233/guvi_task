import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-4">
          If you have any questions about this site, our services, or your
          dealings with this site, please contact us using the information
          below.
        </p>
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-700 mb-4">You can reach us at:</p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li className="mb-2">
            <strong>Email:</strong> info@yourcompany.com
          </li>
          <li className="mb-2">
            <strong>Phone:</strong> +1 (123) 456-7890
          </li>
          <li className="mb-2">
            <strong>Address:</strong> 123 Your Street, Your City, Your State,
            Your Country
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Office Hours</h2>
        <p className="text-gray-700 mb-4">
          Our office is open during the following hours:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li className="mb-2">
            <strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM
          </li>
          <li className="mb-2">
            <strong>Saturday:</strong> 10:00 AM - 2:00 PM
          </li>
          <li className="mb-2">
            <strong>Sunday:</strong> Closed
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Feedback and Support</h2>
        <p className="text-gray-700 mb-4">
          We value your feedback and are here to assist with any support you may
          need. Please feel free to reach out to us at any time.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
