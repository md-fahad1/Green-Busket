"use client";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useAppDispatch } from "@/lib/features/hooks";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { HandlerContext } from "@/lib/providers/HandlerProvider";
import { IoHeartDislike } from "react-icons/io5";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { IoIosStar } from "react-icons/io";
import useProductAttributes from "@/lib/features/hooks/useProductAttributes";

const ProductCard = () => {
  const { handleAddWishlist, wishProducts, handleRemoveWishListProduct } =
    useContext(HandlerContext);
  const dispatch = useAppDispatch();
  const { attributes } = useProductAttributes();
  const [inputAttribute, setInputAttribute] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatureProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching feature products:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatureProducts();
  }, []);

  useEffect(() => {
    if (attributes.length > 0) {
      let pdInputAttributes = {};
      attributes.forEach((attr) => {
        const keys = Object.keys(attr)[0];
        const values = Object.values(attr)[0];
        const attributeKey = Object.keys(values)[0];
        pdInputAttributes = {
          ...pdInputAttributes,
          [keys]: { [attributeKey]: 1 },
        };
      });
      setInputAttribute(pdInputAttributes);
    }
  }, [attributes]);

  const handleAddToCart = (product) => {
    const count = product.count ? product.count + 1 : 1;
    const totalPrice = count * product.price;

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.id,
      price: product.price,
      count,
      totalPrice,
      attributes: inputAttribute,
    };

    dispatch(addToCart(cartInfo));
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:ml-28 px-3 h-screen overflow-auto scrollbar-thin gap-2">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const isWishlisted = wishProducts.some((pd) => pd.id === product.id);
        return (
          <div
            key={product.id}
            className="relative border flex flex-col justify-between h-full bg-white rounded-lg shadow-md hover:shadow-lg group"
          >
            {product.offer && (
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute transform -rotate-45 bg-[#192a56] text-center text-white font-semibold py-1 left-[-55px] top-[20px] w-[170px] text-xs">
                  {product.offer}% OFF
                </div>
              </div>
            )}

            <div className="relative group">
              <Link href={`/products/product-info/${product.id}`}>
                <Image
                  src={product.image?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[4/5] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="absolute right-4 top-4 flex flex-col">
                {isWishlisted ? (
                  <button
                    onClick={() => handleRemoveWishListProduct(product.id)}
                    className="bg-gray-100 mb-3 p-1.5 text-red-500 hover:bg-primary scale-0 group-hover:scale-100 duration-300 hover:text-white rounded-full"
                  >
                    <IoHeartDislike className="text-xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddWishlist(product)}
                    className="bg-gray-100 mb-3 p-1.5 text-red-500 hover:bg-primary scale-0 group-hover:scale-100 duration-300 hover:text-white rounded-full"
                  >
                    <FaRegHeart className="text-xl" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-2 space-y-1.5">
              <h2 className="text-center capitalize truncate font-medium text-normal">
                {product.name}
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs md:text-base font-lato">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.discountedPrice)}
                  </p>
                  <p className="text-xs text-[#838790] line-through md:text-sm">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.price)}
                  </p>
                </div>
                <span className="flex items-center rounded text-sm px-1 bg-[#E1EFE0] text-dash-primary">
                  <span>{product.rating || 0}</span>
                  <IoIosStar />
                </span>
              </div>
              <div className="flex justify-center gap-1.5">
                <Link
                  href="/checkout"
                  className="rounded-md bg-dash-primary text-white text-[10px] md:text-xs px-3 py-2 text-center"
                >
                  Buy Now
                </Link>
                <button
                  className="rounded-md border border-dash-primary px-3 py-2 text-[10px] text-[#192a56] md:text-xs"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
