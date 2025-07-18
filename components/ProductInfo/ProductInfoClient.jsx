// components/ProductInfo/ProductInfoClient.jsx
"use client";

import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import UserReview from "@/components/UserReview/UserReview";
import ProductActionButton from "@/components/Product/ProductInfo/ProductActionButton";
import Image from "next/image";
import axios from "axios";
import { fetchProductById } from "@/lib/FetchProduct";

// Utility function
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

const ProductInfoClient = ({ productId }) => {
  const [product, setProduct] = useState(null);
  console.log("product id", productId);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log("product", product);
  if (!product) {
    return (
      <div className="text-center text-gray-600 py-10">
        Product not found or still loading...
      </div>
    );
  }

  const discountedPrice = product.price - product.price * (45 / 100);
  const inStock = product.quantity > 0;

  return (
    <div className="bg-white mb-28 lg:mb-6 h-fit">
      <div className="mx-auto max-w-screen-xl px-4 flex flex-col gap-3">
        <div className="grid gap-8 md:grid-cols-2">
          <Image
            src={product.image[0]}
            alt="Product Image"
            height={400}
            width={400}
            className="h-[400px] w-full object-cover rounded-2xl"
          />

          {/* Details Panel */}
          <div className="md:py-8 space-y-4">
            <div className="mb-2 md:mb-3">
              <h2 className="text-xl font-bold text-[rgba(0,0,0,0.8)] lg:text-3xl">
                {product.name}
              </h2>
              <span className="mb-0.5 inline-block text-gray-500">
                {product.category.name}
              </span>
            </div>

            <div className="mb-4 space-y-3">
              <div className="flex flex-col lg:flex-row items-start gap-3 lg:items-center justify-between">
                <div className="flex flex-col">{/* Ratings */}</div>
                <div className="flex items-center">
                  <p>Availability</p>
                  <p
                    className={`px-3 ms-3 text-white rounded-full font-medium ${
                      inStock ? "bg-[#192a56]" : "bg-red-600"
                    }`}
                  >
                    {inStock ? "In Stock" : "Stock Out"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ৳{product.price}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <ProductActionButton product={product} />

            {/* Description */}
            <div className="mt-12 text-base text-gray-500 tracking-wide">
              {stripHtml(product.desc)}
            </div>
          </div>
        </div>

        {/* User Review Section */}
        <UserReview productId={product.id} />
      </div>
    </div>
  );
};

export default ProductInfoClient;
