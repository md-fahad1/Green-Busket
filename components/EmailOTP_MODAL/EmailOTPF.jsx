"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmailOTPF = ({ otpModalOpen, email }) => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const router = useRouter();

  useEffect(() => {
    if (otpModalOpen) {
      setOpen(true);
    }
  }, [otpModalOpen]);

  const handleClose = () => setOpen(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      // Only allow a single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input field
      if (index < otp.length - 1) {
        document.getElementById(`otp${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(paste)) {
      const newOtp = [...otp];
      paste.split("").forEach((digit, index) => {
        newOtp[index] = digit;
      });
      setOtp(newOtp);
      // Focus on the last filled input field
      document.getElementById(`otp${paste.length - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join(""); // Convert OTP array to a string
    const data = {
      email: email,
      otp: otpString,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/SignupVerifyOTP`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className="inputLabel">Please Provide Your OTP</p>
        <div className="w-full h-full relative">
          {/* OTP input fields */}
          <form
            className="flex flex-col items-start gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-1 border-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp${index}`}
                  type="text"
                  name={`otp${index}`}
                  maxLength={1}
                  value={digit}
                  className="border border-[rgba(0,0,255,0.5)] w-[3rem] h-[3rem] text-center"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-[rgba(0,128,0,0.5)] px-2 py-1 rounded-lg text-white"
            >
              Submit
            </button>
          </form>
        </div>
        <p>{email}</p>
        <Button onClick={handleClose} className="absolute top-1 right-0">
          X
        </Button>
      </Box>
    </Modal>
  );
};

export default EmailOTPF;
