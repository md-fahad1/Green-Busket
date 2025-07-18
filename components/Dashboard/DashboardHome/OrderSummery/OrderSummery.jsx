"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import OrderSummeryCard from "./OrderSummeryCard";
import { RiFileList2Fill } from "react-icons/ri";
import { BsFillCartCheckFill, BsFillBoxSeamFill } from "react-icons/bs";
import { FaBox } from "react-icons/fa";
import axios from "axios";

const OrderSummery = () => {
  const [orderSummery, setOrderSummery] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/monthly`;
  const API_URL_WEEK = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/weakly/now`;
  const API_URL_SIX_MONTH = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Graph/sales/last-6-months`;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [resMonth, resWeek] = await Promise.all([
          axios.get(API_URL),
          axios.get(API_URL_SIX_MONTH),
        ]);

        const monthlyData = resMonth.data || [];
        const weeklyData = resWeek.data || [];

        setOrderSummery([
          {
            title: "This Month",
            icon: (
              <BsFillBoxSeamFill className="text-[60px] text-dash-primary" />
            ),
            amount: monthlyData[0]?.totalSales || 0,
          },
          {
            title: "Last Month",
            icon: (
              <BsFillCartCheckFill className="text-[60px] text-dash-primary" />
            ),
            amount: monthlyData[1]?.totalSales || 0,
          },
          {
            title: "Total Orders",
            icon: <FaBox className="text-[55px] text-dash-primary" />,
            amount: weeklyData[0]?.totalSales || 0,
          },
          {
            title: "Today Orders",
            icon: <RiFileList2Fill className="text-[60px] text-dash-primary" />,
            amount: weeklyData[0]?.todaySales || 0, // Assuming your API provides this, otherwise adjust
          },
        ]);

        setError(null);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to fetch order summary");
        setOrderSummery([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ Empty dependency array to avoid infinite loop

  if (loading)
    return (
      <div className="flex justify-center items-center h-32 text-dash-primary">
        Loading summary...
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <section>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderSummery.map((summery, idx) => (
          <OrderSummeryCard key={idx} summery={summery} />
        ))}
      </Box>
    </section>
  );
};

export default OrderSummery;
