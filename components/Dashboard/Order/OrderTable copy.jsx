import React, { useState } from "react";
import axios from "axios";
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
              <StyledTableCell
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
              </StyledTableCell>
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
              <StyledTableCell align="center" className="font-semibold text-xl">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className="border-r border-r-gray-200"
                >
                  <span className="font-medium text-dash-primary">
                    #00{row.Id}
                  </span>
                </StyledTableCell>
                <StyledTableCell
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
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.products?.map((product, index) => (
                    <span key={index}>
                      {product.name}
                      {index < row.products.length - 1 && ", "}
                    </span>
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
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptOrder(row.Id, row.status)}
                    sx={{ width: 100, height: 30, fontSize: "0.75rem" }} // Small text
                  >
                    {row.status === "Completed"
                      ? "Done"
                      : row.status === "Delivered"
                      ? "Finish"
                      : row.status === "Pending"
                      ? "Accept"
                      : "Accept"}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteOrder(row.Id)}
                    sx={{ mt: 2, width: 100, height: 30, fontSize: "0.75rem" }} // Small text
                  >
                    Delete
                  </Button>
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

// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   tableCellClasses,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from "@mui/material";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const OrderTable = ({ productsData }) => {
//   const [orders, setOrders] = useState(productsData);
//   console.log("order", orders);

//   const handleAcceptOrder = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId
//           ? {
//               ...order,
//               status: order.status === "Delivered" ? "Completed" : "Delivered",
//             }
//           : order
//       )
//     );
//   };

//   const handleDeleteOrder = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.filter((order) => order.id !== orderId)
//     );
//   };

//   return (
//     <Box sx={{ overflowY: "auto" }}>
//       <TableContainer
//         sx={{ width: "100%", overflow: "auto" }}
//         component={Paper}
//         className="!rounded-none"
//       >
//         <Table aria-label="simple table">
//           <TableHead className="bg-dash-primary">
//             <TableRow>
//               <StyledTableCell
//                 align="center"
//                 className="font-semibold text-xl border-r border-white"
//               >
//                 Order ID
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 className="font-semibold text-xl border-r border-white"
//               >
//                 Customer Name
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 className="font-semibold text-xl border-r border-white"
//               >
//                 Phone
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 className="font-semibold text-xl border-r border-white"
//               >
//                 Product Name
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 className="font-semibold text-xl border-r border-white"
//               >
//                 Price
//               </StyledTableCell>
//               <StyledTableCell align="center" className="font-semibold text-xl">
//                 Date
//               </StyledTableCell>
//               <StyledTableCell align="center" className="font-semibold text-xl">
//                 Status
//               </StyledTableCell>
//               <StyledTableCell align="center" className="font-semibold text-xl">
//                 Actions
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((row, id) => (
//               <StyledTableRow key={row.id}>
//                 <StyledTableCell
//                   component="th"
//                   scope="row"
//                   className="border-r border-r-gray-200"
//                 >
//                   <span className="font-medium text-dash-primary">
//                     <span className="">#00{row.Id}</span>
//                   </span>
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="border-r border-r-gray-200"
//                 >
//                   {row?.user?.name}
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="border-r border-r-gray-200"
//                 >
//                   {row?.user?.phone}
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="border-r border-r-gray-200"
//                 >
//                   {row?.products?.map((product, index) => (
//                     <div key={index}>{product.name}</div>
//                   ))}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   <span>${(Number(row?.totalAmount) || 0).toFixed(2)}</span>
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   {new Date(row?.date).toLocaleDateString()}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   {row.status || "Pending"}
//                 </StyledTableCell>
//                 <StyledTableCell align="center">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleAcceptOrder(row.id)}
//                   >
//                     {row.status === "Completed" ? "Completed" : "Accept Order"}
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleDeleteOrder(row.id)}
//                     sx={{ ml: 2 }}
//                   >
//                     Delete
//                   </Button>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default OrderTable;
