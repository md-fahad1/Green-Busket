"use client";
import { Alert, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker, validateTime } from "@mui/x-date-pickers";
import moment from "moment";

const AddCoupon = () => {
  const [alert, setAlert] = useState("");
  const [alertClose, setAlertClose] = useState(true);
  const [validFromDate, setValidFromDate] = useState(moment());
  const [validFromTime, setValidFromTime] = useState(moment());
  const [validUntilDate, setValidUntilDate] = useState(moment().add(5, "days"));
  const [validUntilTime, setValidUntilTime] = useState(
    moment().set("hour", 23).set("minute", 59)
  );
  const [coupon, setCoupon] = useState({
    name: "",
    code: "",
    validFromDateTime: "",
    validUntilDateTime: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    code: "",
    validFromDateTime: "",
    validUntilDateTime: "",
  });

  useEffect(() => {
    let newCoupon = { ...coupon };
    if (validFromDate && validFromTime) {
      const combineDateTime = moment(validFromDate)
        .hour(moment(validFromTime).hour())
        .minute(moment(validFromTime).minute())
        .second(0)
        .toISOString();

      newCoupon = { ...newCoupon, validFromDateTime: combineDateTime };
    }
    if (validUntilDate && validUntilTime) {
      const combineDateTime = moment(validUntilDate)
        .hour(moment(validUntilTime).hour())
        .minute(moment(validUntilTime).minute())
        .second(0)
        .toISOString();

      newCoupon = { ...newCoupon, validUntilDateTime: combineDateTime };
      setFormError({
        ...formError,
        validUntilDateTime: "",
      });
    }
    setCoupon(newCoupon);
  }, [validFromDate, validFromTime, validUntilDate, validUntilTime]);

  // console.log(coupon);

  const onChange = (e) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value,
    });
    setFormError({
      ...formError,
      [e.target.name]: "",
      validUntilDateTime: "",
      validFromDateTime: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormError = { ...formError };
    let isValid = true;

    if (coupon.name.trim() === "") {
      newFormError.name = "Coupon name is required";
      isValid = false;
    }
    if (coupon.code.trim() === "") {
      newFormError.code = "Coupon Code is required";
      isValid = false;
    }
    if (coupon.validFromDateTime > coupon.validUntilDateTime) {
      newFormError.validUntilDateTime = "Invalid Date";
      isValid = false;
    }

    const newFormData = new FormData();

    newFormData.append("name", coupon.name);
    newFormData.append("code", coupon.code.toUpperCase());
    newFormData.append("validFromDateTime", coupon.validFromDateTime);
    newFormData.append("validUntilDateTime", coupon.validUntilDateTime);

    if (isValid) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Coupon/addCoupon`,
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 201) {
          setAlert("Coupon Created Successfully");
          setAlertClose(false);
          setCoupon({
            name: "",
            code: "",
            validFromDateTime: "",
            validUntilDateTime: "",
          });
        }
      } catch (error) {
        console.log(error);
        setAlert("Something Problem to Post Data");
        setAlertClose(false);
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
          severity={alert.includes("Successfully") ? "success" : "error"}
          onClose={() => {
            setAlertClose(true);
          }}
        >
          {alert}
        </Alert>
      )}
      <h2 className="text-xl font-bold text-secondary dark:text-white">
        Add Coupon
      </h2>
      <div className="text-secondary mt-6 border rounded-md h-full px-4 bg-white py-6 lg:w-full shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)]">
        <Box
          component="form"
          // sx={{ "& .MuiTextField-root": { m: 2 } }}
          noValidate
          autoComplete="off"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-1 ">
                Coupon Name<span className="text-red-500 select-none"> *</span>
              </label>
              <TextField
                fullWidth
                size="small"
                value={coupon.name}
                name="name"
                onChange={onChange}
                placeholder="Enter Coupon Name"
                required
              />
              {formError.name && (
                <span className="text-red-500">{formError.name}</span>
              )}
            </div>
            <div className="w-full">
              <label className="mb-1 ">
                Coupon Code<span className="text-red-500 select-none"> *</span>
              </label>
              <TextField
                fullWidth
                size="small"
                value={coupon.code.toUpperCase()}
                name="code"
                onChange={onChange}
                required
                placeholder="Enter Coupon Code"
              />
              {formError.code && (
                <span className="text-red-500">{formError.code}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="block">
                Valid From<span className="text-red-500 select-none"> *</span>
              </label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={moment(validFromDate)}
                  onChange={(newDate) => setValidFromDate(newDate)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderStartEndRadius: { lg: "0" },
                      borderEndEndRadius: { lg: "0" },
                    },
                  }}
                  format="DD/MM/YYYY"
                  // borderEndEndRadius={{ sm: "0" }}
                />
                <TimePicker
                  value={moment(validFromTime)}
                  onChange={(newTime) => setValidFromTime(newTime)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    // width: "30%",
                    "& .MuiInputBase-root": {
                      borderStartStartRadius: "0",
                      borderEndStartRadius: "0",
                    },
                  }}
                />
              </LocalizationProvider>
              {formError.validFromDateTime && (
                <span className="text-red-500">
                  {formError.validFromDateTime}
                </span>
              )}
            </div>
            <div className="w-full relative">
              <label className="block">
                Valid Until<span className="text-red-500 select-none"> *</span>
              </label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={moment(validUntilDate)}
                  onChange={(newDate) => setValidUntilDate(newDate)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderStartEndRadius: { lg: "0" },
                      borderEndEndRadius: { lg: "0" },
                    },
                  }}
                  format="DD/MM/YYYY"
                />
                <TimePicker
                  value={moment(validUntilTime)}
                  onChange={(newTime) => setValidUntilTime(newTime)}
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    // width: "30%",

                    "& .MuiInputBase-root": {
                      borderStartStartRadius: "0",
                      borderEndStartRadius: "0",
                    },
                  }}
                />
              </LocalizationProvider>
              <div className="absolute -bottom-6 left-0">
                {formError.validUntilDateTime && (
                  <span className="text-red-500">
                    {formError.validUntilDateTime}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#2FB261" }}
            type="submit"
            className=" text-white"
          >
            Add Coupon
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AddCoupon;
