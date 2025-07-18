"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/lib/features/hooks";
import CartSideBar from "../Cart/CartSideBar";
import { useDispatch } from "react-redux";
import { cartVisible } from "@/lib/features/cart/cartSlice";

const AddToCartPart = () => {
  const { items, isCartVisible } = useAppSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleCartOpen = () => {
    dispatch(cartVisible(true));
  };

  return (
    <div>
      <button
        onClick={handleCartOpen}
        className="flex flex-col items-center gap-2 lg:flex-row"
      >
        <div>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="w-5 h-5 text-gray-500"
          />
        </div>
        <div className="text-white">
          <p className="relative font-semibold text-2xs md:text-sm w-fit">
            <span className="absolute grid w-3 h-4 text-xs font-bold text-red-100 bg-green-600 rounded-full -top-5 -right-0 place-items-center">
              {items?.length}
            </span>
          </p>
          {/* <p className="text-xs mt-[-1px] hidden lg:block">Add items</p> */}
        </div>
      </button>
      <CartSideBar />
    </div>
  );
};

export default AddToCartPart;

// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { useAppSelector, useAppDispatch } from "@/lib/features/hooks";

// import CartSideBar from "../Cart/CartSideBar";

// import { cartVisible } from "@/lib/features/cart/cartSlice";
// import axios from "axios"; // Ensure axios is imported

// const AddToCartPart = () => {
//   const [count, setCount] = useState(0);
//   const dispatch = useAppDispatch();
//   const { currentUser } = useAppSelector((state) => state.user);
//   console.log("currentUser", currentUser);
//   const items = useAppSelector((state) => state.cart.cartItem);
//   console.log("item", items);

//   // Ensure currentUser is defined before using it
//   // Replace with actual user context or state

//   useEffect(() => {
//     const fetchCartCount = async () => {
//       try {
//         const cartResponse = await axios.get(
//           `https://testingbackend.farseit.com/cart/ProductCount/user/${currentUser.Id}`
//         );
//         setCount(cartResponse.data);
//       } catch (error) {
//         console.error("Error fetching cart count:", error);
//       }
//     };

//     fetchCartCount();
//   }); // Add dependency to avoid unnecessary re-fetching

//   const handleCartOpen = () => {
//     dispatch(cartVisible(true));
//   };

//   return (
//     <div>
//       <button
//         onClick={handleCartOpen}
//         className="flex flex-col items-center gap-2 lg:flex-row"
//       >
//         <div>
//           <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
//         </div>
//         <div className="text-white">
//           <p className="relative font-semibold text-2xs md:text-sm w-fit">
//             Cart
//             <span className="absolute grid w-5 h-5 text-xs font-bold text-red-100 bg-red-600 rounded-full -top-2 -right-5 place-items-center">
//               {count}
//             </span>
//           </p>
//         </div>
//       </button>
//       <CartSideBar />
//     </div>
//   );
// };

// export default AddToCartPart;
