// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import Image from "next/image";
// import { useAppDispatch } from "@/lib/features/hooks";
// import { FaRegHeart } from "react-icons/fa";
// import Link from "next/link";
// import { HandlerContext } from "@/lib/providers/HandlerProvider";
// import { IoHeartDislike } from "react-icons/io5";
// import { addToCart } from "@/lib/features/cart/cartSlice";
// import { IoIosStar } from "react-icons/io";
// import useProductAttributes from "@/lib/features/hooks/useProductAttributes";

// const ProductCard = ({ product }) => {
//   const { handleAddWishlist, wishProducts, handleRemoveWishListProduct } =
//     useContext(HandlerContext);
//   const dispatch = useAppDispatch();
//   const { attributes } = useProductAttributes();
//   const [inputAttribute, setInputAttribute] = useState({});

//   const handleAddToCart = (product) => {
//     let count = 1;
//     let totalPrice = product.price;

//     if (product.count) {
//       count++;
//       totalPrice = totalPrice + product.price;
//     }
//     if (attributes.length > 0) {
//       let pdInputAttributes = {};

//       attributes.forEach((attr) => {
//         const keys = Object.keys(attr);
//         const values = Object.values(attr);

//         const attribute = Object.keys(values[0]);

//         pdInputAttributes = {
//           ...pdInputAttributes,
//           [keys]: { [attribute[0]]: 1 },
//         };
//       });
//       setInputAttribute({ ...inputAttribute, ...pdInputAttributes });
//     }

//     const cartInfo = {
//       name: product.name,
//       image: product.image,
//       productId: product.id,
//       price: product.price,
//       count,
//       totalPrice,
//       attributes: inputAttribute,
//     };
//     // console.log(cartInfo);
//     dispatch(addToCart(cartInfo));
//   };

//   const handleBuy = () => {
//     handleAddToCart(product);
//   };

//   //get added wish list product
//   const addedWishProduct = wishProducts.find((pd) => pd.id === product.id);

//   return (
//     <div className="relative border flex flex-col justify-between h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg group">
//       <div className="absolute top-0 left-0 z-40 w-16 h-16">
//         <div className="absolute transform -rotate-45 bg-[#192a56] text-center text-white font-semibold py-1 left-[-55px] top-[20px] w-[170px] text-xs">
//           {product.offer} % OFF
//         </div>
//       </div>

//       <div className="z-30">
//         <div className="group  overflow-hidden">
//           <Link href={`products/product-info/${product.id}`}>
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={300}
//               height={200}
//               className="object-cover w-full aspect-[4/5] group-hover:scale-105 transition-all duration-300 "
//             />
//           </Link>
//           <div className=" right-4 top-4 absolute flex flex-col ">
//             {addedWishProduct?.id === product?.id ? (
//               <button
//                 onClick={() => handleRemoveWishListProduct(product.id)}
//                 className="bg-gray-100 mb-3 p-1.5 text-red-500 hover:bg-primary scale-0 group-hover:scale-[10px] duration-300  hover:text-white rounded-full"
//               >
//                 <IoHeartDislike className="text-xl " />
//               </button>
//             ) : (
//               <button
//                 onClick={() => handleAddWishlist(product)}
//                 className="bg-gray-100 mb-3 p-1.5 text-red-500 hover:bg-primary scale-0 group-hover:scale-[10px] duration-300  hover:text-white rounded-full"
//               >
//                 <FaRegHeart className="text-xl " />
//               </button>
//             )}
//           </div>
//         </div>
//         <div className="p-2 space-y-1.5 overflow-hidden">
//           <h2 className="leading-tight text-center capitalize truncate text-normal font-roboto font-medium">
//             {product.name}
//           </h2>
//           <div className="flex justify-between items-center">
//             <div className="flex flex-col flex-nowrap ">
//               <p className="flex justify-center gap-1 text-xs flex-nowrap font-lato md:text-base">
//                 <span className="mr-0.5">৳</span>
//                 {new Intl.NumberFormat().format(product.discountedPrice)}
//               </p>
//               <p className="flex justify-center gap-1 text-xs text-[#838790] line-through flex-nowrap font-lato md:text-sm">
//                 <span className="mr-0.5">৳</span>
//                 {/* "bn-BD", {
//                 style: "currency",
//                 currency: "BDT",
//               } */}
//                 {new Intl.NumberFormat().format(product.price)}
//               </p>
//             </div>
//             <span className="flex items-center rounded text-sm gap-1 px-1 bg-[#E1EFE0] text-dash-primary">
//               <span>{product.rating ? product.rating : 0}</span>
//               <IoIosStar />
//             </span>
//           </div>
//           <div className="flex justify-center gap-1.5">
//             <button
//               onClick={handleBuy}
//               className="rounded-md bg-dash-primary  basis-1/2 text-[10px] capitalize text-white md:px-2 md:text-xs"
//             >
//               <Link href={"/checkout"} className="px-1 py-2">
//                 Buy Now
//               </Link>
//             </button>
//             <button
//               className="rounded-md border border-dash-primary basis-1/2 px-1 py-2 text-[10px] capitalize text-[#192a56] md:px-2 md:text-xs"
//               onClick={() => handleAddToCart(product)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
"use client";
import React, { useContext, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/lib/features/hooks";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { HandlerContext } from "@/lib/providers/HandlerProvider";
import { IoHeartDislike } from "react-icons/io5";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { IoIosStar } from "react-icons/io";
import axios from "axios";

// Helper component for loading state
const Loading = () => (
  <div className="flex justify-center items-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
  </div>
);

const ProductCard = () => {
  const { handleAddWishlist, wishProducts, handleRemoveWishListProduct } =
    useContext(HandlerContext);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputAttribute, setInputAttribute] = useState({});
  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    const count = product.count ? product.count + 1 : 1;
    const totalPrice = count * product.price;

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.id,
      price: product.price,
      count,
      totalPrice,
      attributes: inputAttribute,
    };

    dispatch(addToCart(cartInfo));
  };

  const isInWishlist = (productId) =>
    wishProducts.some((item) => item.id === productId);

  if (loading) {
    return (
      <div className="flex flex-col lg:ml-28 px-3 h-screen overflow-auto scrollbar-thin gap-2">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <div
          key={product.Id}
          className="relative border flex flex-col justify-between h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg group"
        >
          {product.offer && (
            <div className="absolute top-0 left-0 z-40 w-16 h-16">
              <div className="absolute transform -rotate-45 bg-[#192a56] text-center text-white font-semibold py-1 left-[-55px] top-[20px] w-[170px] text-xs">
                {product.offer}% OFF
              </div>
            </div>
          )}

          <div className="z-30">
            <div className="group overflow-hidden">
              <Link href={`products/product-info/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[4/5] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="right-4 top-4 absolute flex flex-col">
                {isInWishlist(product.id) ? (
                  <button
                    onClick={() => handleRemoveWishListProduct(product.id)}
                    className="bg-gray-100 mb-3 p-1.5 text-red-500 hover:bg-primary scale-0 group-hover:scale-[10px] duration-300 hover:text-white rounded-full"
                  >
                    <IoHeartDislike className="text-xl " />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddWishlist(product)}
                    className="bg-gray-100 mb-3 p-1.5 text-red-500 hover:bg-primary scale-0 group-hover:scale-[10px] duration-300 hover:text-white rounded-full"
                  >
                    <FaRegHeart className="text-xl " />
                  </button>
                )}
              </div>
            </div>
            <div className="p-2 space-y-1.5 overflow-hidden">
              <h2 className="leading-tight text-center capitalize truncate text-normal font-roboto font-medium">
                {product.name}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex flex-col flex-nowrap ">
                  <p className="flex justify-center gap-1 text-xs flex-nowrap font-lato md:text-base">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.discountedPrice)}
                  </p>
                  <p className="flex justify-center gap-1 text-xs text-[#838790] line-through flex-nowrap font-lato md:text-sm">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.price)}
                  </p>
                </div>
                <span className="flex items-center rounded text-sm gap-1 px-1 bg-[#E1EFE0] text-dash-primary">
                  <span>{product.rating ? product.rating : 0}</span>
                  <IoIosStar />
                </span>
              </div>
              <div className="flex justify-center gap-1.5">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="rounded-md border border-dash-primary basis-1/2 text-[10px] capitalize text-[#192a56] md:px-2 md:text-xs"
                >
                  Add to Cart
                </button>
                <Link
                  href="/checkout"
                  className="rounded-md bg-dash-primary basis-1/2 text-[10px] capitalize text-white md:px-2 md:text-xs"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
