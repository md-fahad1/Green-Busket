"use client";

import { Button, FormControl, OutlinedInput } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Coupon = ({ setCouponData }) => {
  const [isCouponOpen, setCouponOpen] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [error, setError] = useState("");

  const handleCouponCheck = async () => {
    const newFormData = new FormData();
    newFormData.append("code", couponValue);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Coupon/check`,
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
        }
      );
      if (res.status !== 200) {
        setCouponData(true);
      }
    } catch (error) {
      setCouponData(true);
      console.log(error);
      setError("Wrong Coupon Code");
    }
  };

  return (
    <div className="px-5 py-2">
      <button
        className="flex items-center mb-2 gap-2"
        onClick={() => setCouponOpen(true)}
      >
        <span className="font-semibold text-lg">Apply Coupon Code</span>
        <IoIosArrowDown className={`${isCouponOpen && "hidden"} text-xl`} />
      </button>
      <div className={`${isCouponOpen || "hidden"}`}>
        <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
          <div className="relative">
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              fullWidth
              value={couponValue.toUpperCase()}
              onChange={(e) => setCouponValue(e.target.value)}
            />
            <Button
              onClick={handleCouponCheck}
              type="button"
              variant="contained"
              className="!absolute !right-0 h-full !rounded-s-none"
            >
              Apply
            </Button>
          </div>
        </FormControl>
      </div>
      {error && <div className="text-red-500 font-medium">{error}</div>}
    </div>
  );
};

export default Coupon;
