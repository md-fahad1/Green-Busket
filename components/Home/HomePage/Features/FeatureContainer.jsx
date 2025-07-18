// // FeatureContainer.js

// import React, { useState, useEffect } from "react";
// import { IoIosStar } from "react-icons/io";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { addToCart } from "@/lib/features/cart/cartSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
// import { setCartCount } from "@/lib/features/cart/cartSlice"; // Adjust the import path
// import Link from "next/link";
// import Image from "next/image";

// const FeatureContainer = () => {
//   const dispatch = useAppDispatch();
//   const { currentUser } = useAppSelector((state) => state.user);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`;

//   const fetchFeatureProducts = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setProducts(response.data);
//       console.log("image", response.data);
//     } catch (error) {
//       console.error("Error fetching featured products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeatureProducts();
//     handleAddToCart();
//   }, []);

//   const handleAddToCart = async (product) => {
//     if (!product || !product.name) {
//       return;
//     }
//     console.log("product", product);
//     let count = 1;
//     // let totalPrice = product.price;
//     // try {
//     //   if (!currentUser) {
//     //     Swal.fire({
//     //       title: "Error",
//     //       text: "You need to be logged in to add items to the cart.",
//     //       icon: "error",
//     //       confirmButtonText: "OK",
//     //     });
//     //     return;
//     //   }

//     //   const response = await axios.post(
//     //     ADD_TO_CART_URL,
//     //     {
//     //       userId: currentUser.Id,
//     //       productId: product.Id,
//     //     },
//     //     {
//     //       headers: { "Content-Type": "application/json" },
//     //     }
//     //   );

//     //   console.log("response", response.data);
//     //   if (response.data.success) {
//     //     // Swal.fire({
//     //     //   title: "Success",
//     //     //   text: "Product added to cart!",
//     //     //   icon: "success",
//     //     //   confirmButtonText: "OK",
//     //     // });

//     //     // Fetch updated cart count and dispatch to Redux
//     //     const cartResponse = await axios.get(
//     //       `https://testingbackend.farseit.com/cart/ProductCount/user/${currentUser.Id}`
//     //     );
//     //     console.log("cart", cartResponse);
//     //     const updatedCartCount = cartResponse.data || 0;
//     //     dispatch(setCartCount(updatedCartCount)); // Update Redux cart count
//     //   }
//     // } catch (error) {
//     //   console.error("Error adding to cart:", error);
//     //   Swal.fire({
//     //     title: "Error",
//     //     text: "Failed to add product to cart. Please try again.",
//     //     icon: "error",
//     //     confirmButtonText: "OK",
//     //   });
//     // }
//     const cartInfo = {
//       name: product.name,
//       image: product.image,
//       productId: product.Id,
//       price: product.price,
//       count,
//       // totalPrice,
//     };
//     // console.log(cartInfo);
//     dispatch(addToCart(cartInfo));
//   };
//   const handleBuyNow = (product) => {
//     handleAddToCart(product);
//     router.push("/checkout");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-4">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 mt-12 gap-y-6">
//       {products.map((product) => (
//         <div
//           key={product.Id}
//           className="relative border flex flex-col justify-between h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg group"
//         >
//           <div className="z-30">
//             <div className="group overflow-hidden">
//               <Link href={`products/product-info/${product.Id}`}>
//                 <Image
//                   src={product.image[0]}
//                   alt={product.name}
//                   width={300}
//                   height={200}
//                   className="object-cover w-full aspect-[4/5] group-hover:scale-105 transition-all duration-300"
//                 />
//               </Link>
//             </div>
//             <div className="p-2 space-y-1.5 overflow-hidden">
//               <h2 className="leading-tight text-center capitalize truncate text-normal font-roboto font-medium">
//                 {product.name}
//               </h2>
//               <div className="flex justify-between items-center">
//                 <div className="flex flex-col flex-nowrap">
//                   <p className="flex justify-center gap-1 text-xs flex-nowrap font-lato md:text-base">
//                     <span className="mr-0.5">৳</span>
//                     {new Intl.NumberFormat().format(product.price)}
//                   </p>
//                 </div>
//                 <span className="flex items-center rounded text-sm gap-1 px-1 bg-[#E1EFE0] text-dash-primary">
//                   <span>{product.rating ? product.rating : 0}</span>
//                   <IoIosStar />
//                 </span>
//               </div>
//               <div className="flex justify-center gap-2 w-full">
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="flex-1 w-full max-w-[200px] rounded-md border border-dash-primary text-[10px] capitalize text-[#192a56] font-semibold text-center py-1 md:px-1.5 md:text-[11px] transition-all duration-300 hover:bg-dash-primary hover:text-white"
//                 >
//                   Add to Cart
//                 </button>
//                 <Link
//                   onClick={() => handleBuyNow(product)}
//                   className="flex-1 w-full max-w-[200px] rounded-md bg-dash-primary text-[10px] capitalize text-white text-center font-semibold py-1 md:px-1.5 md:text-[11px] transition-all duration-300 hover:bg-[#0056b3]"
//                 >
//                   Buy Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FeatureContainer;

// FeatureContainer.js
import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
import Link from "next/link";
import Image from "next/image";

const FeatureContainer = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`;

  const fetchFeatureProducts = async () => {
    try {
      const response = await axios.get(API_URL);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatureProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!product || !product.name) return;

    // 👉 Extract default attributes (you can adjust this logic)
    const defaultAttributes = product.json_attribute?.attributes || {};

    const selectedAttributes = {};

    // Pick one value from each attribute group as default (e.g., first non-zero)
    Object.entries(defaultAttributes).forEach(([key, options]) => {
      const selectedOption = Object.entries(options).find(
        ([_, count]) => count > 0
      );
      if (selectedOption) {
        selectedAttributes[key] = {
          [selectedOption[0]]: selectedOption[1],
        };
      }
    });

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.Id,
      price: product.price,
      count: 1,
      attributes: selectedAttributes, // ✅ include attributes
    };

    dispatch(addToCart(cartInfo));

    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${product.name} has been added to your cart!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 mt-12 gap-y-6">
      {products.map((product) => (
        <div
          key={product.Id}
          className="relative border flex flex-col justify-between h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg group"
        >
          <div className="z-30">
            <div className="group overflow-hidden">
              <Link href={`products/product-info/${product.Id}`}>
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover w-full aspect-[4/5] group-hover:scale-105 transition-all duration-300"
                />
              </Link>
            </div>
            <div className="p-2 space-y-1.5 overflow-hidden">
              <h2 className="leading-tight text-center capitalize truncate text-normal font-roboto font-medium">
                {product.name}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="flex justify-center gap-1 text-xs font-lato md:text-base">
                    <span className="mr-0.5">৳</span>
                    {new Intl.NumberFormat().format(product.price)}
                  </p>
                </div>
                <span className="flex items-center rounded text-sm gap-1 px-1 bg-[#E1EFE0] text-dash-primary">
                  <span>{product.rating ? product.rating : 0}</span>
                  <IoIosStar />
                </span>
              </div>
              <div className="flex justify-center gap-2 w-full">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 w-full max-w-[200px] rounded-md border border-dash-primary text-[10px] capitalize text-[#192a56] font-semibold text-center py-1 md:px-1.5 md:text-[11px] transition-all duration-300 hover:bg-dash-primary hover:text-white"
                >
                  Add to Cart
                </button>

                <Link
                  href={`/checkout?productId=${product.Id}`}
                  className="flex-1 w-full max-w-[200px] rounded-md bg-dash-primary text-[10px] capitalize text-white text-center font-semibold py-1 md:px-1.5 md:text-[11px] transition-all duration-300 hover:bg-[#0056b3]"
                  onClick={() => handleAddToCart(product)}
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

export default FeatureContainer;
