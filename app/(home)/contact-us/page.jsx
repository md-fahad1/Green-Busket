import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-lg mx-auto p-6 mt-20 mb-20 bg-white shadow-lg rounded-2xl text-center border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">যোগাযোগের তথ্য</h2>
      <p className="text-gray-600 mb-4">
        আমরা আমাদের গ্রাহক পরিষেবা, পণ্যদ্রব্য, ওয়েবসাইট বা আপনি আমাদের সাথে
        ভাগ করতে চান এমন কোনও বিষয়ে আপনার কাছ থেকে শুনতে পছন্দ করি। আপনার
        মন্তব্য এবং পরামর্শ প্রশংসা করা হবে।
      </p>
      <div className="flex items-center justify-center gap-3 text-gray-700 mb-3">
        <FaPhoneAlt className="w-5 h-5 text-blue-500" />
        <span className="font-medium">
          +8801625262932 (10:00 am - 10:00 pm)
        </span>
      </div>
      <div className="flex items-center justify-center gap-3 text-gray-700">
        <FaEnvelope className="w-5 h-5 text-red-500" />
        <span className="font-medium">info@ceramicandfoodproducts.com</span>
      </div>
    </div>
  );
};

export default Contact;
