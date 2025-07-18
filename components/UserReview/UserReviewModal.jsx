"use client";

// import { FetchReviewProductById } from "@/lib/FetchReviewProduct";
// import { useAuth } from "../AuthToken/AuthContext";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { MdVerifiedUser } from "react-icons/md";
import { BiSolidCommentEdit } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FetchReviewProductById,
  ReviewRatingAverage,
} from "@/lib/FetchReviewProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  addAverageRating,
  fetchProductDetailsStart,
  fetchProductDetailsSuccess,
  fetchReviewRatingSuccess,
} from "@/lib/features/product/productSlice";

export default function UserReviewModal({
  productId,
  userId,
  close,
  userName,
}) {
  const [value, setValue] = useState(0);
  const [click, setClick] = useState(false);
  const [review, setReview] = useState({});
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  /**find Review */
  useEffect(() => {
    dispatch(fetchProductDetailsStart());
    async function FetchPreviousReviewById() {
      try {
        const prevReview = await FetchReviewProductById(userId, productId);
        setReview(prevReview);
        // console.log(prevReview);
        dispatch(fetchReviewRatingSuccess());
      } catch (error) {
        console.error("Failed to fetch previous review:", error);
        dispatch(fetchReviewRatingSuccess());
      }
    }
    if (accessToken && userId) {
      FetchPreviousReviewById();
    }
  }, [userId, productId, accessToken, click]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("review", e.target.comment.value);
    formData.append("rating", e.target.star.value);
    formData.append("product", productId);
    formData.append("user", userId);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ReviewRating/addReviewRating`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("review", e.target.edit_comment.value);
    formData.append("rating", e.target.star_edit.value);
    formData.append("product", productId);
    formData.append("user", userId);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ReviewRating/update/${userId}/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        close();
        //revalidate server component
        const { revalidatePath } = await import("next/cache");
        revalidatePath(`/products/product-info/${productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!review ? (
        <div className="flex-flex-col">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="">
              <p className="text-lg font-semibold text-[rgba(0,128,0,0.5)]">
                Rate this product{" "}
              </p>
              <p className="text-xs">Tell others what you think</p>
            </div>
            <div className="flex justify-between items-center">
              <Rating
                name="star"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{
                  fontSize: "2.5rem",
                }}
              />
              <p className="text-[2rem] font-bold text-[rgba(0,128,0,0.5)]">
                {value}
              </p>
            </div>
            <p
              className="hover:text-[blue] text-[rgba(0,0,255,0.5)] cursor-pointer font-semibold  w-fit px-[0.5rem] rounded-lg hover:bg-[rgba(0,0,0,0.07)]"
              onClick={() => {
                setClick(true);
              }}
            >
              Write a review
            </p>

            {click && (
              <input
                type="text"
                name="comment"
                className="pl-2 border-2 border-[blue] py-[1rem]"
                placeholder="Describe your brief thought..."
              />
            )}

            {click && (
              <button
                className="border bg-[rgba(0,128,0,0.2)] w-fit px-3 rounded-xl py-[0.5rem] font-bold text-[rgba(0,128,0,0.5)] hover:bg-white"
                type="submit"
              >
                POST
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <span className="">
            <Rating
              name="read-only"
              defaultValue={3.5}
              precision={0.5}
              value={parseInt(review?.rating)}
              readOnly
              sx={{ fontSize: "1rem" }}
            />
            <div className="flex gap-1">
              <p className="text-xs font-semibold text-[rgba(0,128,0,0.7)]">
                {userName}
              </p>
              <span>
                <MdVerifiedUser color="rgba(0,128,0,0.5)" />
              </span>
              <p className="text-[0.65rem] font-extralight text-[blue]">
                Verified Customer
              </p>
            </div>
          </span>

          <div className="flex">
            <p className=" w-[70%]">{review?.review}!!!</p>
            <span className="flex justify-end w-[30%] items-center cursor-pointer">
              <BiSolidCommentEdit size={25} onClick={() => setClick(true)} />
            </span>
          </div>

          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            {click && (
              <div className="flex justify-between items-center">
                <Rating
                  name="star_edit"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  sx={{
                    fontSize: "2.5rem",
                  }}
                />
                <p className="text-[2rem] font-bold text-[rgba(0,128,0,0.5)]">
                  {value}
                </p>
              </div>
            )}

            {click && (
              <input
                defaultValue={review?.review}
                type="text"
                name="edit_comment"
                className="pl-2 border-2 border-[blue] py-[1rem]"
                placeholder="Describe your brief thought..."
              />
            )}

            {click && (
              <button
                className="border bg-[rgba(0,128,0,0.2)] w-fit px-3 rounded-xl py-[0.5rem] font-bold text-[rgba(0,128,0,0.5)] hover:bg-white"
                type="submit"
              >
                UPDATE
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
