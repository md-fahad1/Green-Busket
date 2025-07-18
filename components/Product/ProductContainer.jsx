"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import products from "../../public/data/product";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

const ProductContainer = () => {
  // actual product functionality
  // const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`
  //     );
  //     console.log(res.data);
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.log("error", error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <>
      <div className="container mx-auto mt-6 md:mt-12">
        <h3 className=" text-secondary text-center mb-5 uppercase text-3xl font-bold font-oswald ">
          Collection Name
        </h3>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full !pb-10"
        >
          {products.map((product, idx) => (
            <div key={product.Id}>
              <SwiperSlide>
                <ProductCard product={product} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default ProductContainer;
