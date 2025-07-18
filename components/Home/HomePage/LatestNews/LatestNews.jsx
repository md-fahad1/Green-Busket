import React from "react";
import SectionTitle from "../SectionTitle";
import image1 from "../../../../public/img/news/news-1.png";
import image2 from "../../../../public/img/news/news-2.png";
import image3 from "../../../../public/img/news/news-3.png";
import Image from "next/image";

import NewsCard from "./NewsCard";
const LatestNews = () => {
  const newses = [
    {
      id: 1,
      title: "Upon Of Seasons Earth",
      news: "Duis faucibus enim vitae  matt",
      date: "12-21-2024",
      image: image1,
    },
    {
      id: 2,
      title: "Upon Of Seasons Earth",
      news: "Duis faucibus enim vitae  matt",
      date: "12-21-2024",
      image: image2,
    },
    {
      id: 3,
      title: "Upon Of Seasons Earth",
      news: "Duis faucibus enim vitae  matt Duis faucibus enim vitae  matt",
      date: "12-21-2024",
      image: image3,
    },
  ];
  return (
    <div className="container mx-auto mb-24">
      <SectionTitle title="Latest News" />
      <div className="lg:grid gap-4 space-y-4 lg:space-y-0 grid-cols-2 mt-12">
        <div>
          <Image
            src={newses[0].image}
            alt={newses[0].title}
            className="h-full max-h-[600px] object-top w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 h-full">
          {newses.slice(1, 3).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
