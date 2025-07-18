"use client";
import React, { useEffect, useState } from "react";
import UserReviewModal from "./UserReviewModal";
import { Box, Modal, Rating } from "@mui/material";
import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import { FetchAllReview } from "@/lib/FetchReviewProduct";
import Swal from "sweetalert2";

import { usePathname, useRouter } from "next/navigation";

const UserReview = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [allReview, setAllReview] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function FetchReview() {
      try {
        const data = await FetchAllReview(productId);
        if (data) {
          setAllReview(data);
          // console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchReview();
  }, [open, productId]);

  const handleOpen = () => {
    if (!currentUser) {
      router.push(`/signin?redirect=${pathname}`);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please login First",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <button
          onClick={handleOpen}
          className="border-[rgba(0,0,255,0.5)] border-2 px-4 py-2 text-[blue] rounded-md font-semibold"
        >
          Add Review & Feedback
        </button>
        <Modal open={open} onClose={handleClose}>
          <Box className="absolute top-1/2 lg:left-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:w-[60%] bg-white border-2 shadow-lg p-4">
            <div className="relative">
              <UserReviewModal
                productId={productId}
                userName={currentUser?.name}
                userId={currentUser?.Id}
                close={handleClose}
              />
              <button
                onClick={handleClose}
                className="bg-gray-50 shadow  rounded-full w-[25px] h-[25px] font-bold absolute !right-0 !top-0 bg-[rgba(255,255,255,0.3)]"
              >
                X
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      {/* Reviews */}
      <div>
        {allReview &&
          allReview.map((item, idx) => (
            <div className="flex flex-col gap-2" key={idx}>
              <span className="">
                <Rating
                  name="read-only"
                  // defaultValue={3.5}
                  // precision={0.5}
                  value={parseInt(item?.rating)}
                  readOnly
                  sx={{ fontSize: "1rem" }}
                />
                <div className="flex gap-1">
                  <p className="text-xs font-semibold text-[rgba(0,128,0,0.7)]">
                    {item?.user.name}
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
                <p className=" w-[70%]">{item?.review}!!!</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserReview;
