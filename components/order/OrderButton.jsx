"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart } from "@/store/slices/cartSlice";
import { placeOrderAction } from "@/actions/orderAction";
import { useAuth } from "@clerk/nextjs";
import { fetchUserDetailsAction } from "@/actions/userAction";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const OrderButton = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cartItems = useSelector((state) => state.cart.items);
	const [loading, setLoading] = useState(false);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const { userId } = useAuth();
	const { toast } = useToast();

	const handlePlaceOrder = async () => {
		if (cartItems.length === 0) {
			toast({
				variant: "destructive",
				title: "Cart is empty",
				description:
					"Please add some products to your cart before placing an order.",
			});
			return;
		}

		setLoading(true);

		try {
			// Fetch user details
			const userDetails = await fetchUserDetailsAction(userId);
			const _id = userDetails?.data?._id; // Extract user _id properly

			if (!_id) throw new Error("User details not found");

			// Pass cart items to the order action
			const response = await placeOrderAction(_id, cartItems);

			if (response.success) {
				dispatch(clearCart()); // Clear Redux cart after successful order
				setOrderPlaced(true);
				toast({
					title: "Order placed!",
					description: "Your order has been placed successfully.",
				});
				setTimeout(() => {
					router.push("/orders"); // Redirect to home page
				}, 2000);
			} else {
				toast({
					variant: "destructive",
					title: "Order Failed",
					description: response.message,
				});
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message || "Something went wrong!",
			});
		}

		setLoading(false);
	};

	// Hide the button if the order is placed
	if (orderPlaced || cartItems.length === 0) return null;

	return (
		<div>
			<button
				onClick={handlePlaceOrder}
				disabled={loading}
				className="bg-blue-600 text-white px-4 py-2 rounded"
			>
				{loading ? "Placing Order..." : "Place Order"}
			</button>
		</div>
	);
};

export default OrderButton;
