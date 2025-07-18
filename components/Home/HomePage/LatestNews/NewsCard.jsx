import React from "react";
import { IoClipboardOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
const NewsCard = ({ news }) => {
  return (
    <div className="flex gap-4 items-center w-full h-full  ">
      <Image
        src={news.image}
        alt={news.title}
        className="w-[120px] md:w-[300px] h-full object-cover"
      />
      <div className="space-y-2 overflow-hidden w-full">
        <h4 className=" text-lg md:text-2xl font-playfair font-semibold truncate">
          {news.title}
        </h4>
        <p className="text-xs md:text-base text-ellipsis overflow-hidden text-nowrap truncate">
          {news.news}
        </p>
        <Link href={`news/${news.id}`}>
          <span className="text-sm md:text-base">
            Read More <IoIosArrowForward className="inline" />
          </span>
        </Link>
        <div className="flex justify-between items-center text-xs md:text-base">
          <p className="flex gap-1 items-center ">
            <CiCalendar /> <span>{news.date}</span>
          </p>
          <p className="flex gap-1 items-center ">
            <IoClipboardOutline />
            <span>comment</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
