import React, { useState, useEffect } from "react";
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
  TextField,
  Container,
  Typography,
} from "@mui/material";

export default function AddCategory() {
  const [categoryId, setCategoryId] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
      );
      setCategoryId(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/delete/${id}`
      );
      setCategoryId((prev) => prev.filter((category) => category.Id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const startEditing = (id, name) => {
    setEditCategoryId(id);
    setCategoryName(name); // Set the category name to the state for editing
  };

  const cancelEditing = () => {
    setEditCategoryId(null);
    setCategoryName(""); // Clear the name when canceling edit
  };

  const saveCategory = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/edit/${editCategoryId}`,
        { name: categoryName }
      );
      setCategoryId((prev) =>
        prev.map((category) =>
          category.Id === editCategoryId
            ? { ...category, name: categoryName }
            : category
        )
      );
      cancelEditing();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

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

  return (
    <Box sx={{ overflowY: "auto" }}>
      <TableContainer
        sx={{ width: "100%", overflow: "auto" }}
        component={Paper}
      >
        <Table aria-label="category table">
          <TableHead className="bg-dash-primary">
            <TableRow>
              <StyledTableCell align="center">Category Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryId.map((row) => (
              <StyledTableRow key={row.Id}>
                <StyledTableCell align="center">{row.Id}</StyledTableCell>
                <StyledTableCell align="center">
                  {editCategoryId === row.Id ? (
                    <TextField
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)} // Ensure this updates the categoryName state
                      fullWidth
                      variant="outlined"
                      autoFocus // Focus on the input field when editing
                    />
                  ) : (
                    row.name
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {editCategoryId === row.Id ? (
                    <>
                      <Button onClick={saveCategory} color="primary">
                        Save
                      </Button>
                      <Button onClick={cancelEditing} color="secondary">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => startEditing(row.Id, row.name)}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteCategory(row.Id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
