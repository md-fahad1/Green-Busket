"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem } from "@mui/material";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import PdImgUploader from "@/components/Dashboard/Product/PdImgUploader";
import AddProductAttribute from "@/components/Dashboard/Product/AddProductAttribute";
import AddProductDesc from "@/components/Dashboard/Product/AddProductDesc";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState({});
  const [images, setImages] = useState([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    quantity: "",
    images: "",
  });
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
        );

        setCategories(res.data);
      } catch (error) {
        console.log("category fetch failed");
      }
    };

    fetchCategory();
  }, []);

  const onChange = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
    setFormError({
      ...formError,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newFormError = { ...formError };

    if (productInfo.name.trim() === "") {
      newFormError.name = "Product name field is required";
      isValid = false;
    }
    if (description.trim() === "") {
      newFormError.description = "Product description field is required";
      isValid = false;
    } else {
      newFormError.description = "";
    }
    if (productInfo.price.trim() === "") {
      newFormError.price = "Product price field is required";
      isValid = false;
    }
    if (productInfo.quantity.trim() === "") {
      newFormError.quantity = "Product quantity field is required";
      isValid = false;
    }
    if (!productInfo.categoryId) {
      newFormError.categoryId = "Product category select is required";
      isValid = false;
    }

    if (!images.length) {
      newFormError.images = "Product image field is required";
      isValid = false;
    }

    const formData = new FormData();
    formData.append("name", productInfo.name);
    formData.append("desc", description);
    formData.append("price", productInfo.price);
    // formData.append("json_atribute", JSON.stringify({ attributes }));
    formData.append("json_attribute", JSON.stringify({ attributes }));
    formData.append("categoryId", productInfo.categoryId);
    formData.append("quantity", productInfo.quantity);
    formData.append("date", new Date().toISOString());
    images.forEach((image) => {
      formData.append("ProductPicture", image.file);
    });

    if (isValid) {
      setFormError({});
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 201) {
          window.scrollTo(0, 0);
          setAlert(true);
          setProductInfo({
            name: "",
            price: "",
            quantity: "",
            categoryId: "",
          });
          setDescription("");
          setAttributes("");
          setImages([]);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setFormError(newFormError);
    }
  };

  return (
    <div className="w-[95%] md:w-full mx-auto ">
      {alert && (
        <Alert
          className="mb-3"
          severity="success"
          onClose={() => {
            setAlert(false);
          }}
        >
          Product Added Successfully
        </Alert>
      )}
      <h2 className="text-xl font-bold text-secondary">Add Product</h2>
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
              Product Title<span className="text-red-500 select-none"> *</span>
            </label>
            <TextField
              fullWidth
              size="small"
              value={productInfo.name}
              name="name"
              onChange={onChange}
            />
            {formError.name && (
              <span className="text-red-500">{formError.name}</span>
            )}
          </div>
          <div className="">
            <label className="mb-1">
              Product Description
              <span className="text-red-500 select-none"> *</span>
            </label>
            <AddProductDesc
              description={description}
              setDescription={setDescription}
              error={formError}
              setFormError={setFormError}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-between ">
            <div className="flex-1">
              <label className="mb-1 ">
                Price<span className="text-red-500 select-none"> *</span>
              </label>
              <TextField
                id="fullWidth"
                fullWidth
                size="small"
                onChange={onChange}
                name="price"
                value={productInfo.price}
                required
              />
              {formError.price && (
                <span className="text-red-500">{formError.price}</span>
              )}
            </div>

            <div className="flex-1">
              <label className="mb-1 ">
                Quantity<span className="text-red-500 select-none"> *</span>
              </label>
              <TextField
                id="fullWidth"
                fullWidth
                size="small"
                onChange={onChange}
                name="quantity"
                value={productInfo.quantity}
                required
              />
              {formError.quantity && (
                <span className="text-red-500">{formError.quantity}</span>
              )}
            </div>
            <div className="flex-1">
              <label className="mb-1 ">
                Category<span className="text-red-500 select-none"> *</span>
              </label>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue={"Choose Category"}
                size="small"
                fullWidth
                onChange={onChange}
                name="categoryId"
              >
                <MenuItem value="Choose Category" disabled>
                  Choose Category
                </MenuItem>
                {categories.map((option) => (
                  <MenuItem key={option.Id} value={option.Id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              {formError.categoryId && (
                <span className="text-red-500">{formError.categoryId}</span>
              )}
            </div>
          </div>
          {/* dynamic attribute  */}
          <AddProductAttribute
            setAttributes={setAttributes}
            quantity={productInfo.quantity}
          />
          <div>
            {/* image uploader */}
            <PdImgUploader
              images={images}
              setImages={setImages}
              error={formError}
              setFormError={setFormError}
            />
            {formError.images && (
              <span className="text-red-500">{formError.images}</span>
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

export default Page;
export const dynamic = "force-dynamic";
