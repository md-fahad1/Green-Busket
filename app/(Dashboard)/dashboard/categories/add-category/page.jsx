"use client";
import { Alert, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const AddCategory = () => {
  const [alert, setAlert] = useState("");
  const [alertClose, setAlertClose] = useState(true);
  const [category, setCategory] = useState({
    name: "",
  });
  const [formError, setFormError] = useState({
    name: "",
  });

  const onChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
    setFormError({
      ...formError,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormError = { ...formError };
    let isValid = true;

    if (category.name.trim() === "") {
      newFormError.name = "Category name is required";
      isValid = false;
    }

    if (isValid) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/add`,
          { name: category.name }
        );
        if (res.status === 201) {
          setAlert("Category Created Successfully");
          setAlertClose(false);
          setCategory({ name: "" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError(newFormError);
    }
  };
  return (
    <div className="w-[95%] md:w-full mx-auto ">
      {!alertClose && (
        <Alert
          className="mb-3"
          severity="success"
          onClose={() => {
            setAlertClose(true);
          }}
        >
          Product Added Successfully
        </Alert>
      )}
      <h2 className="text-xl font-bold text-secondary">Add Category</h2>
      <div className="text-secondary mt-6 border rounded-md h-full px-4 bg-white py-6 lg:w-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
        <Box
          component="form"
          // sx={{ "& .MuiTextField-root": { m: 2 } }}
          noValidate
          autoComplete="off"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-1 ">
              Category Name<span className="text-red-500 select-none"> *</span>
            </label>
            <TextField
              fullWidth
              size="small"
              value={category.name}
              name="name"
              onChange={onChange}
              required
            />
            {formError.name && (
              <span className="text-red-500">{formError.name}</span>
            )}
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#2FB261" }}
            type="submit"
            className=" text-white"
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AddCategory;
