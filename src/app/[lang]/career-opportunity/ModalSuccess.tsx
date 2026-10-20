"use client";

import { Fragment } from "react";

export default function ThankYouModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  if (!show) return null;

  return (
    <Fragment>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative z-50 w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 text-center animate-fadeIn">

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">
            Thank You
          </h2>

          {/* Content */}
          <p className="text-gray-600 mb-3">
          Your Data Have Been Submited  
          </p>

          <p className="text-gray-600 mb-3">
          Thank you for your time and enthusiasm. We will try to contact you shortly after receiveing your application.
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </Fragment>
  );
}