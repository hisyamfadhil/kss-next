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
            Thank you for filling out the form. Kindly, please wait for{" "}
            <span className="font-semibold">2–3 days</span> for our response.
          </p>

          <p className="text-gray-600 mb-3">
            Our marketing team will check your email and will send you the file shortly after we receive it.
          </p>

          <p className="text-gray-600 mb-5">
            If you haven't receive any response for{" "}
            <span className="font-semibold">1 week</span>, contact us:
            <br />
            <a
              href="mailto:webmaster@kurniasafety.com"
              className="text-green-600 hover:underline"
            >
              webmaster@kurniasafety.com
            </a>
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