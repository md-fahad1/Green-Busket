"use client";
import ProductTable from "@/components/Dashboard/Product/ProductTable";
import PageHeader from "@/components/Dashboard/DashboardHeader/PageHeader";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductTableBar from "@/components/Dashboard/Product/ProductTableBar";
import Link from "next/link";

const Products = () => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // const numberOfPage = Math.ceil(count / itemsPerPage);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/data/product.json");
      const allProducts = res.data;
      setCount(allProducts.length);
      const data = allProducts.splice(
        (currentPage - 1) * itemsPerPage,
        itemsPerPage
      );
      // console.log(data);

      setProducts(data);
    };
    getData();
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Link href="/dashboard/products/add-product">
        <PageHeader title={"All Products"} btnName={"Add Product"} />{" "}
      </Link>
      <div
        className={`overflow-auto w-[95%] mx-auto mt-6 border rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]`}
      >
        <div className="bg-white min-w-[600px]  ">
          {/* table bar */}
          {/* <ProductTableBar /> */}
          {/* order table */}
          <ProductTable productsData={products} />
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

export default Products;
