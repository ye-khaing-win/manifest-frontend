import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    items: [],
  },

  reducers: {
    add(state, action) {
      const toast = action.payload;
      state.items.push(toast);
    },

    remove(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const toastActions = toastSlice.actions;

export default toastSlice;
