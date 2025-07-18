import products from "../../public/data/product.json";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const HighlightsProducts = () => {
  return (
    <div className="mt-5">
      <Swiper
        style={{
          // "--swiper-navigation-color": "#192a56",
          "--swiper-navigation-size": "30px",
        }}
        spaceBetween={20}
        centeredSlides={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // slidesPerView={8}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        className=""
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="rounded-md">
              <Link href="#">
                <Image
                  src={product.image}
                  width={800}
                  height={400}
                  alt="Banner1"
                  className=" h-[100px] object-cover object-center rounded-md"
                />
                <span>
                  <small className="text-[12px] block text-center font-oswald">
                    {product.name}
                  </small>
                </span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HighlightsProducts;
