"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const HeaderContact = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const languages = ["EN", "বাংলা", "हिंदी"];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <div className="w-full bg-[#a9ebd8] text-black text-xs py-1 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-medium">Dhaka, Bangladesh</div>
        <div className="flex items-center gap-6 relative">
          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="focus:outline-none text-gray-800 dark:text-white"
            aria-label="Toggle Theme"
          >
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className="w-4 h-4"
            />
          </button>

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 focus:outline-none"
            >
              <span>{language}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="w-3 h-3 mt-[2px]"
              />
            </button>
            {showDropdown && (
              <ul className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-50 text-black dark:bg-gray-800 dark:text-white">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContact;
