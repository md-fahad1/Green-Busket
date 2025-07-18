"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

const BannerAdd = () => {
  const [eventLink, setEventLink] = useState("");
  const [file, setFile] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all banners
  const fetchBanners = async () => {
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Banner/all`;
      const response = await axios.get(API_URL);
      setBanners(response.data);
    } catch (error) {
      console.error("Failed to load banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "Please select a file!",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "warning",
        title: "Invalid file type!",
        text: "Please upload an image file.",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "warning",
        title: "File too large!",
        text: "Max allowed size is 2MB.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("EventLink", eventLink);
      formData.append("file", file);

      const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Banner/add`;

      await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Banner added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      setEventLink("");
      setFile(null);
      e.target.reset();
      fetchBanners(); // 🔁 Reload the banner list after upload
    } catch (error) {
      console.error("Upload error:", error);

      const errorMessage =
        error.response?.status === 404
          ? "API endpoint not found (404). Check your URL."
          : error?.response?.data || "Something went wrong.";

      Swal.fire({
        icon: "error",
        title: "Upload failed!",
        text: errorMessage,
      });
    }
  };

  // ✅ Normalize broken image path
  const fixImageUrl = (path) => {
    if (path?.startsWith("https:/") && !path.startsWith("https://")) {
      return path.replace(
        "https:/",
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/`
      );
    }
    return path;
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      {/* Form */}
      <div className="max-w-md mb-8 border rounded p-4 mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Add Banner</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter Event Link"
            value={eventLink}
            onChange={(e) => setEventLink(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Banner List */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-center">All Banners</h3>
        {loading ? (
          <p className="text-center">Loading banners...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div key={banner.Id} className="border p-2 rounded shadow">
                <a
                  href={banner.EventLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={fixImageUrl(banner.path)}
                    alt={banner.FileName}
                    width={400}
                    height={250}
                    className="w-full h-[200px] object-cover rounded"
                  />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerAdd;
