"use client";
import Image from "next/image";
import React from "react";
import products from "../../public/data/product.json";
// Example data with one uploaded image + placeholders
const categories = [
  {
    name: "Vegetables",
    image: "/img/green/vegetable.jpg", // Replace with real paths
  },
  {
    name: "Meat",
    image: "/img/green/meat.jpg",
  },
  {
    name: "Fish",
    image: "/img/green/fish.jpg",
  },
  {
    name: "Chiken",
    image: "/img/green/cheken.jpg",
  },
  {
    name: "Milk", // This is your uploaded image
    image: "/img/green/milk.jpg",
  },
  {
    name: "Oil", // This is your uploaded image
    image: "/img/green/oil.jpg",
  },
];

const CategoriesCircle = () => {
  return (
    <section className="w-full py-6 bg-white">
      <div className="container mx-auto items-center justify-center px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center min-w-[100px]"
            >
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm text-gray-700 font-medium">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesCircle;
