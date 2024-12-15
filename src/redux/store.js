import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './slices/savedSlice';

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});

export default store;
