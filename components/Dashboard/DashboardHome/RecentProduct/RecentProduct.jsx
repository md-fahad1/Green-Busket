import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { fetchProducts, fetchProductById } from "@/lib/FetchProduct";
import axios from "axios";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const RecentProduct = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setData(products);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (Id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/delete/${Id}`
      );

      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      setError("Failed to Delete Product. Please try again later.", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (data.length === 0) return <p>No products available.</p>;
  return (
    <div className="mt-6 w-full static bg-white dark:bg-dark-bg border dark:border-[#3d47514d] rounded-md  shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
      {/* header */}
      <div className="flex justify-between items-center px-6 py-2">
        <h3 className="text-xl font-bold text-secondary dark:text-dark-color">
          Recent Product
        </h3>
        <Button
          color="primary"
          variant="contained"
          sx={{
            color: "white",
            paddingY: "4px",
            textTransform: "capitalize",
          }}
        >
          <Link href="/dashboard/products" passHref>
            View All
          </Link>
        </Button>
      </div>
      <Box
        sx={{
          overflowY: "auto",
        }}
      >
        <TableContainer
          sx={{ width: "100%", overflow: "auto" }}
          component={Paper}
          className="!rounded-none"
        >
          <Table
            sx={{
              minWidth: 600,
            }}
            aria-label="simple table"
          >
            <TableHead className="bg-dash-primary ">
              <TableRow>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Stock</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 5).map(
                (
                  row // Limit to first 5 products
                ) => (
                  <StyledTableRow key={row.Id}>
                    <StyledTableCell align="center">
                      <Image
                        src={row.image[0]}
                        height={45}
                        width={45}
                        alt={row.name}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <span
                        className={`font-semibold ${
                          row.stock === "In Stock"
                            ? "text-dash-primary"
                            : "text-rose-600"
                        }`}
                      >
                        {row.stock}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      ${parseFloat(row.price).toFixed(2)}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      {row.category}
                    </StyledTableCell> */}
                    <StyledTableCell align="center">
                      {row.category?.name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <Button color="primary">
                        <Link
                          href={`/dashboard/products/EditProduct/${row.Id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button
                        onClick={() => deleteProduct(row.Id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default RecentProduct;
