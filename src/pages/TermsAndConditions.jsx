import React from "react";

function TermsAndConditions() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-yellow-50 mb-4">
        Welcome to MegaBlog. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
      </p>
      <ul className="list-disc ml-6 text-yellow-50">
        <li>You must use the service responsibly and legally.</li>
        <li>Accounts are personal and non-transferable.</li>
        <li>We may update these terms at any time with prior notice.</li>
      </ul>
    </div>
  );
}

export default TermsAndConditions;