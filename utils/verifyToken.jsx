import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const verifyToken = () => {
  const accessToken = Cookies.get("accessToken");
  const userRole = Cookies.get("userRole");

 
  if (!accessToken || !userRole) return null;

  try {
    // const decoded = jwt_decode(accessToken);
    return {
      accessToken,
      userRole,
      // decoded, // Optional: contains full payload like sub, email, etc.
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export default verifyToken;

// import axios from "axios";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";

// const verifyToken = async () => {
//   let accessToken = Cookies.get("accessToken");
//   let refreshToken = Cookies.get("refreshToken");

//   if (accessToken) {
//     try {
//       const decodedToken = jwtDecode(accessToken);
//       const currentTime = Math.floor(Date.now() / 1000);
//       const expirationTime = decodedToken.exp;
//       const timeLeft = expirationTime - currentTime;

//       console.log("Access Token expires in:", timeLeft, "seconds");

//       // If token has 1 minute (60 seconds) left, refresh it
//       if (timeLeft <= 60 && refreshToken) {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Auth/RefreshToken`,
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${accessToken}`, // Passing old access token
//             },
//           }
//         );

//         const newAccessToken = response.data.access;
//         Cookies.set("accessToken", newAccessToken, { expires: 1 / 24 }); // 1 hour expiry

//         return newAccessToken;
//       }

//       return accessToken;
//     } catch (error) {
//       console.error("Error verifying token:", error);
//       Cookies.remove("accessToken");
//       Cookies.remove("refreshToken");
//       return null;
//     }
//   }

//   return null;
// };

// export default verifyToken;
