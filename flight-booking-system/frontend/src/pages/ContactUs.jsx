import React from "react";

const ContactUs = () => {
  return (
    <div className="border m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Contact Us</h1>

      <h2 className="text-2xl font-bold mb-2">Email</h2>
      <p className="mb-4">You can email us at flightgo@gmail.com .</p>

      <h2 className="text-2xl font-bold mb-2">Phone</h2>
      <p className="mb-4">You can call us at 0123456789.</p>

      <h2 className="text-2xl font-bold mb-2">Mailing Address</h2>
      <p className="mb-4">
        You can send mail to our office at:
        <br />
        FlightGo!
        <br />
        xyz street,
        <br />
        A-city,b-State,1234.
      </p>

      <h2 className="text-2xl font-bold mb-2">Social Media</h2>
      <p className="mb-4">
        Follow us on social media for updates and promotions:
      </p>
      <div className="flex space-x-4">
        <a href="[Facebook Page URL]" target="_blank" rel="noopener noreferrer">
          <img
            src="\public\images\facebook.png"
            alt="Facebook"
            className="w-8 h-8"
          />
        </a>
        <a href="[Twitter Handle]" target="_blank" rel="noopener noreferrer">
          <img
            src="\public\images\twitter.png"
            alt="Twitter"
            className="w-8 h-8"
          />
        </a>
        <a href="[Instagram Handle]" target="_blank" rel="noopener noreferrer">
          <img
            src="\public\images\instagram.png"
            alt="Instagram"
            className="w-8 h-8"
          />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
