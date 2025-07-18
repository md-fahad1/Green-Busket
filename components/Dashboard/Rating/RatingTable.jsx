import { styled } from "@mui/material/styles";

import {
  Box,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

const RatingTable = ({ ratingData }) => {
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
                Product Name
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Date
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="font-semibold text-xl border-r border-white"
              >
                Ratings
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratingData.map((row, idx) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  // component="th"
                  // scope="row"
                  align="left"
                  className="border-r border-r-gray-200 "
                >
                  <span className="font-medium text-dash-primary">
                    <span className="">#00{row.id}</span> {row.name}
                  </span>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row.product_name}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="border-r border-r-gray-200"
                >
                  {row.date}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Rating name="read-only" value={row.rating} readOnly />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RatingTable;
