"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { ImSpinner3 } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  addToCart,
  cartCountDecrement,
  cartCountIncrement,
  removeFromCart,
} from "@/lib/features/cart/cartSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const CartCard = ({ cart, checkout }) => {
  const { productId, image, price, name, quantity, color, count } = cart;

  const dispatch = useDispatch();

  // quantity increment
  const handleIncrease = (productId) => {
    if (count > 9) {
      return;
    }
    // console.log(productId);
    dispatch(cartCountIncrement(productId));
  };
  // console.log(cart);

  // quantity decrement

  const handleDecrease = (productId) => {
    if (count < 2) {
      return;
    }
    dispatch(cartCountDecrement(productId));
  };
  //remove item from cart
  const handleRemove = (id) => {
    // console.log(id);
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex-grow overflow-y-auto">
      <div className="flex items-start justify-between gap-3 p-2 border-b border-dashed px-4">
        <div className="flex items-start gap-3">
          <Image
            width={56}
            height={56}
            src={image[0]}
            alt={name}
            className="object-cover w-[56px] h-[56px]"
          />
          <div className="space-y-1 md:space-y-1 text-secondary ">
            <h3 className="text-base ">
              {name.length > 22 ? `${name.slice(0, 22)}...` : name}
            </h3>
            <div className=" flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleDecrease(productId)}
                className="border border-gray-300 shadow text-center px-2 rounded-md text-xl"
              >
                {" "}
                -{" "}
              </button>
              <span>{cart?.count || 1}</span>
              <button
                type="button"
                onClick={() => handleIncrease(productId)}
                className="border border-gray-300 shadow text-center px-2 rounded-md text-xl"
              >
                {" "}
                +{" "}
              </button>
            </div>
            {/* color selection */}
            {checkout && color && (
              <div>
                <FormControl sx={{ mt: "4px" }} size="small">
                  {/* <InputLabel>Color</InputLabel> */}
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={color}
                    name="color"
                    // label="Color"
                    defaultValue="Select One"
                    size="small"
                    sx={{
                      "& .MuiSelect-select": {
                        paddingX: "10px",
                        paddingY: "4px",
                      },
                    }}
                  >
                    <MenuItem value={"red"} sx={{ paddingY: "2px" }}>
                      Red
                    </MenuItem>
                    <MenuItem value={"green"} sx={{ paddingY: "2px" }}>
                      Green
                    </MenuItem>
                    <MenuItem value={"blue"} sx={{ paddingY: "2px" }}>
                      Blue
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 text-secondary">
          <button
            type="button"
            onClick={() => handleRemove(productId)}
            className="text-secondary hover:text-red-600 duration-300 px-2 rounded-md"
          >
            <GoTrash className="text-lg " />
            {/* loading remove */}
            {/* {loading ? (
              <ImSpinner3 className="animate-spin" />
            ) : (
              <GoTrash className="text-lg " />
            )} */}
          </button>
          <p>
            <span className="mr-0.5">৳</span>{" "}
            {new Intl.NumberFormat().format(
              parseFloat(price * count).toFixed(2)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

// // src/components/CartCard.js

// "use client";
// import React from "react";
// import Image from "next/image";
// import { GoTrash } from "react-icons/go";

// const CartCard = ({ cart }) => {
//   const { Id, image, price, name, quantity } = cart;

//   return (
//     <div className="flex justify-between items-center p-4 border-b border-gray-300">
//       <div className="flex items-center gap-3">
//         <Image
//           width={56}
//           height={56}
//           // src={image[0]} // Assuming image is an array of image URLs.
//           alt={name}
//           className="object-cover w-[56px] h-[56px]"
//         />
//         <div>
//           <h3 className="text-base font-medium">{name}</h3>
//           <p className="text-sm text-gray-600">৳{price}</p>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               className="border border-gray-300 px-2 rounded-md text-xl"
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button
//               type="button"
//               className="border border-gray-300 px-2 rounded-md text-xl"
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>

//       <button type="button" className="text-red-600 hover:text-red-800">
//         <GoTrash className="text-lg" />
//       </button>
//     </div>
//   );
// };

// export default CartCard;
