"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Ensure this path is correct
import OrderSummery from "@/components/Dashboard/DashboardHome/OrderSummery/OrderSummery";
import OrderStatus from "@/components/Dashboard/DashboardHome/OrderStatus/OrderStatus";
import TopProduct from "@/components/Dashboard/DashboardHome/TopProduct/TopProduct";
import RecentOrder from "@/components/Dashboard/DashboardHome/RecentOrder/RecentOrder";
import { Container } from "@mui/material";
import RecentProduct from "@/components/Dashboard/DashboardHome/RecentProduct/RecentProduct";
import RecentReview from "@/components/Dashboard/DashboardHome/RecentReview/RecentReview";
import UserOrder from "./order/page";

const page = () => {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <UserOrder />
      {/* <OrderSummery />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <OrderStatus />
        </div>
        <div>
          <TopProduct />
        </div>
      </div>
      <section>
        <RecentOrder />
      </section>
      <section>
        <RecentProduct />
      </section> */}
    </Container>
  );
};
export default page;
