"use client";
import CouponTable from "@/components/Dashboard/Coupon/CouponTable";
import CouponTableBar from "@/components/Dashboard/Coupon/CouponTableBar";
import PageHeader from "@/components/Dashboard/DashboardHeader/PageHeader";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Coupon = () => {
  const [count, setCount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // const numberOfPage = Math.ceil(count / itemsPerPage);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/data/couponData.json");
      const allCoupons = res.data;
      setCount(allCoupons.length);
      const data = allCoupons.splice(
        (currentPage - 1) * itemsPerPage,
        itemsPerPage
      );

      setCoupons(data);
    };
    getData();
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div>
        <PageHeader
          title={"All Coupon"}
          btnName={"Add Coupon"}
          href={"/dashboard/coupon/add-coupon"}
        />
      </div>
      <div
        className={`overflow-auto w-[95%] mx-auto mt-6 border rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]`}
      >
        <div className="bg-white min-w-[600px]  ">
          {/* table bar */}
          <CouponTableBar />
          {/* order table */}
          <CouponTable couponsData={coupons} />
          <div className="flex justify-end py-3 me-6">
            <Stack spacing={2}>
              <Pagination
                page={currentPage}
                onChange={handleChange}
                count={Math.ceil(count / itemsPerPage)}
                shape="rounded"
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
