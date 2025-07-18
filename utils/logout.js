import Cookies from "js-cookie";

const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.href = "/signin";
};

export default logout;
