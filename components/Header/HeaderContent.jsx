"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faSignOutAlt,
  faUser,
  faXmark,
  faHeart,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "@/lib/features/user/userSlice";
import Cookies from "js-cookie";
import logout from "@/utils/logout";
import AddToCartPart from "./addToCartPart";

const HeaderContent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const profileImage =
    currentUser?.Image?.startsWith("https:/") &&
    !currentUser.Image.startsWith("https://")
      ? currentUser.Image.replace("https:/", "https://")
      : currentUser?.Image;

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) dispatch(LogOutUser());
    setAccessToken(token);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`)
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
        );
        setCategories(res.data.slice(0, 8));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    getData();
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(LogOutUser());
  };

  return (
    <section className="relative">
      {/* Mobile Nav */}
      <div
        className={`lg:hidden ${
          navBarOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 absolute top-full`}
      >
        <ul className="bg-white w-full">
          {categories.map((category, index) => (
            <li key={index} className="border-b">
              <Link
                href={`/Category/${category.Id}`}
                className="block px-4 py-3 text-gray-800 hover:bg-gray-200"
                onClick={() => setNavBarOpen(false)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white  w-full h-[40px] md:h-14 grid place-items-center px-4 md:px-16 shadow-lg">
        <nav className="container flex items-center justify-between h-full gap-4 lg:gap-8">
          {/* Left: Logo + Home + Category */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNavBarOpen(!navBarOpen)}
              className="lg:hidden text-2xl"
            >
              {navBarOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>

            <Link
              href="/"
              className="text-sm md:text-xl text-green-700 font-bold"
            >
              Green Busket
            </Link>

            <Link
              href="/"
              className="hidden md:block text-sm font-bold hover:text-green-200"
            >
              Home
            </Link>

            <div className="relative hidden md:block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-sm font-bold hover:text-green-200"
              >
                Categories
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`ml-1 text-xs transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showDropdown && (
                <ul className="absolute top-full left-0 mt-1 bg-white text-black w-40 shadow-lg rounded z-50">
                  {categories.map((category) => (
                    <li key={category.Id}>
                      <Link
                        href={`/Category/${category.Id}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Middle: Search bar */}
          <div
            className="hidden lg:block grow max-w-md relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <form className="flex items-center h-10 text-black bg-slate-100 rounded overflow-hidden">
              <input
                type="search"
                placeholder="Search for products"
                className="h-full px-4 bg-slate-100 border-none outline-none grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="px-3 text-primary">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            {isHovered &&
              searchQuery.length > 0 &&
              filteredProducts.length > 0 && (
                <div className="absolute z-40 top-full left-0 w-full bg-white text-black shadow-lg max-h-72 overflow-y-auto">
                  <ul>
                    {filteredProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/product-info/${product.Id}`}
                          className="block p-2 hover:bg-gray-200"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Right: Wishlist, Cart, Account */}
          <div className="flex items-center gap-8">
            <Link href="/wishlist" title="Wishlist">
              <FontAwesomeIcon
                icon={faHeart}
                className="w-5 h-5 text-gray-500"
              />
            </Link>

            <AddToCartPart />

            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={
                    currentUser.role === "admin"
                      ? "/dashboard"
                      : "/userdashboard"
                  }
                >
                  <Image
                    src={profileImage}
                    alt="profile"
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white text-xs hidden lg:block"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="mr-1 text-gray-600"
                  />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="flex items-center gap-1 text-sm text-black"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-4 h-4 text-gray-500"
                />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default HeaderContent;
