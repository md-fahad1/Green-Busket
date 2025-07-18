"use client";

import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaEye, FaShoppingBasket } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/lib/features/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";

const products = [
  {
    id: 1,
    name: "Vegetables",
    image: "/img/green/vegetable1.jpg",
    price: 120,
    oldPrice: 160,
    discount: 25,
    options: ["1kg", "500g"],
  },
  {
    id: 2,
    name: "Meat",
    image: "/img/green/meat1.jpg",
    price: 240,
    oldPrice: 300,
    discount: 20,
    options: ["1kg", "1.5kg", "2kg"],
  },
  {
    id: 3,
    name: "Fish",
    image: "/img/green/fish1.jpg",
    price: 190,
    oldPrice: 250,
    discount: 24,
    options: ["500g", "1kg"],
  },
  {
    id: 4,
    name: "Chicken",
    image: "/img/green/chiken.jpg",
    price: 150,
    oldPrice: 200,
    discount: 25,
    options: ["Full", "Half"],
  },
  {
    id: 5,
    name: "Milk",
    image: "/img/green/milk1.jpg",
    price: 90,
    oldPrice: 100,
    discount: 10,
    options: ["1L", "500ml"],
  },
  {
    id: 6,
    name: "Oil",
    image: "/img/green/oil1.jpg",
    price: 200,
    oldPrice: 240,
    discount: 17,
    options: ["1L", "2L", "5L"],
  },
];

export default function ProductGrid() {
  const [quantities, setQuantities] = useState(products.map(() => 1));
  const [selectedOptions, setSelectedOptions] = useState(
    products.map(() => "")
  );

  const dispatch = useAppDispatch();

  const handleIncrease = (index) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] < 10) newQuantities[index]++;
      return newQuantities;
    });
  };

  const handleDecrease = (index) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 1) newQuantities[index]--;
      return newQuantities;
    });
  };

  const handleAddToCart = (product, index) => {
    const selectedOption = selectedOptions[index];
    if (!selectedOption) {
      Swal.fire({
        icon: "warning",
        title: "Please select an option",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const cartItem = {
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      count: quantities[index],
      attributes: {
        size: selectedOption,
      },
    };

    dispatch(addToCart(cartItem));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} (${selectedOption}) has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
    });
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
            key={product.id}
            className="bg-white border rounded-md p-3 shadow hover:shadow-md transition relative group"
          >
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-green-100 text-green-600 px-2 py-0.5 text-xs font-semibold rounded">
                Save {product.discount}%
              </div>
            )}

            <div className="relative w-full h-40 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

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

            <div className="mt-2">
              <select
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                value={selectedOptions[index]}
                onChange={(e) => {
                  const updated = [...selectedOptions];
                  updated[index] = e.target.value;
                  setSelectedOptions(updated);
                }}
              >
                <option value="">--- Please Select ---</option>
                {product.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-2 text-gray-600 hover:text-black"
                  onClick={() => handleDecrease(index)}
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
                  onClick={() => handleIncrease(index)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-green-500 hover:text-white transition"
                onClick={() => handleAddToCart(product, index)}
              >
                <FaShoppingBasket />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
