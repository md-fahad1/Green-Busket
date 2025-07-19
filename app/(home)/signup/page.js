"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
import Link from "next/link";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { MdStorefront } from "react-icons/md";
import Image from "next/image";
import EmailOTPF from "@/components/EmailOTP_MODAL/EmailOTPF.jsx";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setEmailError("");
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    let valid = true;

    if (!formData.name.trim()) {
      valid = false;
      errors.name = "Name is required";
    }
    if (!formData.email) {
      valid = false;
      errors.email = "Email is required";
    }
    if (!formData.phone) {
      valid = false;
      errors.phone = "Phone is required";
    }
    if (formData.password.length < 6) {
      valid = false;
      errors.password = "Min 6 characters";
    }
    if (formData.password !== formData.confirm_password) {
      valid = false;
      errors.confirm_password = "Passwords must match";
    }

    setFormErrors(errors);
    if (!valid) return;

    const newForm = new FormData();
    Object.entries({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    }).forEach(([k, v]) => newForm.append(k, v));
    newForm.append("role", "user");
    newForm.append("registration_date", new Date().toISOString());
    if (formData.image) newForm.append("defaultPicture", formData.image);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`,
        newForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.status === 201) {
        setOtpModalOpen(true);
        setEmail(formData.email);
      }
    } catch (err) {
      console.error(err);
      setEmailError("Signup failed. Try again.");
    }
  };

  return (
    <section className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel */}
      <div className="relative hidden lg:flex items-center justify-center bg-green-50">
        <Image
          src="/img/green/vegetable1.jpg"
          alt="Fresh groceries"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute z-10 text-center p-6">
          <MdStorefront className="mx-auto text-green-700 text-6xl mb-4" />
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            Shop Fresh, Live Healthy
          </h2>
          <p className="text-gray-700 mb-4">
            Join our community and enjoy fresh groceries delivered to your
            doorstep.
          </p>
          <Link
            href="/signin"
            className="inline-block bg-green-700 text-white px-6 py-2 rounded transition hover:bg-green-800"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-center text-green-700 mb-1">
            Create Your Account
          </h3>
          <p className="text-center text-gray-500 mb-6">
            Start saving with fresh groceries!
          </p>
          {emailError && (
            <p className="text-red-500 text-center mb-4">{emailError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded focus:border-green-500"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded focus:border-green-500"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded focus:border-green-500"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-2 text-gray-400"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-2 text-gray-400"
              >
                <FiEye />
              </button>
              {formErrors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {formErrors.confirm_password}
                </p>
              )}
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full file:bg-green-600 file:text-white file:p-2 rounded border file:border-none mb-2"
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already registered?{" "}
            <Link
              href="/signin"
              className="text-green-700 font-medium hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>

      <EmailOTPF otpModalOpen={otpModalOpen} email={email} />
    </section>
  );
};

export default Signup;

// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
// import Link from "next/link";
// import OAuth from "../../OAuth/OAuth.jsx";
// import { FiEyeOff } from "react-icons/fi";
// import { Divider } from "@mui/material";
// import Image from "next/image";
// import { FiEye } from "react-icons/fi";
// import EmailOTPF from "@/components/EmailOTP_MODAL/EmailOTPF.jsx";

// const Signup = () => {
//   const [emailError, setEmailError] = useState("");
//   const router = useRouter();
//   const [showPass, setShowPass] = useState(false);
//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   // const { loading, error } = useAppSelector((state) => state.user);
//   const [email, setEmail] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     image: "",
//     phone: "",
//   });
//   const [formErrors, setFormErrors] = useState({
//     name: "",
//     email: "",
//     address: "",
//     phone: "",
//     password: "",
//     confirm_password: "",
//     role: "",
//     registration_date: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setFormErrors({
//       ...formErrors,
//       [name]: "",
//     });
//   };
//   const handleImageChange = (e) => {
//     const imgFile = e.target.files[0];
//     setFormData({
//       ...formData,
//       image: imgFile,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let isValid = true;
//     const newFormErrors = { ...formErrors };

//     // const imgResponse = await fetch("/img/user.png");
//     // const imgBlob = await imgResponse.blob();

//     if (formData.name.trim() === "") {
//       newFormErrors.name = "Name is required";
//       isValid = false;
//     } else {
//       const minNameLength = 2;
//       const maxNameLength = 150;
//       if (
//         formData.name.trim().length < minNameLength ||
//         formData.name.trim().length > maxNameLength
//       ) {
//         newFormErrors.name = `Name must be between ${minNameLength} and ${maxNameLength} characters`;
//         isValid = false;
//       }
//     }

//     if (formData.email.trim() === "") {
//       newFormErrors.email = "Email is required";
//       isValid = false;
//     } else {
//       if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newFormErrors.email = "Invalid email format";
//         isValid = false;
//       }

//       const maxEmailLength = 150;
//       if (formData.email.trim().length > maxEmailLength) {
//         newFormErrors.email = `Email must be ${maxEmailLength} characters or less`;
//         isValid = false;
//       }
//     }

//     if (formData.phone.trim() === "") {
//       newFormErrors.phone = "Phone number if required";
//       isValid = false;
//     } else if (formData.phone.length < 11) {
//       newFormErrors.phone = "Invalid Phone Number";
//       isValid = false;
//     }

//     // if (formData.address.trim() === "") {
//     //   newFormErrors.address = "Address is required";
//     //   isValid = false;
//     // }
//     if (formData.password !== formData.confirm_password) {
//       newFormErrors.confirm_password = "Confirm Password didn't match";
//       isValid = false;
//     }

//     // const phoneNumberRegex = /^\d{10,15}$/;
//     // if (formData.phone.trim() === "") {
//     //   newFormErrors.phone = "Phone number is required";
//     //   isValid = false;
//     // } else if (!phoneNumberRegex.test(formData.phone.trim())) {
//     //   newFormErrors.phone = "Invalid phone number format";
//     //   isValid = false;
//     // }

//     if (formData.password.trim() === "") {
//       newFormErrors.password = "Password is required";
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       newFormErrors.password = "Password must be at least 6 characters long";
//       isValid = false;
//     }

//     // if (formData.role.trim() === "") {
//     //   newFormErrors.role = "Role is required";
//     //   isValid = false;
//     // }

//     // if (formData.registration_date.trim() === "") {
//     //   newFormErrors.registration_date = "Registration date is required";
//     //   isValid = false;
//     // }
//     if (formData.confirm_password.trim() === "") {
//       newFormErrors.confirm_password = "Confirm Password is required";
//     }

//     const newFormData = new FormData();

//     newFormData.append("name", formData?.name);
//     newFormData.append("email", formData?.email);
//     newFormData.append("address", "address");
//     newFormData.append("phone", formData?.phone);
//     newFormData.append("password", formData?.password);
//     newFormData.append("registration_date", new Date().toISOString());
//     newFormData.append("role", "user");
//     newFormData.append("defaultPicture", formData?.image);

//     if (isValid) {
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`,
//           newFormData,

//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         // console.log(response);

//         if (response.status === 201) {
//           setOtpModalOpen(true);
//           setEmail(newFormData.get("email"));
//         } else {
//           console.error("Unexpected response:", response);
//         }
//       } catch (error) {
//         console.error("Error during signup:", error.response || error.message);
//       }
//     } else {
//       setFormErrors(newFormErrors);
//     }
//   };

//   return (
//     <section className="grid lg:grid-cols-2 min-h-screen">
//       <div className="relative hidden md:block order-2">
//         <Image
//           src="/img/signin.png"
//           width={600}
//           height={800}
//           alt="signin image"
//           className="w-full blur-lg h-full object-cover object-top"
//         />
//         <div className="absolute w-[445px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
//           <div className="text-center">
//             <h3 className="text-xl font-bold text-white">
//               Sign Up for batter experience
//             </h3>
//             <Link
//               href={"/signup"}
//               className="block border-2 active:scale-95 hover:border-[#2FB261] hover:text-[#2FB261] border-white text-white text-xl uppercase px-4 py-2 w-full rounded-[10px]  transition duration-300 mt-6"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="lg:mt-5 flex flex-col justify-center items-center ">
//         <div className="bg-white shadow-md rounded-lg p-8  ">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//             Create Your Account
//           </h2>
//           <span className="block text-[#9F9F9F] text-xl text-center mb-6">
//             Please enter your details
//           </span>
//           {/* <div className="mb-2">
//             <OAuth />
//           </div>
//           <div className=" mt-6 mb-8">
//             <Divider>OR</Divider>
//           </div> */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 placeholder="Enter your name"
//                 onChange={handleChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//               {formErrors.name && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//               )}
//             </div>

//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter phone number"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
//               )}
//             </div>

//             <div>
//               <div className="relative">
//                 <input
//                   type={showPass ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute opacity-50 right-3 top-1/2 -translate-y-1/2 "
//                 >
//                   {showPass || formData.password === "" ? (
//                     <FiEyeOff className="text-xl" />
//                   ) : (
//                     <FiEye className="text-xl" />
//                   )}
//                 </button>
//               </div>
//               {formErrors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.password}
//                 </p>
//               )}
//             </div>
//             <div>
//               <div className="relative">
//                 <input
//                   type={showPass ? "text" : "password"}
//                   name="confirm_password"
//                   value={formData.confirm_password}
//                   onChange={handleChange}
//                   placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute opacity-50 right-3 top-1/2 -translate-y-1/2 "
//                 >
//                   {showPass || formData.confirm_password === "" ? (
//                     <FiEyeOff className="text-xl" />
//                   ) : (
//                     <FiEye className="text-xl" />
//                   )}
//                 </button>
//               </div>
//               {formErrors.confirm_password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formErrors.confirm_password}
//                 </p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="file"
//                 name="image"
//                 id=""
//                 placeholder="Upload Your Image"
//                 className="p-1 border file:text-white file:bg-[#2FB261] file:border-0 file:p-2 file:rounded-s-md border-gray-300 w-full rounded-md"
//                 onChange={handleImageChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className=" active:scale-95 bg-[#2FB261] hover:bg-[#248b4c] text-white text-xl uppercase px-4 py-2 w-full rounded-[10px]  transition duration-300 mt-6"
//               // disabled={loading}
//             >
//               {/* {loading ? "Signing Up..." : "Sign Up"} */}Sign Up
//             </button>
//             {/* {error && <p className="text-red-500 text-center mt-4">{error}</p>} */}
//           </form>
//           <Link href="/signin">
//             <h6 className="text-center mt-3 font-bold text-xl">
//               Already have an account?{" "}
//               <span className=" text-[#2FB261]">Sign In</span>
//             </h6>
//           </Link>
//         </div>
//       </div>
//       <EmailOTPF otpModalOpen={otpModalOpen} email={email} />
//     </section>
//   );
// };

// export default Signup;
