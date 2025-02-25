const { createSlice } = require("@reduxjs/toolkit");

// Load cart from localStorage safely
const loadCartFromLocalStorage = () => {
	if (typeof window === "undefined") return []; // Prevent errors during SSR
	try {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	} catch (error) {
		console.error("Error loading cart from localStorage:", error);
		return [];
	}
};

// Save cart to localStorage safely
const saveCartToLocalStorage = (cartItems) => {
	if (typeof window === "undefined") return; // Prevent errors during SSR
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
				// Ensure the new quantity does not exceed stock
				existingItem.quantity = Math.min(
					existingItem.quantity + 1,
					action.payload.stock
				);
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			saveCartToLocalStorage([...state.items]); // Save updated cart to localStorage
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(
				(item) => item._id !== action.payload
			);
			saveCartToLocalStorage([...state.items]); // Save after removal
		},
		updateCartQuantity: (state, action) => {
			const { _id, quantity, stock } = action.payload;
			const item = state.items.find((item) => item._id === _id);
			if (item) {
				item.quantity = Math.max(1, Math.min(quantity, stock)); // Ensure quantity is within stock limits
			}
			saveCartToLocalStorage([...state.items]); // Save updated cart to localStorage
		},
		clearCart: (state) => {
			state.items = [];
			saveCartToLocalStorage([]); // Save cleared cart to localStorage
		},
	},
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
