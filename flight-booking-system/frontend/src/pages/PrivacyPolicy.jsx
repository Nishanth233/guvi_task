import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-8 border m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to FlightGo!. We are committed to protecting your
        privacy and ensuring that your personal information is handled in a safe
        and responsible manner. This Privacy Policy outlines how we collect,
        use, disclose, and safeguard your information when you visit our
        website.
      </p>

      <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
      <ul className="list-disc ml-8 mb-4">
        <li>
          Personal Data: Information such as your name, email address, phone
          number, and billing information.
        </li>
        <li>
          Usage Data: Information about how you use our website, including
          browsing history, search queries, and interactions.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-8 mb-4">
        <li>To provide and maintain our services</li>
        <li>To process transactions and send confirmations</li>
        <li>To improve our website and services</li>
        <li>
          To communicate with you about promotions, updates, and other
          information
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">Sharing Your Information</h2>
      <p className="mb-4">
        We do not share your personal information with third parties except as
        necessary to provide our services, comply with legal obligations, or
        protect our rights.
      </p>

      <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, and delete your personal
        information. You can exercise these rights by contacting us at
        flightgo@gmail.com .
      </p>

      <h2 className="text-2xl font-bold mb-2">
        Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on our website.
      </p>

      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at flightgo@gmail.com .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
