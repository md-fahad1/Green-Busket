"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "@/components/Dashboard/DashboardHeader/PageHeader";
import OrderTable from "@/components/Dashboard/Order/OrderTable";
import OrderTableBar from "@/components/Dashboard/Order/OrderTableBar";
import { Pagination, Stack, CircularProgress } from "@mui/material";

const Order = () => {
  const [count, setCount] = useState(0); // total number of orders
  const [products, setProducts] = useState([]); // current products (orders)
  const [itemsPerPage, setItemsPerPage] = useState(5); // items per page
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state for API calls

  // Calculate the total number of pages
  const numberOfPages = Math.ceil(count / itemsPerPage);

  // Fetch order data based on the current page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Order/search`
        ); // replace with real API endpoint
        const allProducts = res.data;

        // Set the total count of orders
        setCount(allProducts.length);

        // Calculate the data to show for the current page
        const data = allProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

        // Set the products for the current page
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false); // stop loading spinner
      }
    };

    fetchData();
  }, [currentPage]); // refetch data when currentPage changes

  // Handle pagination change
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Loading state and error handling
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />{" "}
        {/* Show a loading spinner while data is being fetched */}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Display error message if something goes wrong
  }

  return (
    <div>
      {/* Page header */}
      {/* <div>
        <PageHeader
          title={"All Orders"}
          btnName={"Add Order"}
          href={"/dashboard/products/add-product"}
        />
      </div> */}

      {/* Order table container */}
      <div className="overflow-auto w-[95%] mx-auto mt-6 border rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
        <div className="bg-white min-w-[600px]">
          {/* Order table bar */}
          {/* <OrderTableBar /> */}

          {/* Order table */}
          <OrderTable productsData={products} />

          {/* Pagination controls */}
          <div className="flex justify-end py-3 me-6">
            <Stack spacing={2}>
              <Pagination
                page={currentPage}
                onChange={handleChange}
                count={numberOfPages}
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

export default Order;
