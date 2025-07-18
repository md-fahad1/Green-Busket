"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/features/hooks";
const CategoryPage = ({ params }) => {
  const { id } = params;
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([Number(id)]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search/category/${id}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data);
        setFilteredProducts(data);
        setSelectedCategoryIds([Number(id)]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
        );
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!sortOrder || !Array.isArray(filteredProducts)) return;

    const sorted = [...filteredProducts].sort((a, b) =>
      sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  }, [sortOrder]);

  const handleCategoryChange = async (categoryId, checked) => {
    const updatedCategoryIds = checked
      ? [...selectedCategoryIds, categoryId]
      : selectedCategoryIds.filter((id) => id !== categoryId);

    setSelectedCategoryIds(updatedCategoryIds);
    setLoading(true);

    if (updatedCategoryIds.length === 0) {
      setFilteredProducts([]);
      setLoading(false);
      return;
    }

    try {
      const fetches = await Promise.all(
        updatedCategoryIds.map(async (catId) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search/category/${catId}`
          );
          const text = await res.text();
          const json = text ? JSON.parse(text) : [];
          return Array.isArray(json) ? json : [];
        })
      );

      const combinedProducts = fetches.flat();
      setFilteredProducts(combinedProducts);
    } catch (error) {
      console.error("Error fetching category products:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!product || !product.name) return;

    // 👉 Extract default attributes (you can adjust this logic)
    const defaultAttributes = product.json_attribute?.attributes || {};

    const selectedAttributes = {};

    // Pick one value from each attribute group as default (e.g., first non-zero)
    Object.entries(defaultAttributes).forEach(([key, options]) => {
      const selectedOption = Object.entries(options).find(
        ([_, count]) => count > 0
      );
      if (selectedOption) {
        selectedAttributes[key] = {
          [selectedOption[0]]: selectedOption[1],
        };
      }
    });

    const cartInfo = {
      name: product.name,
      image: product.image,
      productId: product.Id,
      price: product.price,
      count: 1,
      attributes: selectedAttributes, // ✅ include attributes
    };

    dispatch(addToCart(cartInfo));

    Swal.fire({
      icon: "success",
      title: "Added to cart",
      text: `${product.name} has been added to your cart!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <section>
      <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 p-4 bg-gray-100 border rounded-md shadow-md h-auto md:h-screen overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Sort by</h3>
          <div className="mb-6 space-y-2">
            {["lowToHigh", "highToLow"].map((order) => (
              <label key={order} className="block text-sm">
                <input
                  type="radio"
                  name="sort"
                  value={order}
                  checked={sortOrder === order}
                  onChange={() => setSortOrder(order)}
                  className="mr-2"
                />
                {order === "lowToHigh"
                  ? "Price - Low to High"
                  : "Price - High to Low"}
              </label>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map(({ Id, name }) => (
              <label key={Id} className="block text-sm">
                <input
                  type="checkbox"
                  value={Id}
                  checked={selectedCategoryIds.includes(Id)}
                  onChange={(e) => handleCategoryChange(Id, e.target.checked)}
                  className="mr-2"
                />
                {name}
              </label>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Search Results:{" "}
            {Array.isArray(filteredProducts) ? filteredProducts.length : 0}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </h3>

          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : Array.isArray(filteredProducts) &&
            filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="relative border bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {product.offer && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-br-md">
                      {product.offer}% OFF
                    </div>
                  )}
                  <div className="p-4 flex justify-center items-center bg-gray-100">
                    <Image
                      src={
                        product.image[0]?.startsWith("http")
                          ? product.image[0]
                          : `https://farseit.com/Upload/ProductImage/${product.image[0]
                              .split("/")
                              .pop()}`
                      }
                      width={250}
                      height={250}
                      className="w-auto h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={product.name}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="leading-tight text-center capitalize truncate text-normal font-roboto font-medium">
                      {product.name}
                    </h2>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="flex justify-center gap-1 text-xs font-lato md:text-base">
                          <span className="mr-0.5">৳</span>
                          {new Intl.NumberFormat().format(product.price)}
                        </p>
                      </div>
                      {/* <span className="flex items-center rounded text-sm gap-1 px-1 bg-[#E1EFE0] text-dash-primary">
                        <span>{product.rating ? product.rating : 0}</span>
                        <IoIosStar />
                      </span> */}
                    </div>
                    <div className="flex justify-center gap-2 w-full">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 w-full max-w-[200px] rounded-md border border-dash-primary text-[10px] capitalize text-[#192a56] font-semibold text-center py-1 md:px-1.5 md:text-[11px] transition-all duration-300 hover:bg-dash-primary hover:text-white"
                      >
                        Add to Cart
                      </button>
                      <Link
                        href={`/checkout?productId=${product.Id}`}
                        className="flex-1 w-full max-w-[200px] rounded-md bg-dash-primary text-[10px] capitalize text-white text-center font-semibold py-1 md:px-1.5 md:text-[11px] transition-all duration-300 hover:bg-[#0056b3]"
                        onClick={() => handleAddToCart(product)}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default CategoryPage;

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";

// const CategoryPage = ({ params }) => {
//   const { id } = params; // Extract `id` from the `params` prop
//   console.log("CategoryPage params:", id);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([1]);
//   const [sortOrder, setSortOrder] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search/category/${id}`
//         );
//         console.log("proudct ", res.data);
//         setProducts(res.data || []);
//         setFilteredProducts(res.data || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [id]);

//   // Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
//         );
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Sort Products
//   const handleSortChange = (order) => {
//     setSortOrder(order);
//     let sortedProducts = [...filteredProducts];
//     sortedProducts.sort((a, b) =>
//       order === "lowToHigh" ? a.price - b.price : b.price - a.price
//     );
//     setFilteredProducts(sortedProducts);
//   };

//   // Handle Category Filter Change
//   const handleCategoryChange = async (categoryId, checked) => {
//     const updatedCategories = checked
//       ? [...selectedCategories, categoryId]
//       : selectedCategories.filter((id) => id !== categoryId);
//     setSelectedCategories(updatedCategories);

//     if (updatedCategories.length === 0) {
//       setFilteredProducts(products);
//       return;
//     }

//     try {
//       const fetchPromises = updatedCategories.map((id) =>
//         fetch(
//           `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/searchByCategory/${id}`
//         ).then(async (res) => {
//           if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//           const text = await res.text();
//           return text ? JSON.parse(text) : [];
//         })
//       );
//       const results = await Promise.all(fetchPromises);
//       setFilteredProducts(results.flat());
//     } catch (error) {
//       console.error("Error fetching category products:", error);
//     }
//   };

//   return (
//     <section>
//       <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <aside className="w-full md:w-64 p-4 bg-gray-100 border rounded-md shadow-md h-auto md:h-screen overflow-auto">
//           <h3 className="text-lg font-semibold mb-4">Sort by</h3>
//           <div className="mb-6 space-y-2">
//             {["lowToHigh", "highToLow"].map((order) => (
//               <label key={order} className="block text-sm">
//                 <input
//                   type="radio"
//                   name="sort"
//                   value={order}
//                   checked={sortOrder === order}
//                   onChange={() => handleSortChange(order)}
//                   className="mr-2"
//                 />
//                 {order === "lowToHigh"
//                   ? "Price - Low to High"
//                   : "Price - High to Low"}
//               </label>
//             ))}
//           </div>

//           <h3 className="text-lg font-semibold mb-4">Categories</h3>
//           <div className="space-y-2">
//             {categories.map(({ Id, name }) => (
//               <label key={Id} className="block text-sm">
//                 <input
//                   type="checkbox"
//                   name="category"
//                   value={name}
//                   checked={selectedCategories.includes(Id)}
//                   onChange={(e) => handleCategoryChange(Id, e.target.checked)}
//                   className="mr-2"
//                 />
//                 {name}
//               </label>
//             ))}
//           </div>
//         </aside>

//         {/* Product List */}
//         <main className="flex-1 p-6">
//           <h3 className="text-xl font-semibold mb-4 text-center">
//             Search Results: {filteredProducts.length}{" "}
//             {filteredProducts.length === 1 ? "product" : "products"}
//           </h3>

//           {loading ? (
//             <p className="text-center text-gray-600">Loading products...</p>
//           ) : filteredProducts.length === 0 ? (
//             <p className="text-center text-gray-600">No products found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {filteredProducts.map((product, index) => (
//                 <div
//                   key={index}
//                   className="relative border bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col justify-between"
//                 >
//                   {/* Offer Badge */}
//                   {product.offer && (
//                     <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-br-md">
//                       {product.offer}% OFF
//                     </div>
//                   )}

//                   {/* Product Image */}
//                   <div className="p-4 flex justify-center items-center bg-gray-100">
//                     <Image
//                       src={
//                         product.image[0]?.startsWith("http")
//                           ? product.image[0]
//                           : `https://farseit.com/Upload/ProductImage/${product.image[0]
//                               .split("/")
//                               .pop()}`
//                       }
//                       width={250}
//                       height={250}
//                       className="w-auto h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                       alt={product.name}
//                       loading={index === 0 ? "eager" : "lazy"}
//                       priority={index === 0}
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="p-4 text-center">
//                     <h2 className="font-medium text-lg truncate">
//                       {product.name}
//                     </h2>
//                     <p className="text-blue-700 text-sm font-bold mb-4">
//                       ৳ {new Intl.NumberFormat().format(product.price)}
//                     </p>

//                     {/* Buttons */}
//                     <div className="flex justify-center gap-2 w-full">
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         className="flex-1 w-full max-w-[200px] rounded-md border border-blue-600 text-blue-600 text-xs font-semibold text-center py-1 transition-all duration-300 hover:bg-blue-600 hover:text-white"
//                       >
//                         Add to Cart
//                       </button>
//                       <Link
//                         href="/checkout"
//                         className="flex-1 w-full max-w-[200px] rounded-md bg-blue-600 text-white text-xs font-semibold text-center py-1 transition-all duration-300 hover:bg-blue-700"
//                       >
//                         Buy Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </section>
//   );
// };

// export default CategoryPage;
