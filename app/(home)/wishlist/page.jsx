"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { IoHeartDislike } from "react-icons/io5";
import {
  getLocalStorageValue,
  removeLocalStorageValue,
} from "@/lib/wishlistLocalStorage";
import Link from "next/link";
import { HandlerContext } from "@/lib/providers/HandlerProvider";
import { useAppDispatch } from "@/lib/features/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";

const Wishlist = () => {
  const { wishProducts, handleRemoveWishListProduct, setWishProducts } =
    useContext(HandlerContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const storedProduct = getLocalStorageValue();
    setWishProducts(storedProduct);
  }, []);

  const handleAddToCart = (product) => {
    let count = 1;
    let totalPrice = product.price;

    if (product.count) {
      count++;
      totalPrice = totalPrice + product.price;
    }

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.id,
      price: product.price,
      count,
      totalPrice,
    };
    dispatch(addToCart(cartInfo));
  };

  return (
    <section className="min-h-screen">
      <div className=" w-[95%] lg:w-[80%] mx-auto shadow border p-3 lg:p-6 mt-4 lg:mt-6">
        <div className="flex justify-center flex-col items-center text-secondary">
          <FaRegHeart className="text-2xl lg:text-5xl" />
          <h2 className="text-2xl lg:text-4xl  font-bold">My Wishlist</h2>
          {wishProducts.length || (
            <div className="mt-4">
              <Image
                src={"/img/empty-wish.webp"}
                width={300}
                height={300}
                alt="empty wishlist"
              />
              <h2 className="text-2xl lg:text-3xl font-medium text-gray-400 text-center">
                Empty Wishlist
              </h2>
            </div>
          )}
        </div>
        {/* List */}

        <Box className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {wishProducts?.map((product) => (
            <Card
              key={product.Id}
              className="flex md:flex-col justify-between  "
            >
              <CardContent className="flex md:flex-col gap-4">
                <div className="group w-full h-[200px] overflow-hidden relative">
                  <Link href={`/products/product-info/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={200}
                      width={300}
                      className="w-full rounded-lg h-[200px] object-cover hover:scale-105 duration-300"
                    />
                  </Link>
                  <div className=" right-4 top-4 absolute flex flex-col ">
                    <button
                      onClick={() => handleRemoveWishListProduct(product.id)}
                      className="bg-gray-100 p-2 text-red-500 hover:bg-dash-primary scale-0 group-hover:scale-[10px] duration-300  hover:text-white rounded-full"
                    >
                      <IoHeartDislike className="text-2xl " />
                    </button>
                  </div>
                </div>
                <div>
                  <Typography
                    gutterBottom
                    className="!text-xl !font-oswald !font-bold text-secondary"
                  >
                    {product.name}
                  </Typography>

                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    <p className="flex  gap-1 text-xs  font-lato md:text-base">
                      <span className="mr-0.5">৳</span>
                      {new Intl.NumberFormat().format(product.price)}
                    </p>
                  </Typography>
                  <Typography variant="body2">
                    <span
                      className={`font-semibold ${
                        product.stock === "In Stock"
                          ? "text-dash-primary"
                          : "text-rose-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </Typography>
                </div>
              </CardContent>

              <CardActions>
                <Button
                  onClick={() => handleAddToCart(product)}
                  size="small"
                  variant="contained"
                  className="w-full"
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </section>
  );
};

export default Wishlist;
