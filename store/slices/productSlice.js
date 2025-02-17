import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productsApi = createAsyncThunk(
	"/api/products",
	async (
		{ search = "", category = "", page = 1, limit = 10 },
		{ rejectWithValue }
	) => {
		try {
			const params = new URLSearchParams({
				search,
				category,
				page,
				limit,
			});

			const response = await fetch(`/api/products?${params}`);
			const data = await response.json();

			if (!response.ok) throw new Error(data.error);

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: {
		data: [],
		loading: false,
		error: null,
		currentPage: 1,
		totalPages: 0,
		totalItems: 0,
		search: "",
		category: "",
	},
	reducers: {
		setSearch: (state, action) => {
			state.search = action.payload;
		},
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(productsApi.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(productsApi.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload.data;
				state.currentPage = action.payload.page;
				state.totalPages = action.payload.totalPages;
				state.totalItems = action.payload.totalItems;
			})
			.addCase(productsApi.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setSearch, setCategory, setPage } = productsSlice.actions;
export default productsSlice.reducer;
