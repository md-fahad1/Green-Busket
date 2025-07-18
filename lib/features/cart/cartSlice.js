// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isCartVisible: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.items.some(
        (item) => item.productId === action.payload.productId
      );

      if (isExist) {
        const product = state.items.find(
          (item) => item.productId === action.payload.productId
        );
        const count = product.count + 1;
        const totalPrice = product.price * count;
        // let attributes = {};

        // const keys = Object.keys(product.attributes);
        // const values = Object.values(product.attributes);

        // values.forEach((value, idx) => {
        //   const attKey = Object.keys(value);
        //   attributes = { ...attributes, [keys[idx]]: { [attKey]: count } };
        // });

        const updateProduct = {
          ...product,
          count: count,
          totalPrice: totalPrice,
          // attributes,
        };

        const remainingProduct = state.items.filter(
          (item) => item.productId !== action.payload.productId
        );

        return {
          ...state,
          items: [...remainingProduct, updateProduct],
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },

    addToCart: (state, action) => {
      // Ensure state.items is initialized
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      const isExist = state.items.some(
        (item) => item.productId === action.payload.productId
      );

      if (isExist) {
        const product = state.items.find(
          (item) => item.productId === action.payload.productId
        );
        const count = product.count + 1;
        const totalPrice = product.price * count;

        const updateProduct = {
          ...product,
          count: count,
          totalPrice: totalPrice,
        };

        const remainingProduct = state.items.filter(
          (item) => item.productId !== action.payload.productId
        );

        state.items = [...remainingProduct, updateProduct];
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      const remainingProduct = state.items.filter(
        (item) => item.productId !== action.payload
      );

      return {
        ...state,
        items: [...remainingProduct],
      };
    },
    cartCountIncrement: (state, action) => {
      const isExist = state.items.some(
        (item) => item.productId === action.payload
      );

      if (isExist) {
        const products = [...state.items];

        const product = products.find(
          (item) => item.productId === action.payload
        );

        const count = product.count + 1;
        const totalPrice = product.price * count;

        // let attributes = {};

        // const keys = Object.keys(product.attributes);
        // const values = Object.values(product.attributes);

        // values.forEach((value, idx) => {
        //   const attKey = Object.keys(value);
        //   attributes = { ...attributes, [keys[idx]]: { [attKey]: count } };
        // });

        const updateProduct = {
          ...product,
          count: count,
          totalPrice: totalPrice,
          // attributes,
        };

        const index = products.findIndex(
          (item) => item.productId === action.payload
        );

        products.splice(index, 1, {
          ...updateProduct,
        });

        return {
          ...state,
          items: [...products],
        };
      }
    },
    cartCountDecrement: (state, action) => {
      const isExist = state.items.some(
        (item) => item.productId === action.payload
      );

      if (isExist) {
        const products = [...state.items];

        const product = products.find(
          (item) => item.productId === action.payload
        );

        const count = product.count - 1;
        const totalPrice = product.price * count;

        // let attributes = {};

        // const keys = Object.keys(product.attributes);
        // const values = Object.values(product.attributes);

        // values.forEach((value, idx) => {
        //   const attKey = Object.keys(value);
        //   attributes = { ...attributes, [keys[idx]]: { [attKey]: count } };
        // });

        const updateProduct = {
          ...product,
          count: count,
          totalPrice: totalPrice,
          // attributes,
        };

        const index = products.findIndex(
          (item) => item.productId === action.payload
        );

        products.splice(index, 1, {
          ...updateProduct,
        });

        return {
          ...state,
          items: [...products],
        };
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.cartCount = 0;
    },
    cartVisible: (state, action) => {
      state.isCartVisible = action.payload;
    },
  },
});

export const {
  addToCart,
  cartVisible,
  removeFromCart,
  cartCountIncrement,
  cartCountDecrement,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   isCartVisible: false,
//   cartCount: 0,
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartCount: (state, action) => {
//       state.cartCount = action.payload;
//     },

//     cartVisible: (state, action) => {
//       state.isCartVisible = action.payload;
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.cartCount = 0;
//     },
//   },
// });

// export const {
//   cartVisible,

//   clearCart,
//   setCartCount,
//   setCartItems,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// cartSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   cartItems: [],
//   isCartVisible: false,
//   cartCount: 0,
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartCount: (state, action) => {
//       state.cartCount = action.payload;
//     },
//     setCartItems: (state, action) => {
//       state.cartItems = action.payload;
//       state.cartCount = action.payload.reduce(
//         (acc, item) => acc + item.quantity,
//         0
//       );
//     },
//     addToCart: (state, action) => {
//       const productIndex = state.items.findIndex(
//         (item) => item.productId === action.payload.productId
//       );

//       if (productIndex !== -1) {
//         const product = state.items[productIndex];
//         const count = product.count + 1;
//         const totalPrice = product.price * count;
//         let attributes = {};

//         Object.keys(product.attributes).forEach((key) => {
//           attributes[key] = { ...product.attributes[key], count };
//         });

//         state.items[productIndex] = {
//           ...product,
//           count,
//           totalPrice,
//           attributes,
//         };
//       } else {
//         state.items.push(action.payload);
//       }

//       // Update cart count
//       state.cartCount = state.items.reduce(
//         (total, item) => total + item.count,
//         0
//       );
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.productId !== action.payload
//       );

//       // Update cart count
//       state.cartCount = state.items.reduce(
//         (total, item) => total + item.count,
//         0
//       );
//     },

//     cartCountIncrement: (state, action) => {
//       const productIndex = state.items.findIndex(
//         (item) => item.productId === action.payload
//       );

//       if (productIndex !== -1) {
//         const product = state.items[productIndex];
//         const count = product.count + 1;
//         const totalPrice = product.price * count;
//         let attributes = {};

//         Object.keys(product.attributes).forEach((key) => {
//           attributes[key] = { ...product.attributes[key], count };
//         });

//         state.items[productIndex] = {
//           ...product,
//           count,
//           totalPrice,
//           attributes,
//         };
//       }

//       // Update cart count
//       state.cartCount = state.items.reduce(
//         (total, item) => total + item.count,
//         0
//       );
//     },

//     cartCountDecrement: (state, action) => {
//       const productIndex = state.items.findIndex(
//         (item) => item.productId === action.payload
//       );

//       if (productIndex !== -1 && state.items[productIndex].count > 1) {
//         const product = state.items[productIndex];
//         const count = product.count - 1;
//         const totalPrice = product.price * count;
//         let attributes = {};

//         Object.keys(product.attributes).forEach((key) => {
//           attributes[key] = { ...product.attributes[key], count };
//         });

//         state.items[productIndex] = {
//           ...product,
//           count,
//           totalPrice,
//           attributes,
//         };
//       }

//       // Update cart count
//       state.cartCount = state.items.reduce(
//         (total, item) => total + item.count,
//         0
//       );
//     },

//     cartVisible: (state, action) => {
//       state.isCartVisible = action.payload;
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.cartCount = 0;
//     },
//   },
// });

// export const {
//   addToCart,
//   cartVisible,
//   removeFromCart,
//   cartCountIncrement,
//   cartCountDecrement,
//   clearCart,
//   setCartCount,
//   setCartItems,
// } = cartSlice.actions;

// export default cartSlice.reducer;
