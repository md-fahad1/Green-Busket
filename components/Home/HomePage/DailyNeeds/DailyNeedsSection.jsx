"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Swal from "sweetalert2";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";

const dailyProducts = [
  {
    Id: 1,
    name: "Fresh Milk",
    image: "/img/green/milk.jpg",
    rating: 4.5,
    price: 80,
    oldPrice: 90,
  },
  {
    Id: 2,
    name: "Fresh Chicken",
    image: "/img/green/cheken.jpg",
    rating: 4.2,
    price: 220,
    oldPrice: 250,
  },
  {
    Id: 3,
    name: "Raw Meat",
    image: "/img/green/meat.jpg",
    rating: 4.8,
    price: 300,
    oldPrice: 340,
  },
  {
    Id: 4,
    name: "Vegetables Pack",
    image: "/img/green/vegetable.jpg",
    rating: 5,
    price: 130,
    oldPrice: 150,
  },
  {
    Id: 5,
    name: "Cooking Oil",
    image: "/img/green/oil.jpg",
    rating: 4.0,
    price: 160,
    oldPrice: 170,
  },
];

const DailyNeedsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product) => {
    if (!product || !product.name) return;

    const defaultAttributes = product.json_attribute?.attributes || {};
    const selectedAttributes = {};

    Object.entries(defaultAttributes).forEach(([key, options]) => {
      const selectedOption = Object.entries(options).find(
        ([_, count]) => count > 0
      );
      if (selectedOption) {
        selectedAttributes[key] = {
          [selectedOption[0]]: selectedOption[1],
        };
      }
    });

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.Id,
      price: product.price,
      count: 1,
      attributes: selectedAttributes,
    };

    dispatch(addToCart(cartInfo));

    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${product.name} has been added to your cart!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Daily Needs</h2>
          <a
            href="/products"
            className="text-sm text-green-600 hover:underline"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {dailyProducts.slice(0, 5).map((product) => (
            <div
              key={product.Id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-full h-56">
                {/* Icons on top left in column */}
                <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
                  <div className="text-green-500 bg-gray-100 p-1 rounded-md hover:text-red-500 hover:bg-white transition cursor-pointer border">
                    <FiHeart size={18} />
                  </div>
                  <div
                    className="text-green-500 bg-gray-100 p-1 rounded-md hover:text-green-600 hover:bg-white transition cursor-pointer border"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FiShoppingCart size={18} />
                  </div>
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold text-sm truncate">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-base">
                    ৳{product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">
                      ৳{product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyNeedsSection;
