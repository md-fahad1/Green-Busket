"use client";
import { cartVisible } from "@/lib/features/cart/cartSlice";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import Image from "next/image";

const CartSideBar = () => {
  const { isCartVisible, items } = useSelector((state) => state.cart);

  const sideNavRef = useRef(null);

  const dispatch = useDispatch();
  const handleCloseCart = () => {
    dispatch(cartVisible(false));
  };

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideNavRef]);

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      // Clicked outside the side navigation bar, close it

      dispatch(cartVisible(false));
    }
  }
  return (
    <div
      ref={sideNavRef}
      className={`fixed right-0 top-0 h-screen  z-50 bg-white shadow-lg w-[90%] md:w-[400px]  transition-transform duration-500 ease-in-out ${
        isCartVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Container to ensure proper layout */}
      <div className="flex flex-col h-full shadow-2xl">
        {/* Cart Header */}
        <div className="p-4 flex items-center justify-between bg-green-50 text-black">
          <h2 className="text-base font-medium">Your Shopping Cart</h2>
          <button onClick={handleCloseCart}>
            <FaArrowRight />
          </button>
        </div>

        <div className="px-4 lg:px-6 h-full flex flex-col">
          {/* Cart Items */}
          <div>
            {items?.length === 0 && (
              <div className="flex justify-center items-center flex-col">
                <h2 className="text-xl font-medium text-gray-400 text-center mt-3">
                  Your Cart is Empty
                </h2>
                <Image
                  src={"/img/empty-cart.png"}
                  height={250}
                  width={250}
                  alt="empty cart"
                  className="opacity-50 mt-6"
                />
              </div>
            )}
            <div className="overflow-auto h-[64vh]">
              {items?.map((cart) => (
                <CartCard key={cart.productId} cart={cart}></CartCard>
              ))}
            </div>
          </div>

          <div className="mt-auto ">
            <div>
              {items?.length > 0 && (
                <div className=" text-secondary border-y-gray-300 border-dashed border-y px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
                  <h3>Sub Total:</h3>
                  <span className="mr-0.5 font-bold">
                    ৳{" "}
                    {items
                      ?.reduce(
                        (acc, cur) => acc + parseFloat(cur.price) * cur.count,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {items?.length > 0 && (
              <div className="flex items-center  mb-4 justify-center gap-6">
                <Link
                  href={"/checkout"}
                  onClick={handleCloseCart}
                  className="px-10 py-2 w-full text-center font-medium text-gray-500 duration-300 border border-gray-300 hover:bg-primary  hover:text-white rounded "
                >
                  Check Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSideBar;

// import React, { useEffect, useState } from "react";
// import { FaArrowRight } from "react-icons/fa";

// import { GoTrash } from "react-icons/go";
// import axios from "axios";
// import { cartVisible, setCartCount } from "@/lib/features/cart/cartSlice";
// import Link from "next/link";
// import Image from "next/image";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import { useAppSelector, useAppDispatch } from "@/lib/features/hooks";
// const CartSideBar = () => {
//   const { isCartVisible } = useAppSelector((state) => state.cart);
//   const { currentUser } = useAppSelector((state) => state.user);
//   const dispatch = useAppDispatch();
//   const [cartItems, setCartItems] = useState([]);
//   const items = useAppSelector((state) => state.cart.cartItem);
//   console.log("item", items);

//   // Fetch cart data
//   const getData = async () => {
//     if (currentUser) {
//       try {
//         const response = await axios.get(
//           `https://testingbackend.farseit.com/cart/user/${currentUser.Id}`
//         );
//         const products = response.data[0]?.products || [];
//         setCartItems(products);
//         dispatch(
//           setCartCount(products.reduce((acc, item) => acc + item.quantity, 0))
//         );
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//         setCartItems([]);
//         dispatch(setCartCount(0));
//       }
//     }
//   };

//   useEffect(() => {
//     if (currentUser) getData();
//   }, [currentUser]);

//   const handleCloseCart = () => {
//     dispatch(cartVisible(false));
//   };

//   // Handle delete product
//   const handleDeleteProduct = async (productId) => {
//     if (!currentUser) return;

//     try {
//       const res = await axios.delete(
//         `https://testingbackend.farseit.com/cart/user/${currentUser.Id}/product/${productId}`
//       );
//       if (res.data.success) {
//         setCartItems((prevItems) =>
//           prevItems.filter((item) => item.product.Id !== productId)
//         );

//         Swal.fire({
//           position: "bottom-right",
//           icon: "success",
//           title: "Product deleted",
//           showConfirmButton: false,
//           timer: 1500,
//           toast: true,
//           timerProgressBar: true,
//         });

//         const cartResponse = await axios.get(
//           `https://testingbackend.farseit.com/cart/ProductCount/user/${currentUser.Id}`
//         );
//         dispatch(setCartCount(cartResponse.data || 0));
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   // Handle increase quantity
//   const handleIncreaseQuantity = async (productId) => {
//     if (!currentUser) return;

//     try {
//       await axios.post(`https://testingbackend.farseit.com/cart/add`, {
//         userId: currentUser.Id,
//         productId: productId,
//       });
//       getData();
//       Swal.fire({
//         position: "bottom-right",
//         icon: "success",
//         title: "Quantity increased",
//         showConfirmButton: false,
//         timer: 1500,
//         toast: true,
//         timerProgressBar: true,
//       });
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     }
//   };

//   // Handle decrease quantity
//   const handleDecreaseQuantity = async (productId, quantity) => {
//     if (!currentUser || quantity <= 1) return;

//     try {
//       await axios.put(
//         `https://testingbackend.farseit.com/cart/user/${currentUser.Id}/product/${productId}`
//       );
//       getData();
//       Swal.fire({
//         position: "bottom-right",
//         icon: "success",
//         title: "Quantity decreased",
//         showConfirmButton: false,
//         timer: 1500,
//         toast: true,
//         timerProgressBar: true,
//       });
//     } catch (error) {
//       console.error("Error decreasing quantity:", error);
//     }
//   };

//   return (
//     <div
//       className={`fixed right-0 top-0 h-screen z-50 bg-white shadow-lg w-[90%] md:w-[400px] transition-transform duration-500 ease-in-out ${
//         isCartVisible ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="flex flex-col h-full shadow-2xl">
//         <div className="p-4 flex items-center justify-between bg-primary text-white">
//           <h2 className="text-base font-medium">Your Shopping Cart</h2>
//           <button onClick={handleCloseCart}>
//             <FaArrowRight />
//           </button>
//         </div>

//         <div className="px-4 lg:px-6 h-full flex flex-col">
//           {cartItems.length === 0 ? (
//             <div className="flex justify-center items-center flex-col">
//               <h2 className="text-xl font-medium text-gray-400 text-center mt-3">
//                 Your Cart is Empty
//               </h2>
//             </div>
//           ) : (
//             <div className="overflow-auto h-[64vh]">
//               {cartItems.map((cartItem) => {
//                 const productImages = cartItem.product.image.split(",");
//                 const mainImage = productImages[0];

//                 return (
//                   <div
//                     key={cartItem.product.Id}
//                     className="flex justify-between items-center p-4 border-b border-gray-300"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Image
//                         width={56}
//                         height={56}
//                         src={mainImage}
//                         alt={cartItem.product.name}
//                         className="object-cover w-[56px] h-[56px]"
//                       />
//                       <div>
//                         <h3 className="text-base text-black font-medium">
//                           {cartItem.product.name}
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           ৳{cartItem.product.price}
//                         </p>
//                         <div className="flex items-center gap-3">
//                           <button
//                             className="border border-gray-300 px-2 text-black rounded-md text-xl"
//                             onClick={() =>
//                               handleIncreaseQuantity(cartItem.product.Id)
//                             }
//                           >
//                             +
//                           </button>
//                           <span className="text-black">
//                             {cartItem.quantity}
//                           </span>
//                           <button
//                             className="border border-gray-300 px-2 rounded-md text-black text-xl"
//                             onClick={() =>
//                               handleDecreaseQuantity(
//                                 cartItem.product.Id,
//                                 cartItem.quantity
//                               )
//                             }
//                           >
//                             -
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDeleteProduct(cartItem.product.Id)}
//                     >
//                       <GoTrash className="text-lg" />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {cartItems.length > 0 && (
//           <div className="mt-auto">
//             <div className="text-secondary border-y-gray-300 border-dashed border-y px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Sub Total:</h3>
//               <span className="mr-0.5 font-bold">
//                 ৳{" "}
//                 {cartItems
//                   .reduce(
//                     (acc, cur) =>
//                       acc + parseFloat(cur.product.price) * cur.quantity,
//                     0
//                   )
//                   .toFixed(2)}
//               </span>
//             </div>
//             <div className="flex items-center mb-4 justify-center gap-6">
//               <Link
//                 href="/checkout"
//                 className="px-10 py-2 w-full text-center font-medium text-gray-500 border border-gray-300 hover:bg-primary hover:text-white rounded"
//               >
//                 Check Out
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartSideBar;
