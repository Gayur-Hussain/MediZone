import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	address: null, // Store address in Redux
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAddress: (state, action) => {
			state.address = action.payload;
		},
	},
});

export const { setAddress } = userSlice.actions;
export default userSlice.reducer;
