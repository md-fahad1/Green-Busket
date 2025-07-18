"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Offer = () => {
  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offers`
        );
        console.log("response", response.data);
        setOfferData(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
        {offerData.map((data, index) => (
          <div
            key={index}
            className="shadow-lg bg-white rounded-md p-4 w-full max-w-sm"
          >
            <div className="relative w-full h-[250px]">
              <Image
                src={data.image}
                alt={data.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-[20px] text-black my-4 text-center font-semibold">
                {data.name}
              </h2>
              <p className="text-[15px] text-gray-600 mb-2 text-center">
                {data.description}
              </p>
              <Link href={`/offer/offerdetails/${data.id}`}>
                <button className="text-[16px] text-white bg-[#3a4ab7] py-2 px-4 rounded text-center font-semibold cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
