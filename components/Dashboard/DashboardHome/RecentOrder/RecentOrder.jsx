"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";

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

const RecentOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Order/search`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-6 w-full static bg-white dark:bg-dark-bg border dark:border-[#3d47514d] rounded-md  shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
      {/* header */}
      <div className="flex justify-between items-center px-6 py-2">
        <h3 className="text-xl font-bold text-secondary dark:text-dark-color">
          Recent Order
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
          View All
        </Button>
      </div>
      <Box sx={{ overflowY: "auto" }}>
        <TableContainer
          sx={{ width: "100%", overflow: "auto" }}
          component={Paper}
          className="!rounded-none"
        >
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead className="bg-dash-primary">
              <TableRow>
                <StyledTableCell
                  align="center"
                  className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
                >
                  Order ID
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
                >
                  Customer Name
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
                >
                  Phone
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
                >
                  Product Name
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="font-semibold text-xl dark:border-[#3d47514d]"
                >
                  Price
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="font-semibold text-xl dark:border-[#3d47514d]"
                >
                  Date
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, idx) => (
                <StyledTableRow key={order.Id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className="border-r dark:border-b-[#3d47514d] dark:bg-dark-bg dark:text-dark-color border-r-gray-200 dark:border-r-[#3d47514d]"
                  >
                    <span className="font-medium text-dash-primary">
                      #{order.Id}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="border-r dark:border-b-[#3d47514d] dark:bg-dark-bg dark:text-dark-color border-r-gray-200 dark:border-r-[#3d47514d]"
                  >
                    {order.user.name}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="border-r dark:border-b-[#3d47514d] dark:bg-dark-bg dark:text-dark-color border-r-gray-200 dark:border-r-[#3d47514d]"
                  >
                    {order.user.phone}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="border-r dark:border-b-[#3d47514d] dark:bg-dark-bg dark:text-dark-color border-r-gray-200 dark:border-r-[#3d47514d]"
                  >
                    {order.products.map((product, index) => (
                      <div key={index}>{product.name}</div>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="border-r dark:border-b-[#3d47514d] dark:bg-dark-bg dark:text-dark-color border-r-gray-200 dark:border-r-[#3d47514d]"
                  >
                    <span>${(Number(order?.totalAmount) || 0).toFixed(2)}</span>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="dark:bg-dark-bg dark:border-b-[#3d47514d] dark:text-dark-color"
                  >
                    {new Date(order.date).toLocaleDateString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default RecentOrder;
