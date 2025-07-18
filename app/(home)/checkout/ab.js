// "use client";
// import CartCard from "@/components/Cart/CartCard";
// import Coupon from "@/components/Coupon/Coupon";
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
//   const { items } = useSelector((state) => state.cart);

//   const { currentUser } = useSelector((state) => state.user);
//   const [couponData, setCouponData] = useState(null);
//   const [checkoutInfo, setCheckoutInfo] = useState({
//     name: currentUser?.name || "",
//     district: "dhaka",
//     phone: currentUser?.phone || "",
//     email: currentUser?.email || "",
//     address: currentUser?.address || "",
//     payMethod: "Cash",
//   });

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
//       products: items.map((item) => ({
//         Id: item.Id,
//         quantity: item.count,
//         json_attribute: item.attributes || {},
//       })),
//     };

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

//   const subTotal = items
//     ?.reduce((acc, cur) => acc + parseFloat(cur.totalPrice), 0)
//     .toFixed(2);
//   const total = parseFloat(subTotal) + 50;

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
//               {items?.map((cart, idx) => (
//                 <CartCard key={idx} cart={cart} checkout={true}></CartCard>
//               ))}
//             </div>
//             <div className="text-secondary px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Sub Total:</h3>
//               <span className="mr-0.5 font-bold">৳ {subTotal}</span>
//             </div>
//             <div>{couponData || <Coupon setCouponData={setCouponData} />}</div>
//             <div className="text-secondary px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Shipping Charge:</h3>
//               <span className="mr-0.5 font-bold">৳ {50}</span>
//             </div>
//             <div className="text-secondary border-y-gray-300 border-y px-5 py-2 mb-6 flex gap-3 justify-between font-medium">
//               <h3>Total:</h3>
//               <span className="mr-0.5 font-bold">৳ {total.toFixed(2)}</span>
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

// // AddToCartPart.js

// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAppSelector } from "@/lib/features/hooks"; // Adjust the import path
// import CartSideBar from "../Cart/CartSideBar";
// import { useDispatch } from "react-redux";
// import { cartVisible } from "@/lib/features/cart/cartSlice";

// const AddToCartPart = () => {
//   const [count, setCount] = useState();
//   useEffect(async () => {
//     const cartResponse = await axios.get(
//       `https://testingbackend.farseit.com/cart/ProductCount/user/${currentUser.Id}`
//     );
//     setCount(cartResponse.data);
//   });
//   // const dispatch = useDispatch();
//   // const { cartCount } = useAppSelector((state) => state.cart); // Get cart count from Redux

//   const handleCartOpen = () => {
//     dispatch(cartVisible(true)); // Open the cart sidebar
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
