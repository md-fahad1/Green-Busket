"use client";
import Image from "next/image";

const categories = [
  {
    name: "Vegetables",
    image: "/img/green/vegetable1.jpg",
    count: 12,
  },
  {
    name: "Meat",
    image: "/img/green/meat1.jpg",
    count: 10,
  },
  {
    name: "Fish",
    image: "/img/green/fish1.jpg",
    count: 8,
  },
  {
    name: "Chiken",
    image: "/img/green/chiken.jpg",
    count: 7,
  },
  {
    name: "Milk",
    image: "/img/green/milk1.jpg",
    count: 6,
  },
  {
    name: "Oil",
    image: "/img/green/oil1.jpg",
    count: 9,
  },
  {
    name: "Cleaner",
    image: "/img/green/cleaner.jpg",
    count: 9,
  },
  {
    name: "Cooking",
    image: "/img/green/cooking.jpg",
    count: 9,
  },
  {
    name: "Juice",
    image: "/img/green/juice.jpg",
    count: 9,
  },
  {
    name: "Nuddles",
    image: "/img/green/ramen.jpg",
    count: 9,
  },
  {
    name: "rice",
    image: "/img/green/rice.jpg",
    count: 9,
  },
  {
    name: "Beverage",
    image: "/img/green/beverage.jpg",
    count: 9,
  },
];

export default function TopCategories() {
  return (
    <div className="px-4 py-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-600" />
        TOP CATEGORIES
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center">
            <div className="w-full h-28 relative mb-2">
              <Image
                src={cat.image}
                alt={cat.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="text-sm font-medium">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
