"use client";
import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaEye, FaShoppingBasket } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";

const products = [
  {
    name: "Vegetables",
    image: "/img/green/vegetable1.jpg",
    price: 120,
    oldPrice: 160,
    discount: 25,
  },
  {
    name: "Meat",
    image: "/img/green/meat1.jpg",
    price: 240,
    oldPrice: 300,
    discount: 20,
  },
  {
    name: "Fish",
    image: "/img/green/fish1.jpg",
    price: 190,
    oldPrice: 250,
    discount: 24,
  },
  {
    name: "Chiken",
    image: "/img/green/chiken.jpg",
    price: 150,
    oldPrice: 200,
    discount: 25,
  },
  {
    name: "Milk",
    image: "/img/green/milk1.jpg",
    price: 90,
    oldPrice: 100,
    discount: 10,
  },
  {
    name: "Oil",
    image: "/img/green/oil1.jpg",
    price: 200,
    oldPrice: 240,
    discount: 17,
  },
];

export default function ProductGrid() {
  const [quantities, setQuantities] = useState(products.map(() => 1));

  const increase = (index) => {
    const updated = [...quantities];
    updated[index]++;
    setQuantities(updated);
  };

  const decrease = (index) => {
    const updated = [...quantities];
    if (updated[index] > 1) {
      updated[index]--;
      setQuantities(updated);
    }
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-600" />
        ALL PRODUCTS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border rounded-md p-3 shadow hover:shadow-md transition relative group"
          >
            {/* Discount */}
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-green-100 text-green-600 px-2 py-0.5 text-xs font-semibold rounded">
                Save {product.discount}%
              </div>
            )}

            {/* Product Image */}
            <div className="relative w-full h-40 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Icons on Hover */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <div className="bg-white p-1 rounded shadow text-gray-600 cursor-pointer hover:text-red-500">
                <FaHeart />
              </div>
              <div className="bg-white p-1 rounded shadow text-gray-600 cursor-pointer hover:text-blue-500">
                <BiTransferAlt />
              </div>
              <div className="bg-white p-1 rounded shadow text-gray-600 cursor-pointer hover:text-green-500">
                <FaEye />
              </div>
            </div>

            {/* Product Info */}
            <div className="text-center">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <div className="mt-1">
                <span className="text-green-600 font-bold text-lg">
                  ${product.price.toFixed(2)}
                </span>{" "}
                <span className="text-gray-400 line-through text-sm">
                  ${product.oldPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Select Dropdown */}
            <div className="mt-2">
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                <option>--- Please Select ---</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>

            {/* Quantity & Cart */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-2 text-gray-600 hover:text-black"
                  onClick={() => decrease(index)}
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantities[index]}
                  className="w-8 text-center text-sm border-l border-r"
                  readOnly
                />
                <button
                  className="px-2 text-gray-600 hover:text-black"
                  onClick={() => increase(index)}
                >
                  +
                </button>
              </div>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-green-500 hover:text-white transition">
                <FaShoppingBasket />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
