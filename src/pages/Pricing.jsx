import React from 'react';

function Pricing() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 underline">Pricing Plans</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl text-yellow-50 font-semibold mb-2 underline">Basic</h2>
          <p className="mb-4 text-yellow-50">$0 / month</p>
          <ul className="list-disc ml-6 text-black">
            <li>Access to basic features</li>
            <li>Email support</li>
          </ul>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl text-yellow-50 font-semibold mb-2 underline">Pro</h2>
          <p className="text-yellow-50 mb-4">$19 / month</p>
          <ul className="list-disc ml-6 text-black">
            <li>All basic features</li>
            <li>Priority email support</li>
            <li>Customizable themes</li>
          </ul>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl text-yellow-50 font-semibold mb-2 underline">Enterprise</h2>
          <p className="text-yellow-50 mb-4">$50 / month</p>
          <ul className="list-disc ml-6 text-black">
            <li>All Pro features</li>
            <li>Dedicated support</li>
            <li>Custom integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pricing;