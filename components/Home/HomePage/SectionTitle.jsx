import React from "react";

const SectionTitle = ({ title, description }) => {
  return (
    <div className="text-center w-[95%] md:w-[70%] lg:w-[50%] mx-auto mt-24">
      <h2 className="font-playfair text-secondary text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
        <span className="font-medium">#</span> {title}{" "}
        <span className="font-medium">#</span>
      </h2>
      <p>{description || ""}</p>
    </div>
  );
};

export default SectionTitle;
