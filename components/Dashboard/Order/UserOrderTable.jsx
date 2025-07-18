import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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

const OrderTable = ({ productsData }) => {
  const [orders, setOrders] = useState(productsData);
  console.log("order", orders);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/changeStatus/${orderId}`,
        { status: newStatus }
      );

      console.log("✅ Server response:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.Id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(
        "❌ Error updating order status:",
        error.response?.data || error.message
      );
    }
  };

  const handleAcceptOrder = (orderId, currentStatus) => {
    let nextStatus = "Pending";
    if (currentStatus === "Pending") nextStatus = "Delivered";
    else if (currentStatus === "Delivered") nextStatus = "Completed";
    else if (currentStatus === "Completed") return;

    updateOrderStatus(orderId, nextStatus);
  };

  const handleDeleteOrder = (orderId) => {
    updateOrderStatus(orderId, "Deny");
  };

  return (
    <Box sx={{ overflowY: "auto" }}>
      <TableContainer
        sx={{ width: "100%", overflow: "auto" }}
        component={Paper}
        className="!rounded-none"
      >
        <Table aria-label="simple table">
          <TableHead className="bg-dash-primary">
            <TableRow>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Order ID
              </StyledTableCell>
              {/* <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Customer Name
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Phone
              </StyledTableCell> */}
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Product Name
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Price
              </StyledTableCell>
              <StyledTableCell align="center" className="font-semibold text-xl">
                Date
              </StyledTableCell>
              <StyledTableCell align="center" className="font-semibold text-xl">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row, id) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className="border-r border-r-gray-200"
                >
                  <span className="font-medium text-dash-primary">
                    <span className="">#00{row.Id}</span>
                  </span>
                </StyledTableCell>
                {/* <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.user?.name}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.user?.phone}
                </StyledTableCell> */}
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.products?.map((product, index) => (
                    <div key={index}>{product.name}</div>
                  ))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <span>${(Number(row?.totalAmount) || 0).toFixed(2)}</span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row?.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.status || "Pending"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
