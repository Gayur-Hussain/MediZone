"use client";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/store/slices/productSlice";
import cartReducer from "@/store/slices/cartSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
	},
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
