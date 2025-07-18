"use client";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/8801844846535"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-4 right-1 md:right-4 bg-green-500 rounded-full p-2 md:p-2 lg:p-3 shadow-lg hover:bg-green-600 transition-all z-50"
    >
      <FaWhatsapp className="text-white w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
    </a>
  );
};

export default WhatsApp;
