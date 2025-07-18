import axios from "axios";
import products from "../public/data/product.json";

// in /lib/FetchUser.js
export async function fetchAllUserIds() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/search`
  );
  const data = res.data;

  // Return lowercase `id` to match `[id]` route folder
  return data.map((user) => ({
    id: user.Id.toString(), // convert to string if using as route param
  }));
}
export async function fetchAllCategoryIds() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
  );
  const data = res.data;

  // Return lowercase `id` to match `[id]` route folder
  return data.map((user) => ({
    id: user.Id.toString(), // convert to string if using as route param
  }));
}

// Fetch products
const fetchProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching products:", error.message);
    throw new Error("Failed to fetch products");
  }
};

const fetchAllProductIds = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`
    );

    const products = res.data;
    console.log("Fetched products for static params:", products);

    // Filter and map valid products with Id
    return products
      .filter((product) => product && product.Id)
      .map((product) => ({
        id: product.Id.toString(),
      }));
  } catch (error) {
    console.log("Error fetching product IDs:", error.message);
    throw new Error("Failed to fetch product IDs");
  }
};
// Fetch product by ID
const fetchProductById = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search/${id}`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching product by ID:", error.message);
    throw new Error("Failed to fetch product by ID");
  }
};

// Fetch feature products
const fetchFeatureProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching feature products:", error.message);
    throw new Error("Failed to fetch feature products");
  }
};

export {
  fetchProducts,
  fetchAllProductIds,
  fetchProductById,
  fetchFeatureProducts,
};
