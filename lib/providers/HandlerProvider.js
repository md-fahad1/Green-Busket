"use client";
import { createContext, useState } from "react";
import {
  getLocalStorageValue,
  removeLocalStorageValue,
  setLocalStorageValue,
} from "../wishlistLocalStorage";

export const HandlerContext = createContext();

const HandlerProvider = ({ children }) => {
  const [isToggleOpen, setToggleOpen] = useState(false);
  const [wishProducts, setWishProducts] = useState(() => {
    return getLocalStorageValue();
  });

  const handleDrawerOpen = (value) => {
    setToggleOpen(value);
  };

  //wishlist functionality
  const handleAddWishlist = (product) => {
    const wishProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      stock: product.stock,
      price: product.price,
    };

    setLocalStorageValue(wishProduct);
    const remainingProduct = getLocalStorageValue();
    setWishProducts(remainingProduct);
  };

  const handleRemoveWishListProduct = (id) => {
    removeLocalStorageValue(id);
    const remainingProduct = getLocalStorageValue();
    setWishProducts(remainingProduct);
  };

  const value = {
    isToggleOpen,
    handleDrawerOpen,
    handleRemoveWishListProduct,
    wishProducts,
    setWishProducts,
    wishListItems: wishProducts.length,
    handleAddWishlist,
  };
  return (
    <HandlerContext.Provider value={value}>{children}</HandlerContext.Provider>
  );
};

export default HandlerProvider;
