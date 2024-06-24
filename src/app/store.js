import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import contactReducer from "../features/contact/contactSlice";
import colorSlice from "../features/color/colorSlice";
import categorySlice from "../features/category/categorySlice";
import brandSlice from "../features/brand/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    contact: contactReducer,
    color: colorSlice,
    category: categorySlice,
    brand: brandSlice,
  },
});
