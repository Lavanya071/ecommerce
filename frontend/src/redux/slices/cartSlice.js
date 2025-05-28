import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartQuantity: 0,
    cartProducts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartQuantity += 1;
      const productToAdd = action.payload;

      const existingProduct = state.cartProducts.find(
        (item) => item.id === productToAdd.id
      );

      if (!existingProduct) {
        state.cartProducts.push({ ...productToAdd, indQuantity: 1 });
      } else {
        existingProduct.indQuantity += 1;
      }
    },

    removeOneFromCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartProducts.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        if (existingProduct.indQuantity > 1) {
          existingProduct.indQuantity -= 1;
          state.cartQuantity -= 1;
        }
      }
    },

    deleteFromCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartProducts.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        state.cartQuantity -= existingProduct.indQuantity;
        state.cartProducts = state.cartProducts.filter(
          (item) => item.id !== product.id
        );
      }
    },

    // ✅ NEW: Set full cart (used on login/signup)
    setCart: (state, action) => {
      state.cartProducts = action.payload.cartProducts || [];
      state.cartQuantity = action.payload.cartQuantity || 0;
    },
  },
});

export const action = cartSlice.actions;
export default cartSlice;
