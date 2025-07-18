import React from "react";
import exploreImg from "../../../public/img/product/image2.png";
import Image from "next/image";
import { Button } from "@mui/material";
const ExploreEvery = () => {
  return (
    <div className="bg-[#F6F6F6]  ">
      <div className="max-w-[1440px] w-[95%] flex gap-6 items-center justify-center flex-col-reverse md:flex-row lg:w-[85%]  mx-auto md:gap-4 mt-24">
        <Image
          src={exploreImg}
          alt="Explore Every"
          height={600}
          width={500}
          className=" md:w-[400px] lg:w-[500px]"
        />
        <div className="space-y-5 text-center md:text-start">
          <h1 className="text-xl md:text-[28px] lg:text-[50px] font-bold md:leading-[40px] lg:leading-[70px] text-secondary">
            DISCOVER <br /> THE ART OF LIVING <br /> WITH CERAMICS & FOODS
          </h1>
          <p>
            From artisanal ceramics to fresh, flavorful foods — find everything
            you need to add beauty and taste to your life.
          </p>
          <Button variant="contained">Shop Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreEvery;
