import React from "react";

function PrivacyPolicy() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-yellow-50 mb-4">
        At MegaBlog, your privacy is very important to us. This policy explains how we collect, use, and protect your information.
      </p>
      <ul className="list-disc ml-6 text-yellow-50">
        <li>We collect basic account and usage information.</li>
        <li>Your data will never be sold to third parties.</li>
        <li>We use cookies to improve user experience.</li>
      </ul>
    </div>
  );
}

export default PrivacyPolicy;