import React from 'react';
import { IoMdPaperPlane } from "react-icons/io";

function ContactUs() {
  return (
    <div className="py-16 bg-teal-50 text-center">
      <h2 className="text-4xl font-bold mb-4">We're here to help you plan your trip</h2>
      <h3 className="text-xl text-gray-700 mb-6">
        Our team is available to help you with any questions that might arise.
      </h3>

      {/* Email Button */}
      <a 
        href="mailto:maorat@ac.sce.ac.il, guyez@ac.sce.ac.il"
        className="inline-flex items-center px-6 py-3 bg-teal-500 text-white text-lg rounded-lg hover:bg-teal-600 hover:text-white"
      >
        <IoMdPaperPlane className="mr-2 text-xl" />
        Contact Us
      </a>
    </div>
  );
}

export default ContactUs;
