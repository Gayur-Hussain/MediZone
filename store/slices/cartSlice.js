const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	items: [], // Each item will have { _id, name, price, quantity, etc. }
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// Add item to cart or update its quantity if it already exists
		addToCart: (state, action) => {
			const existingItem = state.items.find(
				(item) => item._id === action.payload._id
			);
			if (existingItem) {
				existingItem.quantity += 1; // Increment quantity if item exists
			} else {
				state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
			}
		},
		// Remove item completely from cart
		removeFromCart: (state, action) => {
			state.items = state.items.filter(
				(item) => item._id !== action.payload
			);
		},
		// Update quantity of a specific item in the cart
		updateCartQuantity: (state, action) => {
			const { _id, quantity } = action.payload;
			const item = state.items.find((item) => item._id === _id);
			if (item) {
				item.quantity = quantity; // Update the quantity
				// Remove the item if quantity is reduced to 0
				if (item.quantity <= 0) {
					state.items = state.items.filter(
						(item) => item._id !== _id
					);
				}
			}
		},
	},
});

export const { addToCart, removeFromCart, updateCartQuantity } =
	cartSlice.actions;
export default cartSlice.reducer;
