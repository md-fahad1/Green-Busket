"use client";
import React, { useEffect, useState } from "react";
import CartCard from "@/components/Cart/CartCard";
import Coupon from "@/components/Coupon/Coupon";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { clearCart } from "@/lib/features/cart/cartSlice";

const districts = [
  { id: 1, name: "Dhaka", value: "dhaka" },
  { id: 2, name: "Chattogram", value: "chattogram" },
  { id: 3, name: "Khulna", value: "khulna" },
  { id: 4, name: "Rajshahi", value: "rajshahi" },
  { id: 5, name: "Barishal", value: "barishal" },
  { id: 6, name: "Sylhet", value: "sylhet" },
  { id: 7, name: "Rangpur", value: "rangpur" },
  { id: 8, name: "Mymensingh", value: "mymensingh" },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const { currentUser } = useSelector((state) => state.user);

  const [couponData, setCouponData] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: currentUser?.name || "",
    district: "dhaka",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    address: currentUser?.address || "",
    payMethod: "Cash",
  });

  const onChange = (e) => {
    setCheckoutInfo({
      ...checkoutInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || items.length === 0) {
      Swal.fire("Error", "User not logged in or cart is empty", "error");
      return;
    }

    const orderData = {
      status: "Pending",
      user: { Id: currentUser?.Id },
      products: items.map((item) => ({
        Id: item.productId,
        quantity: item.count,
        json_attribute: {
          attributes: item.attributes || {},
        },
      })),
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Order/add`,
        orderData,
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.fire("Success", "Order placed successfully!", "success");
      dispatch(clearCart());
      setCheckoutInfo({
        name: "",
        district: "dhaka",
        phone: "",
        email: "",
        address: "",
        payMethod: "Cash",
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      Swal.fire("Error", "Order submission failed!", "error");
    }
  };

  const subTotal = items
    ?.reduce((acc, cur) => acc + parseFloat(cur.price) * cur.count, 0)
    .toFixed(2);
  const total = parseFloat(subTotal) + 50;

  return (
    <div className="h-full px-4 container mx-auto mt-4 md:mt-6 lg:mt-10 mb-12">
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="text-secondary font-medium">
            <FormControl className="w-full space-y-2 !mb-1">
              <label>
                Name: <span className="text-red-500">*</span>
              </label>
              <TextField
                name="name"
                onChange={onChange}
                value={checkoutInfo.name}
                placeholder="Enter Your Name"
                size="small"
                required
              />
            </FormControl>
            <div className="flex flex-col lg:flex-row gap-6">
              <FormControl className="w-full space-y-2 !mb-1">
                <label>
                  Phone: <span className="text-red-500">*</span>
                </label>
                <TextField
                  name="phone"
                  type="number"
                  onChange={onChange}
                  value={checkoutInfo.phone}
                  placeholder="Enter Your Phone"
                  size="small"
                  required
                />
              </FormControl>
              <FormControl className="w-full space-y-2 !mb-6">
                <label>
                  Email: <span className="text-red-500">*</span>
                </label>
                <TextField
                  name="email"
                  type="email"
                  onChange={onChange}
                  value={checkoutInfo.email}
                  placeholder="Enter Your Email"
                  size="small"
                  required
                />
              </FormControl>
            </div>
            <FormControl className="w-full space-y-2 !mb-6">
              <label>
                District: <span className="text-red-500">*</span>
              </label>
              <Select
                value={checkoutInfo.district}
                name="district"
                onChange={onChange}
                size="small"
              >
                {districts.map((menu) => (
                  <MenuItem key={menu.id} value={menu.value}>
                    {menu.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="w-full space-y-2 !mb-1">
              <label>
                Address: <span className="text-red-500">*</span>
              </label>
              <TextField
                name="address"
                onChange={onChange}
                value={checkoutInfo.address}
                placeholder="Enter Your Address"
                size="small"
                rows={2}
                multiline
                required
              />
            </FormControl>
          </div>
          <div>
            <div className="mb-12 max-h-[400px] overflow-y-auto">
              {items?.map((cart, idx) => (
                <CartCard key={idx} cart={cart} checkout={true}></CartCard>
              ))}
            </div>
            <div className=" text-secondary  px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
              <h3>Sub Total:</h3>
              <span className="mr-0.5 font-bold">৳ {subTotal}</span>
            </div>
            <div>
              {couponData || <Coupon setCouponData={setCouponData} />}
              {couponData && (
                <div className="px-5 py-2 mb-6 text-dash-primary">
                  You get 20% Off
                </div>
              )}
            </div>
            <div className=" text-secondary  px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
              <h3>Shipping Charge:</h3>
              <span className="mr-0.5 font-bold">৳ {50}</span>
            </div>

            <div className=" text-secondary border-y-gray-300  border-y px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
              <h3>Total:</h3>
              <span className="mr-0.5 font-bold">৳ {total.toFixed(2)}</span>
            </div>
            <div className="border shadow p-5">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="payMethod"
                  value={checkoutInfo.payMethod}
                  // defaultValue={"Cash"}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value="Cash"
                    control={<Radio />}
                    label="Cash In Delivery"
                  />
                  <div className="flex  items-center">
                    <FormControlLabel
                      value="Bikash"
                      control={<Radio />}
                      label="Bikash"
                    />
                    <Image
                      src="/icons/payment-icon/bKash.webp"
                      alt="bikash"
                      width={70}
                      height={40}
                      className="w-[70px] h-auto"
                    />
                  </div>

                  <div className="flex  items-center">
                    <FormControlLabel
                      value="Nagad"
                      control={<Radio />}
                      label="Nagad"
                    />
                    <Image
                      src="/icons/payment-icon/nagad.webp"
                      alt="nagad"
                      width={70}
                      height={40}
                      className="w-[70px] h-auto"
                    />
                  </div>

                  <div className="flex  items-center">
                    <FormControlLabel
                      value="Visa_Master"
                      control={<Radio />}
                      label="Visa card/Mastercard"
                    />
                    <Image
                      src="/icons/payment-icon/sslcz-verified.webp"
                      alt="ssl verification"
                      width={70}
                      height={40}
                      className="w-[70px] h-auto"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
              <div className="flex items-center mt-4 mb-4 justify-center gap-6">
                <button
                  type="submit"
                  className="px-10 py-3 w-full text-center font-medium duration-300 border border-gray-300 bg-primary  text-white rounded active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

// "use client";
// import CartCard from "@/components/Cart/CartCard";
// import Coupon from "@/components/Coupon/Coupon";
// import { useEffect } from "react";
// import { GoTrash } from "react-icons/go";
// import {
//   FormControl,
//   FormControlLabel,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   Select,
//   TextField,
// } from "@mui/material";
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Image from "next/image";

// import { clearCart } from "@/lib/features/cart/cartSlice";

// const districts = [
//   { id: 1, name: "Dhaka", value: "dhaka" },
//   { id: 2, name: "Chattogram", value: "chattogram" },
//   { id: 3, name: "Khulna", value: "khulna" },
//   { id: 4, name: "Rajshahi", value: "rajshahi" },
//   { id: 5, name: "Barishal", value: "barishal" },
//   { id: 6, name: "Sylhet", value: "sylhet" },
//   { id: 7, name: "Rangpur", value: "rangpur" },
//   { id: 8, name: "Mymensingh", value: "mymensingh" },
// ];

// const Checkout = () => {
//   const dispatch = useDispatch();

//   const { currentUser } = useSelector((state) => state.user);
//   console.log("user00", currentUser);
//   const [couponData, setCouponData] = useState(null);
//   const [checkoutInfo, setCheckoutInfo] = useState({
//     name: currentUser?.name || "",
//     district: "dhaka",
//     phone: currentUser?.phone || "",
//     email: currentUser?.email || "",
//     address: currentUser?.address || "",
//     payMethod: "Cash",
//   });

//   const [cartItems, setCartItems] = useState([]);

//   // Fetch cart data from the API
//   useEffect(() => {
//     if (currentUser) {
//       axios
//         .get(`https://testingbackend.farseit.com/cart/user/${currentUser.Id}`)
//         .then((response) => {
//           setCartItems(response.data[0]?.products);
//           // Assuming products are in the 'products' field
//         })
//         .catch((error) => {
//           console.error("Error fetching cart data:", error);
//         });
//     }
//   }, [currentUser]);

//   const onChange = (e) => {
//     setCheckoutInfo({
//       ...checkoutInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const orderData = {
//       status: "Pending",
//       user: { Id: currentUser?.Id },
//       products: cartItems.map((item) => ({
//         Id: item.Id,
//         quantity: item.quantity,
//         json_attribute: item.attributes || {},
//       })),
//     };
//     console.log("orderData", orderData);

//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Order/add`,
//         orderData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       Swal.fire("Success", "Order placed successfully!", "success");
//       dispatch(clearCart());
//       setCheckoutInfo({
//         name: "",
//         district: "dhaka",
//         phone: "",
//         email: "",
//         address: "",
//         payMethod: "Cash",
//       });
//     } catch (error) {
//       console.error("Error submitting order:", error);
//     }
//   };

//   // const subTotal = items
//   //   ?.reduce((acc, cur) => acc + parseFloat(cur.totalPrice), 0)
//   //   .toFixed(2);
//   // const total = parseFloat(subTotal) + 50;

//   return (
//     <div className="h-full px-4 container mx-auto mt-4 md:mt-6 lg:mt-10 mb-12">
//       <form onSubmit={handleSubmit} noValidate autoComplete="off">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="text-secondary font-medium">
//             <FormControl className="w-full space-y-2 !mb-1">
//               <label>
//                 Name: <span className="text-red-500">*</span>
//               </label>
//               <TextField
//                 name="name"
//                 onChange={onChange}
//                 value={checkoutInfo.name}
//                 placeholder="Enter Your Name"
//                 size="small"
//                 required
//               />
//             </FormControl>
//             <div className="flex flex-col lg:flex-row gap-6">
//               <FormControl className="w-full space-y-2 !mb-1">
//                 <label>
//                   Phone: <span className="text-red-500">*</span>
//                 </label>
//                 <TextField
//                   name="phone"
//                   type="number"
//                   onChange={onChange}
//                   value={checkoutInfo.phone}
//                   placeholder="Enter Your Phone"
//                   size="small"
//                   required
//                 />
//               </FormControl>
//               <FormControl className="w-full space-y-2 !mb-6">
//                 <label>
//                   Email: <span className="text-red-500">*</span>
//                 </label>
//                 <TextField
//                   name="email"
//                   type="email"
//                   onChange={onChange}
//                   value={checkoutInfo.email}
//                   placeholder="Enter Your Email"
//                   size="small"
//                   required
//                 />
//               </FormControl>
//             </div>
//             <FormControl className="w-full space-y-2 !mb-6">
//               <label>
//                 District: <span className="text-red-500">*</span>
//               </label>
//               <Select
//                 value={checkoutInfo.district}
//                 name="district"
//                 onChange={onChange}
//                 size="small"
//               >
//                 {districts.map((menu) => (
//                   <MenuItem key={menu.id} value={menu.value}>
//                     {menu.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl className="w-full space-y-2 !mb-1">
//               <label>
//                 Address: <span className="text-red-500">*</span>
//               </label>
//               <TextField
//                 name="address"
//                 onChange={onChange}
//                 value={checkoutInfo.address}
//                 placeholder="Enter Your Address"
//                 size="small"
//                 rows={2}
//                 multiline
//                 required
//               />
//             </FormControl>
//           </div>
//           <div>
//             <div className="mb-12 max-h-[400px] overflow-y-auto">
//               {cartItems.map((cartItem) => (
//                 <div
//                   key={cartItem.product.Id}
//                   className="flex justify-between items-center p-4 border-b border-gray-300"
//                 >
//                   <div className="flex items-center gap-3">
//                     {/* <Image
//                       width={56}
//                       height={56}
//                       src={cartItem.image[0]} // Adjusting image path
//                       alt={cartItem.name}
//                       className="object-cover w-[56px] h-[56px]"
//                     /> */}
//                     <div>
//                       <h3 className="text-base text-black font-medium">
//                         {cartItem.product.name}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         ৳{cartItem.product.price}
//                       </p>
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           className="border border-gray-300 px-2 text-black rounded-md text-xl"
//                         >
//                           -
//                         </button>
//                         <span className="text-black">{cartItem.quantity}</span>
//                         <button
//                           type="button"
//                           className="border border-gray-300 px-2 rounded-md text-black text-xl"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <GoTrash className="text-lg" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="text-secondary px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Sub Total:</h3>
//               {/* <span className="mr-0.5 font-bold">৳ {subTotal}</span> */}
//             </div>
//             <div>{couponData || <Coupon setCouponData={setCouponData} />}</div>
//             <div className="text-secondary px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Shipping Charge:</h3>
//               <span className="mr-0.5 font-bold">৳ {50}</span>
//             </div>
//             <div className="text-secondary border-y-gray-300 border-y px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Total:</h3>
//               {/* <span className="mr-0.5 font-bold">৳ {total.toFixed(2)}</span> */}
//             </div>
//             <div className="border shadow p-5">
//               <FormControl>
//                 <RadioGroup
//                   name="payMethod"
//                   value={checkoutInfo.payMethod}
//                   onChange={onChange}
//                 >
//                   <FormControlLabel
//                     value="Cash"
//                     control={<Radio />}
//                     label="Cash On Delivery"
//                   />
//                   <FormControlLabel
//                     value="Bikash"
//                     control={<Radio />}
//                     label="Bikash"
//                   />
//                   <FormControlLabel
//                     value="Nagad"
//                     control={<Radio />}
//                     label="Nagad"
//                   />
//                   <FormControlLabel
//                     value="Visa_Master"
//                     control={<Radio />}
//                     label="Visa/Mastercard"
//                   />
//                 </RadioGroup>
//               </FormControl>
//               <button
//                 type="submit"
//                 className="px-10 py-3 w-full text-center font-medium bg-primary text-white rounded"
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Checkout;
