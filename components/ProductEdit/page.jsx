"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Image from "next/image";
import ReactFileReader from "react-file-reader";
import { FcAddImage } from "react-icons/fc";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { Alert, Modal, Box, Button } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function EditProductPage({ params }) {
  const { id } = params;
  const [alert, setAlert] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [content, setContent] = useState("");
  const [rows, setRows] = useState([{ attribute: "", values: [""] }]);
  const [attr, setAttr] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryId, setCategoryId] = useState([]);

  const router = useRouter();

  const fetchCategory = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
      );
      setCategoryId(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search/${id}`
      );

      setData(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
    fetchData();
  }, [fetchCategory, fetchData]);

  /**
   *
   * Fetch categoryId
   *
   */

  /****
   *
   * JSON Object (Product Attributes)
   *
   *
   */

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e, rowIndex, valueIndex) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    if (name === "attribute") {
      newRows[rowIndex][name] = value;
    } else {
      newRows[rowIndex].values[valueIndex] = value;
    }
    setRows(newRows);
  };

  const handleAddValue = (rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].values.push(""); // Add a new empty field
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { attribute: "", values: [""] }]);
  };

  const handleSubmits = () => {
    const result = rows.reduce((acc, row) => {
      if (row.attribute) {
        acc[row.attribute] = row.values.filter((value) => value !== "");
      }
      return acc;
    }, {});

    alert(JSON.stringify(result, null, 2));
    setAttr(result);
  };

  /****
   *
   * JODit Editor
   *
   */

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  /****
   *
   * Image processing as array
   */

  const handleFiles = (files) => {
    let newImages = [];

    // Check if 'files' is a FileList (from input file or ReactFileReader)
    if (files && files[0] instanceof File) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newImages.push({
          src: URL.createObjectURL(file),
          file,
          id: Date.now() + Math.random(),
        });
      }
    }

    setProductImages((prevImages) => [...prevImages, ...newImages]);
  };

  /****
   *
   * Submit a new product
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.productTitle.value);
    formData.append("desc", content || ""); // Ensure this is a string
    formData.append("price", e.target.price.value);
    formData.append("json_atribute", JSON.stringify(attr)); // Ensure this is JSON
    formData.append("categoryId", e.target.category.value);
    // formData.append("categoryId", "22");
    formData.append("quantity", e.target.quantity.value); // Ensure quantity is added
    formData.append("date", new Date().toISOString()); // Use the current date

    // Append image files
    productImages.forEach((image) => {
      formData.append("ProductPicture", image.file); // Ensure 'images' matches the backend expectation
    });

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setAlert(true);
        Swal.fire({
          icon: "success",
          title: "Product Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.push("/dashboard/products");
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="flex flex-col  h-screen overflow-auto scrollbar-thin">
      {alert && (
        <Alert
          className="mb-3"
          severity="success"
          onClose={() => {
            setAlert(false);
          }}
        >
          Product update Successfully
        </Alert>
      )}
      <form className="mt-0" onSubmit={handleSubmit}>
        {/* Product info */}
        <p className="text-xl text-[rgba(0,0,255,0.50)]">Edit Product #{id}</p>
        <div className="bg-white rounded-lg p-5">
          <div className="flex flex-col">
            <label
              htmlFor="productTitle"
              className="inputLabel font-thin mb-2 text-[1rem] tracking-normal"
            >
              Product Title
            </label>
            <input
              type="text"
              name="productTitle"
              placeholder={data.name}
              defaultValue={data.name}
              className="inputStyle bg-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="productDescription"
              className="inputLabel my-2 text-[1rem] font-thin tracking-normal"
            >
              Product Description
            </label>
            <JoditEditor
              ref={editor}
              value={data.desc || ""} // Ensure content is always a string
              config={config}
              tabIndex={1}
              onBlur={(newContent) => {
                setContent(newContent || ""); // Ensure content is always a string
              }}
              onChange={(newContent) => {
                setContent(newContent || ""); // Ensure content is always a string
              }}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="inputLabel my-2 text-[1rem] font-thin tracking-normal"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              className="inputStyle bg-white"
              placeholder={data.price}
              defaultValue={data.price}
              required
            />
          </div>

          <div className="my-5">
            <Button
              onClick={handleOpen}
              variant="contained"
              className="bg-[blue] px-2 py-1 text-white"
            >
              Add Product Attribute
            </Button>
            <Modal open={open}>
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:w-fit bg-white border-2 shadow-lg p-4">
                <p className="font-oswald text-xl inputLabel">Edit Attribute</p>
                <div className="max-h-[20rem] flex flex-col flex-wrap overflow-auto scrollbar-thin my-2">
                  <div className="w-full bg-gray-200 p-2">
                    <div className="w-fit">
                      {rows.map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex flex-col lg:flex-row md:flex-row mb-2 gap-2"
                        >
                          <div>
                            <input
                              type="text"
                              name="attribute"
                              placeholder="Attribute"
                              value={row.attribute}
                              onChange={(e) => handleInputChange(e, rowIndex)}
                            />
                          </div>

                          <div>
                            {row.values.map((value, valueIndex) => (
                              <div
                                key={valueIndex}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="text"
                                  name={`value-${valueIndex}`}
                                  placeholder="Value"
                                  value={value}
                                  onChange={(e) =>
                                    handleInputChange(e, rowIndex, valueIndex)
                                  }
                                  style={{
                                    marginRight: "5px",
                                    marginBottom: "5px",
                                  }}
                                />
                                {valueIndex === row.values.length - 1 && (
                                  <button
                                    onClick={() => handleAddValue(rowIndex)}
                                  >
                                    <IoAddCircleOutline color="red" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={handleAddRow}
                        className="bg-[rgba(0,0,255,0.5)] px-2 py-1 text-white text-sm"
                      >
                        New Attribute
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-around">
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{ mt: 2 }}
                    className="bg-[blue] px-2 py-1 text-white"
                  >
                    Close
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    className="px-2 py-1 outline-double outline-[blue] outline-1"
                    onClick={handleSubmits}
                  >
                    Save
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="inputLabel mb-2 text-[1rem] font-thin tracking-normal"
            >
              Category
            </label>

            <select name="category" required>
              {categoryId.map((item, idx) => (
                <option value={item.Id} key={idx}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xl text-[rgba(0,0,255,0.50)]">Edit Images</p>
        <div className="bg-white rounded-lg p-5 flex flex-col h-fit">
          <div className="flex flex-wrap gap-2 mb-2">
            {productImages.length > 0 ? (
              <div className="flex flex-row gap-3 py-3 flex-wrap">
                {productImages.map((image) => (
                  <div key={image.id} className="relative">
                    <Image
                      src={image.src}
                      alt="Product"
                      width={100}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                    <RxCrossCircled
                      className="absolute top-1 right-1 cursor-pointer"
                      onClick={() => handleDeleteImage(image.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No images uploaded</p>
            )}
          </div>
          <ReactFileReader handleFiles={handleFiles}>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              type="button"
            >
              <FcAddImage className="inline" /> Add Images
            </button>
          </ReactFileReader>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="quantity"
            className="inputLabel mb-2 text-[1rem] font-thin tracking-normal"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            className="inputStyle bg-white"
            placeholder={data.quantity}
            defaultValue={data.quantity}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Update
        </button>
      </form>
    </div>
  );
}
