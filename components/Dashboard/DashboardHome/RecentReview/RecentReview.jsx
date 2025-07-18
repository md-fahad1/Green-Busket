// "use client";
// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Box, Button, Rating } from "@mui/material";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     // backgroundColor: theme.palette.common["#2FB261"],
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
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     // border: 0,
//   },
// }));

// function createData(name, calories, fat, status, rating) {
//   return { name, calories, fat, status, rating };
// }

// const rows = [
//   createData("Frozen yoghurt", "T-Shirt", "Oct-11-2024", "Completed", 5),
//   createData(
//     "Ice cream sandwich",
//     "Men Shirt                                  ",
//     "Oct-11-2024",
//     "Processing",
//     4
//   ),
//   createData("Eclair", "Women Shirt", "Oct-11-2024", "Canceled", 3),
//   createData("Cupcake", "Pant", "Oct-11-2024", "Completed", 4),
//   createData("Gingerbread", "Men Jacket", "Oct-11-2024", "Processing", 5),
//   createData("Gingerbread", "Women Jacket", "Oct-11-2024", "Completed", 5),
// ];

// const RecentReview = () => {
//   const [duration, setDuration] = useState("");

//   const handleChange = (event) => {
//     setDuration(event.target.value);
//   };
//   return (
//     <div className="mt-6 w-full static bg-white  dark:bg-dark-bg border dark:border-[#3d47514d]  rounded-md  shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
//       {/* header */}
//       <div className="flex justify-between items-center px-6 py-2">
//         <h3 className="text-xl font-bold text-secondary dark:text-dark-color">
//           Recent Review
//         </h3>
//         <Button
//           color="primary"
//           variant="contained"
//           sx={{
//             color: "white",
//             paddingY: "4px",
//             textTransform: "capitalize",
//           }}
//         >
//           View All
//         </Button>
//       </div>
//       <Box
//         sx={{
//           overflowY: "auto",
//         }}
//       >
//         <TableContainer
//           sx={{ width: "100%", overflow: "auto" }}
//           component={Paper}
//           className="!rounded-none dark:bg-dark-bg"
//         >
//           <Table
//             sx={{
//               minWidth: 600,
//             }}
//             aria-label="simple table"
//           >
//             <TableHead className="bg-dash-primary ">
//               <TableRow>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
//                 >
//                   Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
//                 >
//                   Product Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white dark:border-[#3d47514d]"
//                 >
//                   Date
//                 </StyledTableCell>
//                 <StyledTableCell
//                   align="center"
//                   className="font-semibold text-xl border-r border-white dark:border-b-[#3d47514d] dark:border-[#3d47514d]"
//                 >
//                   Rating
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row, idx) => (
//                 <StyledTableRow key={row.name}>
//                   <StyledTableCell
//                     // component="th"
//                     // scope="row"
//                     align="left"
//                     className="border-r border-r-gray-200 dark:border-b-[#3d47514d] dark:border-r-[#3d47514d]"
//                   >
//                     <span className="font-medium text-dash-primary">
//                       <span className="">#00{idx + 1}</span> {row.name}
//                     </span>
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="center"
//                     className="border-r  dark:text-dark-color border-r-gray-200 dark:border-b-[#3d47514d] dark:border-r-[#3d47514d]"
//                   >
//                     {row.calories}
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="center"
//                     className="border-r  dark:text-dark-color border-r-gray-200 dark:border-b-[#3d47514d] dark:border-r-[#3d47514d]"
//                   >
//                     {row.fat}
//                   </StyledTableCell>

//                   <StyledTableCell
//                     align="center"
//                     className="dark:border-b-[#3d47514d]"
//                   >
//                     <Rating name="read-only" value={row.rating} readOnly />
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </div>
//   );
// };

// export default RecentReview;
