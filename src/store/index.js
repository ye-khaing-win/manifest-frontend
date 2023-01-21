import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './userInterface/searchSlice';
import manifestSlice from './reader/manifestSlice';
import hsCodeSlice from './code/hsCodeSlice';
import commoditySlice from './code/commoditySlice';
import toastSlice from './userInterface/toastSlice';
import shipCodeSlice from './code/shipCodeSlice';

const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    search: searchSlice.reducer,
    hsCode: hsCodeSlice.reducer,
    commodity: commoditySlice.reducer,
    shipCode: shipCodeSlice.reducer,
    manifest: manifestSlice.reducer,
  },
});

export default store;
