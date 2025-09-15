import React from "react";

function Licensing() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Licensing</h1>
      <p className="text-yellow-50 mb-4">
        The content, code, and resources provided by MegaBlog are protected under licensing agreements.
      </p>
      <ul className="list-disc ml-6 text-yellow-50">
        <li>Personal use of the platform is free.</li>
        <li>Commercial use may require prior permission.</li>
        <li>Redistribution of source code is prohibited unless stated otherwise.</li>
      </ul>
    </div>
  );
}

export default Licensing;