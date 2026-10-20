"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setIsContentLoaded(true);
    }
  }, [isOpen]);

  return (
    <div className="accordion-card-item mb-3">
      <div className="accordion-header flex items-center justify-between text-white bg-[#46b049] p-3 rounded" onClick={toggleAccordion}>
        <h2>{question}</h2>
        <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
      {isOpen && isContentLoaded && (
        <div className="accordion-content bg-white text-black shadow p-3">
          <div
            className="text-black lifeline-content"
            dangerouslySetInnerHTML={{ __html: answer || "" }}
          />
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
