import React from "react";

const TermsOfService = () => {
  return (
    <div className=" border m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Terms of Service</h1>
      <p className="mb-4 ">
        Welcome to FlightGO!. These Terms of Service govern your use of our
        website and services. By accessing or using our website, you agree to
        comply with these terms.
      </p>

      <h2 className="text-2xl font-bold mb-2">Use of Our Services</h2>
      <p className="mb-4">
        You must be at least 20 years old to use our services. You agree to
        provide accurate and complete information when creating an account or
        making a purchase.
      </p>

      <h2 className="text-2xl font-bold mb-2">Prohibited Activities</h2>
      <ul className="list-disc ml-8 mb-4">
        <li>Violating any applicable laws or regulations</li>
        <li>Impersonating any person or entity</li>
        <li>Interfering with the operation of our website</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        All content on our website, including text, graphics, logos, and images,
        is the property of FlightGO! or its licensors. You may not use,
        reproduce, or distribute any content without our permission.
      </p>

      <h2 className="text-2xl font-bold mb-2">
        Disclaimers and Limitation of Liability
      </h2>
      <p className="mb-4">
        Our website and services are provided "as is" without any warranties.
        FlightGO! is not liable for any damages arising from your use of our
        website or services.
      </p>

      <h2 className="text-2xl font-bold mb-2">Changes to These Terms</h2>
      <p className="mb-4">
        We may update these Terms of Service from time to time. We will notify
        you of any changes by posting the new terms on our website.
      </p>

      <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms of Service,
        please contact us at flightgo@gmail.com .
      </p>
    </div>
  );
};

export default TermsOfService;
