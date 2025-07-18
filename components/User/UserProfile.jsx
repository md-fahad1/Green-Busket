"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { RiImageAddFill } from "react-icons/ri";
import imageCompression from "browser-image-compression";
import useScreenResize from "@/hooks/screenSize";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import {
  UpdateProfileFailure,
  UpdateProfileStart,
  UpdateProfileSuccess,
} from "@/lib/features/user/userSlice";

const UserProfile = ({ params }) => {
  const screenSize = useScreenResize();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(screenSize >= 1280); // Drawer for large screens
  const [profileImage, setProfileImage] = React.useState(currentUser.Image);
  const [editState, setEditState] = React.useState(false);
  const dispatch = useDispatch();

  // Update the drawer state based on screen size
  React.useEffect(() => {
    if (screenSize >= 1280) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [screenSize]);

  const handleImageUpload = async (event) => {
    dispatch(UpdateProfileStart());
    const file = event.target.files[0];

    if (file) {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const renamedFile = new File([compressedFile], file.name, {
          type: file.type,
        });
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(renamedFile);
        const formData = new FormData();
        formData.append("ProfilePicture", renamedFile);
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/ChangeProfilePicture/${currentUser.Id}`,
          formData
        );

        if (response.status === 200) {
          dispatch(UpdateProfileSuccess(response.data));
          Swal.fire({
            icon: "success",
            title: "Image Updated!",
            text: "Profile picture uploaded successfully.",
            confirmButtonColor: "#3085d6",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch(UpdateProfileFailure(error.message));
        Swal.fire({
          icon: "error",
          title: "Upload Failed!",
          text:
            error?.response?.data?.message ||
            error.message ||
            "An error occurred.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  React.useEffect(() => {}, [profileImage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UpdateProfileStart());
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("address", e.target.address.value);
    formData.append("phone", e.target.phone.value);
    console.log("data", formData);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile/edit/${currentUser.Id}`,
        formData, // Sending FormData object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(UpdateProfileSuccess(response.data));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully.",
          confirmButtonColor: "#3085d6",
          timer: 2000,
          timerProgressBar: true,
        });
      }
      setEditState(false);
    } catch (error) {
      dispatch(UpdateProfileFailure());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <Box className="w-full flex flex-col items-center justify-center mt-1 px-4">
      <CssBaseline />
      <p className="text-2xl font-semibold mb-1">Personal Information</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-3  py-2 w-full max-w-3xl"
      >
        {/* Profile image */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 bg-gray-200">
            <Image
              src={profileImage}
              width={128}
              height={128}
              alt="User Profile"
              className="object-cover h-full w-full"
            />
          </div>
          <input
            id="imageChange"
            type="file"
            onChange={handleImageUpload}
            className="hidden"
          />
          {editState && (
            <button
              type="button"
              onClick={() => document.getElementById("imageChange").click()}
              className="mt-3 bg-dash-primary hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm"
            >
              <RiImageAddFill size={18} className="inline-block mr-1" />
              Change Picture
            </button>
          )}
        </div>
        {/* Info Fields */}
        {[
          { label: "Name", name: "name", value: currentUser.name },
          {
            label: "Email",
            name: "email",
            value: currentUser.email,
            disabled: true,
          },
          { label: "Address", name: "address", value: currentUser.address },
          { label: "Phone", name: "phone", value: currentUser.phone },
          // {
          //   label: "Role",
          //   name: "role",
          //   value: currentUser.role,
          //   disabled: true,
          // },
          {
            label: "Joined",
            name: "registration_date",
            value: new Date(currentUser.registration_date)
              .toISOString()
              .split("T")[0],
            disabled: true,
          },
        ].map((field, i) => (
          <div key={i} className="flex items-center gap-1 mb-2">
            <label className="w-[30%] text-gray-700 font-medium">
              {field.label}
            </label>
            {editState && !field.disabled ? (
              <input
                type="text"
                name={field.name}
                defaultValue={field.value}
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p
                className={`w-[70%] py-2 px-4 ${
                  field.disabled ? "bg-gray-100 text-gray-500" : "text-gray-800"
                }`}
              >
                {field.value}
              </p>
            )}
          </div>
        ))}
        {/* Submit Button */}
        {editState && (
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="mt-4 bg-dash-primary px-4 py-2 rounded-md text-white"
            >
              Update Info
            </button>
          </div>
        )}
        {!editState && (
          <div className="flex justify-center mt-3">
            <button
              className="mt-4 bg-dash-primary  px-4 py-2 rounded-md text-white"
              onClick={() => setEditState(true)}
            >
              Edit Info
            </button>
          </div>
        )}
      </form>
      {/* Edit Button */}
    </Box>
  );
};

export default UserProfile;

// "use client";
// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import { RiImageAddFill } from "react-icons/ri";
// import imageCompression from "browser-image-compression";
// import useScreenResize from "@/hooks/screenSize";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import axios from "axios";
// import {
//   UpdateProfileFailure,
//   UpdateProfileStart,
//   UpdateProfileSuccess,
// } from "@/lib/features/user/userSlice";

// const UserProfile = ({ params }) => {
//   const screenSize = useScreenResize();
//   const { currentUser } = useSelector((state) => state.user);
//   const [open, setOpen] = React.useState(screenSize >= 1280); // Drawer for large screens
//   const [profileImage, setProfileImage] = React.useState(currentUser.Image);
//   const [editState, setEditState] = React.useState(false);
//   const dispatch = useDispatch();

//   // Update the drawer state based on screen size
//   React.useEffect(() => {
//     if (screenSize >= 1280) {
//       setOpen(true);
//     } else {
//       setOpen(false);
//     }
//   }, [screenSize]);

//   const handleImageUpload = async (event) => {
//     dispatch(UpdateProfileStart());
//     const file = event.target.files[0];

//     if (file) {
//       const options = {
//         maxSizeMB: 0.1,
//         maxWidthOrHeight: 1024,
//         useWebWorker: true,
//       };
//       try {
//         const compressedFile = await imageCompression(file, options);
//         const renamedFile = new File([compressedFile], file.name, {
//           type: file.type,
//         });
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setProfileImage(e.target.result);
//         };
//         reader.readAsDataURL(renamedFile);
//         const formData = new FormData();
//         formData.append("ProfilePicture", renamedFile);
//         const response = await axios.put(
//           `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/ChangeProfilePicture/${currentUser.Id}`,
//           formData
//         );

//         if (response.status === 200) {
//           dispatch(UpdateProfileSuccess(response.data));
//           Swal.fire({
//             icon: "success",
//             title: "Image Updated!",
//             text: "Profile picture uploaded successfully.",
//             confirmButtonColor: "#3085d6",
//             timer: 2000,
//             timerProgressBar: true,
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         dispatch(UpdateProfileFailure(error.message));
//         Swal.fire({
//           icon: "error",
//           title: "Upload Failed!",
//           text:
//             error?.response?.data?.message ||
//             error.message ||
//             "An error occurred.",
//           confirmButtonColor: "#d33",
//         });
//       }
//     }
//   };

//   React.useEffect(() => {}, [profileImage]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(UpdateProfileStart());
//     const formData = new FormData();
//     formData.append("name", e.target.name.value);
//     formData.append("address", e.target.address.value);
//     formData.append("phone", e.target.phone.value);
//     console.log("data", formData);

//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile/edit/${currentUser.Id}`,
//         formData, // Sending FormData object
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(UpdateProfileSuccess(response.data));
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Profile updated successfully.",
//           confirmButtonColor: "#3085d6",
//           timer: 2000,
//           timerProgressBar: true,
//         });
//       }
//       setEditState(false);
//     } catch (error) {
//       dispatch(UpdateProfileFailure());
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error?.response?.data?.message || "Something went wrong!",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", position: "relative" }}>
//       <CssBaseline />

//       <Box component="main" sx={{}}>
//         {/* Profile Info Section */}
//         <p className="text-xl font-semibold ">Personal Information</p>

//         <form
//           className="w-full h-full flex lg:flex-row flex-col gap-8 items-center justify-center"
//           onSubmit={handleSubmit}
//         >
//           {/* Profile Image Section */}
//           <div className="lg:w-[30%] flex flex-col items-center gap-4">
//             <div className="max-h-[10rem] lg:max-h-[12rem] min-h-[8rem] lg:min-h-[10rem] max-w-[10rem] lg:max-w-[12rem] min-w-[8rem] lg:min-w-[10rem] border-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
//               <Image
//                 src={profileImage}
//                 height={170}
//                 width={170}
//                 className="object-cover"
//                 alt="User picture"
//               />
//             </div>

//             {/* File Upload */}
//             <input
//               className="hidden"
//               id="imageChange"
//               type="file"
//               onChange={handleImageUpload}
//             />
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 document.getElementById("imageChange").click();
//               }}
//               className="mt-2 bg-dash-primary hover:bg-blue-600 text-white rounded-full p-2"
//             >
//               <RiImageAddFill size={20} />
//             </button>
//           </div>

//           {/* Form Fields Section */}
//           <div className="lg:w-[70%] w-full lg:px-10 px-4 flex flex-col gap-6">
//             {/* Name Field */}
//             <div className="flex w-full  gap-4">
//               <label
//                 htmlFor="name"
//                 className="w-[30%] text-lg font-medium text-gray-700"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 defaultValue={currentUser.name}
//               />
//             </div>

//             {/* Email Field */}
//             <div className="flex w-full gap-4">
//               <label
//                 htmlFor="email"
//                 className="w-[30%] text-lg font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="text"
//                 className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
//                 defaultValue={currentUser.email}
//                 disabled
//               />
//             </div>

//             {/* Address Field */}
//             <div className="flex w-full gap-4">
//               <label
//                 htmlFor="address"
//                 className="w-[30%] text-lg font-medium text-gray-700"
//               >
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 defaultValue={currentUser.address}
//               />
//             </div>

//             {/* Phone Field */}
//             <div className="flex w-full gap-4">
//               <label
//                 htmlFor="phone"
//                 className="w-[30%] text-lg font-medium text-gray-700"
//               >
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 defaultValue={currentUser.phone}
//               />
//             </div>

//             {/* Role Field */}
//             <div className="flex w-full gap-4">
//               <label
//                 htmlFor="role"
//                 className="w-[30%] text-lg font-medium text-gray-700"
//               >
//                 Role
//               </label>
//               <input
//                 type="text"
//                 className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
//                 defaultValue={currentUser.role}
//                 disabled
//               />
//             </div>

//             {/* Joined Field */}
//             <div className="flex w-full gap-4">
//               <label
//                 htmlFor="joined"
//                 className="w-[30%] text-lg font-medium text-gray-700"
//               >
//                 Joined
//               </label>
//               <input
//                 type="text"
//                 className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
//                 defaultValue={
//                   new Date(currentUser.registration_date)
//                     .toISOString()
//                     .split("T")[0]
//                 } // Shows YYYY-MM-DD
//                 disabled
//               />
//             </div>

//             {/* Update Button */}
//             {editState && (
//               <button
//                 className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
//                 type="submit"
//               >
//                 Update
//               </button>
//             )}
//           </div>
//         </form>
//       </Box>

//       {!editState && (
//         <button
//           className="absolute top-10 right-10 bg-dash-primary px-2 py-1 rounded-md text-white"
//           onClick={() => setEditState(true)}
//         >
//           Edit Info
//         </button>
//       )}
//     </Box>
//   );
// };

// export default UserProfile;
