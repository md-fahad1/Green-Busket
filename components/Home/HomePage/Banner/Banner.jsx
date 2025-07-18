"use client";
import Image from "next/image";

const banners = [
  {
    title: "Get Up to 30%* OFF",
    buttonText: "SHOP NOW",
    image: "/img/green/offer4.jpg", // replace with your actual image
    bgColor: "bg-lime-400",
    textColor: "text-white",
    buttonBg: "bg-black",
    buttonTextColor: "text-white",
  },
  {
    title: "DAILY HOUSEHOLD",
    subtitle: "Minimum 40% OFF Everyday",
    buttonText: "SHOP NOW",
    image: "/img/green/offer1.jpg",
    bgColor: "bg-yellow-300",
    textColor: "text-black",
    buttonBg: "bg-black",
    buttonTextColor: "text-white",
  },
  {
    title: "MILK CHOCOLATES",
    subtitle: "Minimum 40% OFF Everyday",
    buttonText: "SHOP NOW",
    image: "/img/green/offer3.jpg",
    bgColor: "bg-orange-300",
    textColor: "text-white",
    buttonBg: "bg-black",
    buttonTextColor: "text-white",
  },
  {
    title: "Get Up to 30%* OFF",
    buttonText: "SHOP NOW",
    image: "/img/green/offer5.jpg",
    bgColor: "bg-red-400",
    textColor: "text-white",
    buttonBg: "bg-yellow-300",
    buttonTextColor: "text-black",
  },
];

export default function BannerGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {/* Large Left Banner */}
      <div className={`relative p-6 rounded-xl ${banners[0].bgColor}`}>
        <Image
          src={banners[0].image}
          alt="Banner 1"
          width={500}
          height={500}
          className="absolute right-2 bottom-2 w-24 md:w-48 object-contain"
        />
        <h2 className={`text-xl font-bold ${banners[0].textColor}`}>
          {banners[0].title}
        </h2>
        <button
          className={`mt-4 px-4 py-2 rounded ${banners[0].buttonBg} ${banners[0].buttonTextColor}`}
        >
          {banners[0].buttonText}
        </button>
      </div>

      {/* Two Small Banners */}
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className={`relative p-4 rounded-xl flex items-center justify-between ${banners[i].bgColor}`}
          >
            <div>
              <h2 className={`text-lg font-bold ${banners[i].textColor}`}>
                {banners[i].title}
              </h2>
              <p className={`text-sm ${banners[i].textColor}`}>
                {banners[i].subtitle}
              </p>
              <button
                className={`mt-2 px-3 py-1 rounded ${banners[i].buttonBg} ${banners[i].buttonTextColor} text-sm`}
              >
                {banners[i].buttonText}
              </button>
            </div>
            <Image
              src={banners[i].image}
              alt={`Banner ${i + 1}`}
              width={100}
              height={100}
              className="object-contain w-32"
            />
          </div>
        ))}
      </div>

      {/* Large Right Banner */}
      <div className={`relative p-6 rounded-sm ${banners[3].bgColor}`}>
        <Image
          src={banners[3].image}
          alt="Banner 4"
          width={500}
          height={500}
          className="absolute right-2 bottom-2 w-24 md:w-48 object-contain"
        />
        <h2 className={`text-xl font-bold ${banners[3].textColor}`}>
          {banners[3].title}
        </h2>
        <button
          className={`mt-4 px-4 py-2 rounded ${banners[3].buttonBg} ${banners[3].buttonTextColor}`}
        >
          {banners[3].buttonText}
        </button>
      </div>
    </div>
  );
}
