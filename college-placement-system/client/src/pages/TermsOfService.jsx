import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          These Terms of Service govern the manner in which our website operates
          and how Users interact with the site. By accessing or using the
          website ("Site"), you agree to be bound by these terms and conditions.
        </p>
        <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By using this Site, you signify your acceptance of these terms. If you
          do not agree to these terms, please do not use our Site. Your
          continued use of the Site following the posting of changes to these
          terms will be deemed your acceptance of those changes.
        </p>
        <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
        <p className="text-gray-700 mb-4">
          Our company has the discretion to update these terms of service at any
          time. When we do, we will post a notification on the main page of our
          Site. We encourage Users to frequently check this page for any
          changes. You acknowledge and agree that it is your responsibility to
          review these terms periodically and become aware of modifications.
        </p>
        <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
        <p className="text-gray-700 mb-4">
          As a User of this Site, you agree to use the Site in accordance with
          all applicable laws and regulations. You agree not to use the Site for
          any unlawful purpose or to engage in any activity that could damage,
          disable, overburden, or impair the Site or interfere with any other
          party's use and enjoyment of the Site.
        </p>
        <h2 className="text-2xl font-bold mb-4">Account Security</h2>
        <p className="text-gray-700 mb-4">
          You are responsible for maintaining the confidentiality of your
          account information and for all activities that occur under your
          account. You agree to notify us immediately of any unauthorized use of
          your account or any other breach of security.
        </p>
        <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          The content and materials on this Site, including but not limited to
          text, graphics, logos, and images, are the property of our company or
          its content suppliers and are protected by copyright and other
          intellectual property laws. You agree not to reproduce, distribute, or
          create derivative works based on the content of this Site without our
          express written permission.
        </p>
        <h2 className="text-2xl font-bold mb-4">Third-party Websites</h2>
        <p className="text-gray-700 mb-4">
          Our Site may contain links to third-party websites. These links are
          provided for your convenience only, and we do not endorse or assume
          any responsibility for the content or practices of these third-party
          websites. Your use of third-party websites is subject to the terms and
          conditions of those websites.
        </p>
        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          Our company shall not be liable for any direct, indirect, incidental,
          special, or consequential damages resulting from the use or the
          inability to use the Site or from any information, services, or
          products obtained through the Site, even if our company has been
          advised of the possibility of such damages.
        </p>
        <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
        <p className="text-gray-700 mb-4">
          These terms of service are governed by and construed in accordance
          with the laws of [Your Country/State], and you hereby consent to the
          exclusive jurisdiction and venue of courts in [Your Country/State] in
          all disputes arising out of or relating to the use of the Site.
        </p>
        <h2 className="text-2xl font-bold mb-4">Contacting Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Terms of Service, please contact
          us at info@yourcompany.com.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
