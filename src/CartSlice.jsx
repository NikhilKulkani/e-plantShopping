import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(i => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
    },

    removeItem: (state, action) => {
      const name = action.payload;

      const item = state.items.find(i => i.name === name);

      if (item) {
        state.totalQuantity -= item.quantity;
      }

      state.items = state.items.filter(i => i.name !== name);
    },

    updateQuantity: (state, action) => {
      const { name, type } = action.payload;

      const item = state.items.find(i => i.name === name);

      if (!item) return;

      if (type === "increment") {
        item.quantity += 1;
        state.totalQuantity += 1;
      }

      if (type === "decrement") {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
