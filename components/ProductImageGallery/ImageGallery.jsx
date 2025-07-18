"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./imageGallery.css";

const ImageGallery = ({ image, productName, images }) => {
  const [showImage, setShowImage] = useState("");

  // image zooming
  useEffect(() => {
    let imageZoom = document.getElementById("imageZoom");
    imageZoom.addEventListener("mousemove", (event) => {
      imageZoom.style.setProperty("--display", "block");
      let pointer = {
        x: (event.offsetX * 100) / imageZoom.offsetWidth,
        y: (event.offsetY * 100) / imageZoom.offsetHeight,
      };
      imageZoom.style.setProperty("--zoomX", `${pointer.x}%`);
      imageZoom.style.setProperty("--zoomY", `${pointer.y}%`);
    });

    imageZoom.addEventListener("mouseleave", (event) => {
      imageZoom.style.setProperty("--display", "none");
    });
  }, []);

  const styles = {
    "--url": `url(${showImage ? showImage.image : image})`,
    "--zoomX": "0%",
    "--zoomY": "0%",
    "--display": "none",
  };

  return (
    <div className="flex md:flex-row-reverse flex-col lg:flex-col gap-5 mt-5">
      <div className="relative">
        <div id="imageZoom" style={styles}>
          {image && (
            <Image
              src={showImage ? showImage?.image : image}
              alt={"Product Big Image"}
              height={400}
              width={400}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row md:flex-col lg:flex-row gap-2 lg:gap-5 mt-4 md:mt-0 lg:mt-2">
        {images?.map((img) => (
          <div key={img.id} className=" flex-1 md:flex-none lg:flex-1">
            <Image
              onClick={() => setShowImage(img)}
              src={img.image}
              alt="Product Image"
              height={100}
              width={100}
              className={`h-[100px] w-full flex-grow object-cover rounded-2xl ${
                img?.id === showImage?.id &&
                "border-4  border-[#192a56] duration-200 "
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
