// import React from "react";
// import SectionTitle from "../SectionTitle";
// import products from "../../../../public/data/product.json";
// import ProductCard from "@/components/Product/ProductCard";

// const TopBrandProducts = () => {
//   return (
//     <div className="container mx-auto">
//       <SectionTitle
//         title="Top Brand Products"
//         description="Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas."
//       />
//       <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-4 mt-12 gap-y-6">
//         {products?.slice(0, 12).map((product, idx) => (
//           <div key={product.id}>
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopBrandProducts;

// import React from "react";
// import SectionTitle from "../SectionTitle";
// import products from "../../../../public/data/product.json";
// import ProductCard from "@/components/Product/ProductCard";

// const NewArrivalContainer = () => {
//   return (
//     <div className="container mx-auto">
//       <SectionTitle
//         title="New Arrival"
//         description="Mirum est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas."
//       />
//       <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-4 mt-12 gap-y-6">
//         {products?.slice(0, 12).map((product, idx) => (
//           <div key={product.id}>
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewArrivalContainer;

"use client";

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";

import Link from "next/link";

import { IoIosStar } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const TopBrandProducts = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`;
  const CART_API = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/cart/add`;

  // Simulated authentication check
  // Replace with actual authentication logic

  const fetchFeatureProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatureProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const cartInfo = {
      userId: currentUser.Id,
      productId: product.id,
    };

    try {
      await axios.post(CART_API, cartInfo);

      Swal.fire({
        title: "Success",
        text: "Product added to cart!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add product to cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 mt-12 gap-y-6">
      {products.map((product) => (
        <div
          key={product.Id}
          className="relative border flex flex-col justify-between h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg group"
        >
          {product.offer && (
            <div className="absolute top-0 left-0 z-40 w-16 h-16">
              <div className="absolute transform -rotate-45 bg-[#192a56] text-center text-white font-semibold py-1 left-[-55px] top-[20px] w-[170px] text-xs">
                {product.offer}% OFF
              </div>
            </div>
          )}

          <div className="z-30">
            <div className="group overflow-hidden">
              <Link href={`products/product-info/${product.Id}`}>
                <Image
                  src={product.image[0] || "/default-image.jpg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[4/5] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
            </div>
            <div className="p-2 space-y-1.5 overflow-hidden">
              <h2 className="leading-tight text-center capitalize truncate text-normal font-roboto font-medium">
                {product.name}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex flex-col flex-nowrap">
                  <p className="flex justify-center gap-1 text-xs flex-nowrap font-lato md:text-base">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.price)}
                  </p>
                  <p className="flex justify-center gap-1 text-xs text-[#838790] line-through flex-nowrap font-lato md:text-sm">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.price)}
                  </p>
                </div>
                <span className="flex items-center rounded text-sm gap-1 px-1 bg-[#E1EFE0] text-dash-primary">
                  <span>{product.rating ? product.rating : 0}</span>
                  <IoIosStar />
                </span>
              </div>
              <div className="flex justify-center gap-1.5">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="rounded-md border border-dash-primary basis-1/2 text-[10px] capitalize text-[#192a56] md:px-2 md:text-xs"
                >
                  Add to Cart
                </button>
                <Link
                  href="/checkout"
                  className="rounded-md bg-dash-primary basis-1/2 text-[10px] capitalize text-white md:px-2 md:text-xs"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopBrandProducts;
