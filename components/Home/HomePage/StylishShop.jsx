import Image from "next/image";
import React from "react";
import style1 from "../../../public/img/product/style1.png";
import style2 from "../../../public/img/product/style2.png";
import { Button } from "@mui/material";

const StylishShop = () => {
  return (
    <section className="mt-24 container mx-auto ">
      <div className="grid md:grid-cols-3 grid-rows-1 gap-4">
        <div className="md:col-span-2 flex flex-col md:flex-row items-center bg-[#FDD5B5] h-full mt-auto ">
          <div className="flex-1 mt-6 md:mt-0 text-center md:text-start md:ps-6 lg:ps-12 space-y-4">
            <h3 className="text-3xl lg:text-6xl font-playfair italic font-medium">
              Stylish shop
            </h3>
            <p className="font-semibold text-red-500">SALE FLAT 50% OFF</p>
            <Button variant="contained">Shop Now</Button>
          </div>
          <Image
            src={style1}
            alt="stylish image"
            height={500}
            className="ms-auto mt-auto md:w-[300px] lg:w-[450px] "
          />
        </div>
        <div className="md:col-span-1  flex flex-col">
          <div className="flex-1 flex items-center bg-[#F6F6F6] mb-4">
            <div className="flex-grow ms-2 md:ps-3 lg:ps-6">
              <h3 className="text-xl lg:text-3xl font-playfair italic font-medium mb-2 lg:mb-3">
                Be Styles
              </h3>
              <p className="font-semibold text-xs lg:text-base text-red-500">
                SALE ON BIG BRANDS
              </p>
            </div>
            <Image
              src={style1}
              alt="stylish image"
              height={200}
              className="w-[100px] md:w-[100px] lg:w-[200px] mt-auto"
            />
          </div>
          <div className="bg-[#F6F6F6] flex-1 flex items-center">
            <div className="flex-1 ps-2 md:ps-3 lg:ps-6 ">
              <h3 className="text-xl lg:text-3xl font-playfair italic font-medium mb-2 lg:mb-3">
                Exclusive
              </h3>
              <p className="font-semibold text-xs lg:text-base text-red-500">
                SALE ON 20% OFF
              </p>
            </div>
            <Image
              src={style2}
              alt="stylish image"
              height={200}
              className=" w-[100px] md:w-[100px] lg:w-[200px] mt-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StylishShop;
