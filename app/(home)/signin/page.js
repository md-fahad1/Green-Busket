"use client";
import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from "@/lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import { z } from "zod";
import api from "@/utils/axios";
import { signIn } from "next-auth/react";

const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const result = SignInSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFormErrors({
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      });
      return;
    }

    try {
      dispatch(SignInStart());

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          username: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data;
      const userRole = data.sub?.role || data.role;

      if (data.success === false) {
        dispatch(SignInFailure(data.message));
        if (data.message?.toLowerCase().includes("invalid")) {
          setFormErrors({ email: "", password: "Invalid email or password" });
        } else {
          setGeneralError(data.message || "An unexpected error occurred.");
        }
        return;
      }

      Cookies.set("userRole", userRole, {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("accessToken", data.accessToken, {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      dispatch(SignInSuccess(data));
      router.push(userRole === "admin" ? "/dashboard" : "/userdashboard");
    } catch (error) {
      dispatch(SignInFailure(error.message));
      if (error.response?.status === 401) {
        setFormErrors({ email: "", password: "Invalid email or password" });
      } else {
        setGeneralError("There was a server error. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/userdashboard" });
  };

  return (
    <section className="grid lg:grid-cols-2 min-h-screen bg-[#F6FFF6]">
      {/* Left: Image & Branding */}
      <div className="relative hidden lg:flex items-center justify-center bg-green-100">
        <Image
          src="/img/green/vegetable1.jpg"
          alt="Groceries"
          fill
          className="object-cover blur-sm"
        />
        <div className="absolute z-10 bg-black/40 w-full h-full" />
        <div className="absolute z-20 text-center text-white px-8">
          <h2 className="text-4xl font-bold mb-4">Fresh Grocery Delivered</h2>
          <p className="text-lg mb-6">
            Join now and start shopping the freshest produce in town.
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 py-2 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-100 transition"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center py-10 px-6 sm:px-12">
        <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-2">
            Sign In
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Welcome back! Please login to continue
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="text"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  formErrors.email
                    ? "border-red-500 ring-red-100"
                    : "border-gray-300 focus:ring-green-100"
                }`}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  formErrors.password
                    ? "border-red-500 ring-red-100"
                    : "border-gray-300 focus:ring-green-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-3 text-gray-400"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
              {formErrors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {formErrors.password}
                </p>
              )}
              {generalError && (
                <p className="text-sm text-red-500 mt-1">{generalError}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center mb-4 text-sm">
              <Checkbox
                {...label}
                defaultChecked
                sx={{
                  color: "#2FB261",
                  "&.Mui-checked": { color: "#2FB261" },
                }}
              />
              <Link href="/forget_password" className="text-green-600">
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition active:scale-95"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative text-center">
            <Divider className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0" />
            <span className="relative z-10 bg-white px-2 text-gray-400 text-sm">
              OR
            </span>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-green-600 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

// "use client";
// import React, { useState } from "react";
// import { FiEyeOff, FiEye } from "react-icons/fi";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   SignInFailure,
//   SignInStart,
//   SignInSuccess,
// } from "@/lib/features/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import Checkbox from "@mui/material/Checkbox";
// import Divider from "@mui/material/Divider";
// import Image from "next/image";
// import { z } from "zod";
// import api from "@/utils/axios";
// import { signIn } from "next-auth/react";
// // ✅ Zod Schema
// const SignInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const SignIn = () => {
//   const [showPass, setShowPass] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const [generalError, setGeneralError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setFormErrors({
//       ...formErrors,
//       [e.target.name]: "",
//     });
//     setGeneralError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setGeneralError("");

//     // ✅ Zod validation
//     const result = SignInSchema.safeParse(formData);

//     if (!result.success) {
//       const errors = result.error.flatten().fieldErrors;
//       setFormErrors({
//         email: errors.email?.[0] || "",
//         password: errors.password?.[0] || "",
//       });
//       return;
//     }

//     try {
//       dispatch(SignInStart());

//       const response = await api.post(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
//         {
//           username: formData.email,
//           password: formData.password,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       const data = response.data;
//       const userRole = data.sub?.role || data.role;
//       console.log("Validation data ", userRole);

//       if (data.success === false) {
//         dispatch(SignInFailure(data.message));

//         if (data.message?.toLowerCase().includes("invalid")) {
//           setFormErrors({
//             email: "",
//             password: "Invalid email or password",
//           });
//         } else {
//           setGeneralError(data.message || "An unexpected error occurred.");
//         }
//         return;
//       }
//       Cookies.set("userRole", userRole, {
//         expires: 1 / 24,
//         secure: true,
//         sameSite: "Strict",
//       });
//       // Successful login
//       Cookies.set("accessToken", data.accessToken, {
//         expires: 1 / 24, // 1 hour
//         secure: true,
//         sameSite: "Strict",
//         path: "/",
//       });
//       // Cookies.set("refreshToken", data.refreshToken, { expires: 1 / 24 });

//       dispatch(SignInSuccess(data));

//       if (data.role === "admin") {
//         router.push("/dashboard");
//       } else {
//         router.push("/userdashboard");
//       }
//     } catch (error) {
//       dispatch(SignInFailure(error.message));

//       if (error.response && error.response.status === 401) {
//         setFormErrors({
//           email: "",
//           password: "Invalid email or password",
//         });
//       } else {
//         setGeneralError("There was a server error. Please try again.");
//       }
//     }
//   };
//   const handleGoogleLogin = () => {
//     signIn("google", {
//       callbackUrl: "/userdashboard", // or /dashboard if admin check is done in backend
//     });
//   };
//   return (
//     <section className="grid lg:grid-cols-2 max-h-screen">
//       {/* Left Image Section */}
//       <div className="relative hidden md:block">
//         <Image
//           src="/img/green/vegetable1.jpg"
//           width={600}
//           height={800}
//           alt="signin image"
//           className="w-full blur-lg max-h-screen object-cover object-top"
//         />
//         <div className="absolute md:w-[445px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
//           <div className="text-center">
//             <h3 className="text-xl font-bold text-white">
//               Sign Up for better experience
//             </h3>
//             <Link
//               href="/signup"
//               className="block border-2 active:scale-95 hover:border-[#2FB261] hover:text-[#2FB261] border-white text-white text-xl uppercase px-4 py-2 w-full rounded-[10px] mt-6 transition duration-300"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Right Form Section */}
//       <div className="flex justify-center items-start mt-5">
//         <div className="bg-white p-8 rounded shadow-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
//           <span className="block text-[#9F9F9F] text-xl text-center mb-6">
//             Please enter your details
//           </span>

//           <div className="border-b mt-6 mb-8 relative border-black">
//             <Divider className="-mt-3 bg-white absolute left-1/2 -translate-x-1/2">
//               OR
//             </Divider>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Email Field */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className={`w-full p-3 border rounded-md focus:outline-none ${
//                   formErrors.email ? "border-red-500" : "border-[#E8E8F2]"
//                 }`}
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <div className="relative">
//                 <input
//                   type={showPass ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full text-base p-3 placeholder-shown:text-sm border rounded-md focus:outline-none ${
//                     formErrors.password ? "border-red-500" : "border-[#E8E8F2]"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute opacity-50 right-3 top-1/2 -translate-y-1/2"
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
//               {generalError && (
//                 <p className="text-red-500 text-sm mt-1">{generalError}</p>
//               )}
//             </div>

//             {/* Remember & Forgot */}
//             <div className="flex justify-between items-center mt-2">
//               <Checkbox
//                 {...label}
//                 defaultChecked
//                 sx={{
//                   color: "#2FB261",
//                   "&.Mui-checked": { color: "#2FB261" },
//                 }}
//               />
//               <span>
//                 <small>
//                   <Link href="/forget_password">Forgot Password?</Link>
//                 </small>
//               </span>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="active:scale-95 bg-[#2FB261] hover:bg-[#248b4c] text-white text-xl uppercase px-4 py-2 w-full rounded-[10px] mt-6 transition duration-300"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           <Link href="/signup">
//             <h6 className="text-center mt-3 font-bold text-xl">
//               Don't have an account?{" "}
//               <span className="text-[#2FB261]">Sign Up</span>
//             </h6>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;

// "use client";
// import React, { useState } from "react";
// import { FiEyeOff, FiEye } from "react-icons/fi";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   SignInFailure,
//   SignInStart,
//   SignInSuccess,
// } from "@/lib/features/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import Checkbox from "@mui/material/Checkbox";
// import Divider from "@mui/material/Divider";
// import Image from "next/image";
// import { z } from "zod";
// import api from "@/utils/axios";
// import { signIn } from "next-auth/react";
// // ✅ Zod Schema
// const SignInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email format"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const SignIn = () => {
//   const [showPass, setShowPass] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { loading } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const [generalError, setGeneralError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setFormErrors({
//       ...formErrors,
//       [e.target.name]: "",
//     });
//     setGeneralError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setGeneralError("");

//     // ✅ Zod validation
//     const result = SignInSchema.safeParse(formData);

//     if (!result.success) {
//       const errors = result.error.flatten().fieldErrors;
//       setFormErrors({
//         email: errors.email?.[0] || "",
//         password: errors.password?.[0] || "",
//       });
//       return;
//     }

//     try {
//       dispatch(SignInStart());

//       const response = await api.post(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
//         {
//           username: formData.email,
//           password: formData.password,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );

//       const data = response.data;
//       const userRole = data.sub?.role || data.role;
//       console.log("Validation data ", userRole);

//       if (data.success === false) {
//         dispatch(SignInFailure(data.message));

//         if (data.message?.toLowerCase().includes("invalid")) {
//           setFormErrors({
//             email: "",
//             password: "Invalid email or password",
//           });
//         } else {
//           setGeneralError(data.message || "An unexpected error occurred.");
//         }
//         return;
//       }
//       Cookies.set("userRole", userRole, {
//         expires: 1 / 24,
//         secure: true,
//         sameSite: "Strict",
//       });
//       // Successful login
//       Cookies.set("accessToken", data.accessToken, {
//         expires: 1 / 24, // 1 hour
//         secure: true,
//         sameSite: "Strict",
//         path: "/",
//       });
//       // Cookies.set("refreshToken", data.refreshToken, { expires: 1 / 24 });

//       dispatch(SignInSuccess(data));

//       if (data.role === "admin") {
//         router.push("/dashboard");
//       } else {
//         router.push("/userdashboard");
//       }
//     } catch (error) {
//       dispatch(SignInFailure(error.message));

//       if (error.response && error.response.status === 401) {
//         setFormErrors({
//           email: "",
//           password: "Invalid email or password",
//         });
//       } else {
//         setGeneralError("There was a server error. Please try again.");
//       }
//     }
//   };
//   const handleGoogleLogin = () => {
//     signIn("google", {
//       callbackUrl: "/userdashboard", // or /dashboard if admin check is done in backend
//     });
//   };

//   return (
//     <section className="grid lg:grid-cols-2 max-h-screen">
//       {/* Left Image Section */}
//       <div className="relative hidden md:block">
//         <Image
//           src="/img/signin.png"
//           width={600}
//           height={800}
//           alt="signin image"
//           className="w-full blur-lg max-h-screen object-cover object-top"
//         />
//         <div className="absolute md:w-[445px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
//           <div className="text-center">
//             <h3 className="text-xl font-bold text-white">
//               Sign Up for better experience
//             </h3>
//             <Link
//               href="/signup"
//               className="block border-2 active:scale-95 hover:border-[#2FB261] hover:text-[#2FB261] border-white text-white text-xl uppercase px-4 py-2 w-full rounded-[10px] mt-6 transition duration-300"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Right Form Section */}
//       <div className="flex justify-center items-start mt-5">
//         <div className="bg-white p-8 rounded shadow-md">
//           <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
//           <span className="block text-[#9F9F9F] text-xl text-center mb-6">
//             Please enter your details
//           </span>
//           {/* 🟢 Google Login Button */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md mb-4 transition"
//           >
//             Sign in with Google
//           </button>
//           <div className="border-b mt-6 mb-8 relative border-black">
//             <Divider className="-mt-3 bg-white absolute left-1/2 -translate-x-1/2">
//               OR
//             </Divider>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Email Field */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className={`w-full p-3 border rounded-md focus:outline-none ${
//                   formErrors.email ? "border-red-500" : "border-[#E8E8F2]"
//                 }`}
//               />
//               {formErrors.email && (
//                 <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <div className="relative">
//                 <input
//                   type={showPass ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full text-base p-3 placeholder-shown:text-sm border rounded-md focus:outline-none ${
//                     formErrors.password ? "border-red-500" : "border-[#E8E8F2]"
//                   }`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute opacity-50 right-3 top-1/2 -translate-y-1/2"
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
//               {generalError && (
//                 <p className="text-red-500 text-sm mt-1">{generalError}</p>
//               )}
//             </div>

//             {/* Remember & Forgot */}
//             <div className="flex justify-between items-center mt-2">
//               <Checkbox
//                 {...label}
//                 defaultChecked
//                 sx={{
//                   color: "#2FB261",
//                   "&.Mui-checked": { color: "#2FB261" },
//                 }}
//               />
//               <span>
//                 <small>
//                   <Link href="/forget_password">Forgot Password?</Link>
//                 </small>
//               </span>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="active:scale-95 bg-[#2FB261] hover:bg-[#248b4c] text-white text-xl uppercase px-4 py-2 w-full rounded-[10px] mt-6 transition duration-300"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           <Link href="/signup">
//             <h6 className="text-center mt-3 font-bold text-xl">
//               Don't have an account?{" "}
//               <span className="text-[#2FB261]">Sign Up</span>
//             </h6>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;
