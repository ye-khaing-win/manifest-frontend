import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchedValue: '',
    placeholder: 'Search',
  },

  reducers: {
    search(state, action) {
      state.searchedValue = action.payload;
    },

    setPlaceholder(state, action) {
      state.placeholder = action.payload;
    },

    clear(state) {
      state.searchedValue = '';
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
