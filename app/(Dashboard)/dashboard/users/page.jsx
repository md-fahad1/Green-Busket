"use client";
import ProductTable from "@/components/Dashboard/Product/ProductTable";
import PageHeader from "@/components/Dashboard/DashboardHeader/PageHeader";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoriesTableBar from "@/components/Dashboard/Categories/CategoriesTableBar";
import UsersTable from "@/components/Dashboard/User/UsersTable";

const Products = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/search`
        );
        if (res.status === 200) {
          const allUsers = res.data;
          setCount(allUsers.length);

          // Implement pagination
          const startIndex = (currentPage - 1) * itemsPerPage;
          const paginatedData = allUsers.slice(
            startIndex,
            startIndex + itemsPerPage
          );
          setUsers(paginatedData);
        }
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <PageHeader
        title={"All Users"}
        // btnName={"Add User"}
        // href={"/dashboard/users/add-user"}
      />
      <div className="overflow-auto w-[95%] mx-auto mt-6 border rounded-md h-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
        <div className="bg-white min-w-[600px]">
          {/* Table Bar */}
          {/* <CategoriesTableBar /> */}

          {/* Loading and Error Handling */}
          {loading ? (
            <p className="text-center py-4">Loading...</p>
          ) : error ? (
            <p className="text-center py-4 text-red-500">{error}</p>
          ) : (
            <>
              {/* Users Table */}
              <UsersTable usersData={users} />

              {/* Pagination */}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
