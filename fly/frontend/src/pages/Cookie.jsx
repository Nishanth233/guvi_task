import React from "react";
import Footer from "../components/Footer";

const Cookie = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p className="text-gray-700 mb-4">
        Welcome to our Cookie Policy page. This policy explains how Flight
        Booking uses cookies and similar technologies to recognize you when you
        visit our website. It explains what these technologies are and why we
        use them, as well as your rights to control our use of them.
      </p>
      <h2 className="text-2xl font-bold mb-4">1. What are cookies?</h2>
      <p className="text-gray-700 mb-4">
        Cookies are small data files that are placed on your computer or mobile
        device when you visit a website. Cookies are widely used by website
        owners to make their websites work, or to work more efficiently, as well
        as to provide reporting information.
      </p>
      <h2 className="text-2xl font-bold mb-4">2. Why do we use cookies?</h2>
      <p className="text-gray-700 mb-4">
        We use first-party and third-party cookies for several reasons. Some
        cookies are required for technical reasons in order for our website to
        operate, and we refer to these as "essential" or "strictly necessary"
        cookies. Other cookies also enable us to track and target the interests
        of our users to enhance the experience on our website.
      </p>
      <h2 className="text-2xl font-bold mb-4">3. How can I control cookies?</h2>
      <p className="text-gray-700 mb-4">
        You have the right to decide whether to accept or reject cookies. You
        can exercise your cookie rights by setting your preferences in the
        Cookie Consent Manager. The Cookie Consent Manager allows you to select
        which categories of cookies you accept or reject. Essential cookies
        cannot be rejected as they are necessary to provide you with services.
      </p>
      <p className="text-gray-700 mb-4">
        If you choose to reject cookies, you may still use our website though
        your access to some functionality and areas of our website may be
        restricted. You may also set or amend your web browser controls to
        accept or refuse cookies. As the means by which you can refuse cookies
        through your web browser controls vary from browser-to-browser, you
        should visit your browser's help menu for more information.
      </p>
      <h2 className="text-2xl font-bold mb-4">
        4. Changes to our Cookie Policy
      </h2>
      <p className="text-gray-700 mb-4">
        We may update this Cookie Policy from time to time in order to reflect,
        for example, changes to the cookies we use or for other operational,
        legal, or regulatory reasons. Please therefore re-visit this Cookie
        Policy regularly to stay informed about our use of cookies and related
        technologies.
      </p>
      <h2 className="text-2xl font-bold mb-4">5. More Information</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions about our use of cookies or other
        technologies, please email us at privacy@flightbooking.com.
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default Cookie;
