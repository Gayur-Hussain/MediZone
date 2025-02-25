"use client";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/store/slices/productSlice";
import cartReducer from "@/store/slices/cartSlice";
import userReducer from "@/store/slices/userSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		user: userReducer,
	},
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
