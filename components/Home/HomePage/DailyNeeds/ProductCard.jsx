"use client";
import Image from "next/image";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import React from "react";

const ProductCard = ({ product }) => {
  const discountBadge =
    product.discountType === "amount"
      ? `- ${product.discountValue} $`
      : `- ${product.discountValue}%`;

  return (
    <div className="relative p-4 bg-white border rounded-lg shadow hover:shadow-md transition-all w-[200px] min-w-[200px]">
      {/* Discount Badge */}
      {product.discountValue > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {discountBadge}
        </div>
      )}

      <div className="absolute top-6 right-1 flex flex-col gap-2">
        {/* Wishlist Icon */}
        <div className="text-gray-400 hover:text-red-500 cursor-pointer">
          <FaHeart />
        </div>

        {/* Add to Cart Icon */}
        <div className="text-gray-400 hover:text-green-600 cursor-pointer">
          <FaShoppingCart />
        </div>
      </div>
      {/* Wishlist Icon */}

      {/* Product Image */}
      <div className="w-full h-[120px] flex items-center justify-center">
        <Image
          src="/img/news/news-1.png"
          alt={product.name}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Rating */}
      <div className="mt-3 text-sm text-yellow-500">
        ★ {(product.rating ?? 0).toFixed(1)}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mt-1">
        {product.name}
      </h3>

      {/* Price */}
      <div className="mt-1">
        <span className="text-indigo-600 font-bold">${product.price}</span>
        {product.oldPrice && (
          <span className="line-through text-gray-400 text-sm ml-2">
            ${product.oldPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
