"use client";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/store/slices/productSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
	},
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
