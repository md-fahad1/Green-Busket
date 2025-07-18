"use client";
import { useContext, useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { IoHeartDislike, IoHeartOutline } from "react-icons/io5";
import { HandlerContext } from "@/lib/providers/HandlerProvider";
import { useDispatch } from "react-redux";
import ProductAttributes from "./ProductAttributes";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Swal from "sweetalert2";

const ProductActionButton = ({ product }) => {
  const { handleAddWishlist, wishProducts, handleRemoveWishListProduct } =
    useContext(HandlerContext);
  const [inputAttribute, setInputAttribute] = useState({});
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product.quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Stock Out",
        text: "Sorry, this product is currently out of stock!",
      });
      return;
    }

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.id,
      price: product.price,
      count: 1,
      totalPrice: product.price,
      attributes: inputAttribute,
    };

    dispatch(addToCart(cartInfo));
  };

  const addedWishProduct = wishProducts.find((pd) => pd.id === product.id);

  return (
    <div>
      {/* Product Attributes */}
      <ProductAttributes
        inputAttribute={inputAttribute}
        setInputAttribute={setInputAttribute}
      />

      <div className="flex flex-wrap gap-2.5 mt-3">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 bg-[#192a56] px-4 py-2 text-white rounded-full active:scale-95 duration-200 font-medium hover:bg-[#273c75]"
        >
          <BsCartDash className="text-xl" /> <span>Add To Cart</span>
        </button>

        {/* Wishlist Button */}
        {/* {addedWishProduct ? (
          <button
            onClick={() => handleRemoveWishListProduct(product)}
            className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <IoHeartDislike className="text-xl" /> Remove Wishlist
          </button>
        ) : (
          <button
            onClick={() => handleAddWishlist(product)}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <IoHeartOutline className="text-xl" /> Add to Wishlist
          </button>
        )} */}
      </div>
    </div>
  );
};

export default ProductActionButton;
