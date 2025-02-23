const { createSlice } = require("@reduxjs/toolkit");

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
	try {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	} catch (error) {
		console.error("Error loading cart from localStorage:", error);
		return [];
	}
};

// Save cart to localStorage
const saveCartToLocalStorage = (cartItems) => {
	try {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	} catch (error) {
		console.error("Error saving cart to localStorage:", error);
	}
};

// Initial State
const initialState = {
	items: loadCartFromLocalStorage(), // Load cart from localStorage
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.items.find(
				(item) => item._id === action.payload._id
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			saveCartToLocalStorage(state.items); // Save updated cart to localStorage
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(
				(item) => item._id !== action.payload
			);
			saveCartToLocalStorage(state.items);
		},
		updateCartQuantity: (state, action) => {
			const { _id, quantity } = action.payload;
			const item = state.items.find((item) => item._id === _id);
			if (item) {
				item.quantity = quantity;
				if (item.quantity <= 0) {
					state.items = state.items.filter(
						(item) => item._id !== _id
					);
				}
			}
			saveCartToLocalStorage(state.items);
		},
		clearCart: (state) => {
			state.items = [];
			saveCartToLocalStorage(state.items);
		},
	},
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
