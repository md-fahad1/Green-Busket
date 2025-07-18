import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoon } from "react-icons/pi";

const DarkMode = () => {
  const [isDarkMood, setDarkMood] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );
  const element = document.documentElement;
  const local = localStorage.getItem("theme");

  const localDark = () => {
    if (local === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  };
  localDark();

  useEffect(() => {
    // console.log(isDarkMood);
    if (isDarkMood) {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMood]);

  return (
    <div>
      {isDarkMood ? (
        <IconButton
          size="medium"
          aria-label="show 17 new notifications"
          // color="inherit"
          onClick={() => setDarkMood(!isDarkMood)}
          className="bg-[#F7F8F9] dark:hover:bg-secondary"
        >
          <PiMoon className="dark:text-gray-100" />
        </IconButton>
      ) : (
        <IconButton
          size="medium"
          aria-label="show 17 new notifications"
          // color="inherit"
          onClick={() => setDarkMood(!isDarkMood)}
          className="bg-[#F7F8F9]"
        >
          <IoSunnyOutline className="text-secondary" />
        </IconButton>
      )}
    </div>
  );
};

export default DarkMode;
