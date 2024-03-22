import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api'
import cartReducer from "../redux/cartSlice";

export default configureStore({
  reducer: { 
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
}
  );