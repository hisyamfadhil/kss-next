"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

export default function PdfPreviewModal({
  pdfUrl, brochure }: {
    pdfUrl: string;
    brochure: string
  }) {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <div className="ps-contact__email pb-[30px] border-b border-[#f0f2f5]">
      <button
        onClick={() => setShowPdf(true)}
        id="view-pdf-btn"
        className="flex items-center justify-center gap-2 w-fit rounded-[40px] text-[#70849d] border border-[#f0f2f5] px-[15px] py-[8px] text-base font-semibold transition-colors duration-300 hover:text-[#46b049] hover:bg-white hover:border-[#46b049]"
      >
        <FileText />
        {brochure}
      </button>
      {showPdf && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-[90%] h-[90vh] rounded shadow-lg relative overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-700 text-lg">{brochure}</h2>
              <button
                onClick={() => setShowPdf(false)}
                className="text-gray-600 hover:text-black text-xl px-2"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer */}
            <iframe
              src={pdfUrl}
              className="w-full h-full"
            />

          </div>
        </div>
      )}
    </div>
  );
}
