"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // ✅ SweetAlert2

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [formError, setFormError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [userId, setUserId] = useState(null);

  // ✅ Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email.includes("@")) {
      setFormError("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/EmailOTP/forgetPassword`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data === "OTP sent successfully") {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "Please check your email!",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowOtpInput(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.data?.message || "Failed to send OTP",
        });
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setOtpError("");

    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits.");
      return;
    }

    try {
      setVerifying(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/EmailOTP/check`,
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data?.message?.message === "OTP verified successfully") {
        const userIdFromRes = res.data?.message?.user?.Id;
        setUserId(userIdFromRes);
        setShowPasswordInput(true);

        Swal.fire({
          icon: "success",
          title: "OTP Verified",
          text: "You can now reset your password.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: res.data?.message || "Invalid OTP.",
        });
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Something went wrong while verifying OTP.",
      });
    } finally {
      setVerifying(false);
    }
  };

  // ✅ Step 3: Change Password
  const handleChangePassword = async () => {
    setPasswordError("");

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    try {
      setChangingPassword(true);

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/User/newPassword/${userId}`,
        { newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        res.data?.success ||
        res.data?.message === "Password updated successfully"
      ) {
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "You can now login with your new password.",
        }).then(() => {
          router.push("/signin");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res.data?.message || "Failed to reset password.",
        });
      }
    } catch (err) {
      console.error("Password change error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error resetting password.",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {/* Email input */}
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border px-4 py-2 rounded-md mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formError && (
            <p className="text-red-500 text-sm mb-2">{formError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2FB261] w-full text-white font-semibold py-2 px-4 rounded-md hover:bg-[#248b4c] transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* OTP Input */}
        {showOtpInput && !showPasswordInput && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Verify OTP
            </h3>
            <p className="text-sm text-gray-600 text-center mb-3">
              Enter the 6-digit code sent to <b>{email}</b>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
              className="w-full px-4 py-2 border text-center rounded-md text-xl tracking-widest mb-2"
              placeholder="123456"
            />
            {otpError && (
              <p className="text-red-500 text-sm text-center">{otpError}</p>
            )}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={verifying}
                className="bg-[#2FB261] text-white px-6 py-2 rounded hover:bg-[#248b4c]"
              >
                {verifying ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        )}

        {/* New Password Input */}
        {showPasswordInput && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Set New Password
            </h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-2"
              placeholder="Enter new password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm text-center">
                {passwordError}
              </p>
            )}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="bg-[#2FB261] text-white px-6 py-2 rounded hover:bg-[#248b4c]"
              >
                {changingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgetPassword;
