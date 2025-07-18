import React from "react";
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
} from "@mui/material";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common["#2FB261"],
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
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));

const CouponTable = ({ couponsData }) => {
  return (
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
        <Table aria-label="simple table">
          <TableHead className="bg-dash-primary ">
            <TableRow>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Name
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Code
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Discount
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Start Date
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Status
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl "
              >
                Expired Date
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {couponsData.map((row, idx) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className="border-r border-r-gray-200 "
                >
                  <span className="font-medium text-dash-primary">
                    <span className="">{row?.title}</span> {row.name}
                  </span>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.code}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.discount}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {moment(row?.validFrom).format("MM/D/YYYY, h:mm a")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row?.status === "active" && (
                    <span className="bg-green-200 px-2 py-1 rounded-md">
                      {row?.status}
                    </span>
                  )}

                  {row?.status === "expired" && (
                    <span className="bg-red-200 px-2 py-1 rounded-md">
                      {row?.status}
                    </span>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <span>
                    {" "}
                    {moment(row?.validUntil).format("MM/D/YYYY, h:mm a")}
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CouponTable;
