import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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

const UsersTable = ({ usersData, setUsersData }) => {
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/User/forceFullyDelete/${id}`
      );
      setUsersData((prev) => prev.filter((user) => user.Id !== id)); // Remove user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Box sx={{ overflowY: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflow: "auto" }}
      >
        <Table aria-label="simple table">
          <TableHead className="bg-dash-primary">
            <TableRow>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Image
              </StyledTableCell>
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
                Email
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
                Address
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData?.map((row) => (
              <StyledTableRow key={row.Id}>
                <StyledTableCell align="center">
                  <Image
                    src={row.Image}
                    alt={row.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => deleteUser(row.Id)} color="error">
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

export default UsersTable;
