"use server";

import connectToDatabase from "@/lib/db";
import User from "@/models/UserModel";
import Order from "@/models/OrderModel";

export const placeOrderAction = async (id, cart) => {
	try {
		// Ensure DB is connected
		await connectToDatabase();

		// Get user from DB
		const user = await User.findById(id);
		if (!user) throw new Error("User not found");

		// Validate cart
		if (!cart || cart.length === 0) throw new Error("Cart is empty");

		// Calculate total amount
		const totalAmount = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);

		// Create an order
		const newOrder = new Order({
			userId: user._id,
			products: cart.map((item) => ({
				productId: item._id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
			totalAmount,
			deliveryAddress: user.address, // Fetch from DB
			status: "Pending",
			paymentMethod: "Cash on Delivery",
		});

		// Save the order
		await newOrder.save();

		return { success: true, message: "Order placed successfully!" };
	} catch (error) {
		console.error("Order placement error:", error);
		return { success: false, message: error.message };
	}
};

// Fetch orders
export async function fetchOrdersAction() {
	try {
		await connectToDatabase(); // Ensure DB connection

		const orders = await Order.find()
			.populate("userId") // Populate user details
			.populate("products.productId") // Populate product details
			.limit(1) // Apply limit before executing
			.exec(); // Execute query

		return { success: true, data: orders };
	} catch (error) {
		console.error("Order fetching error:", error);
		return { success: false, message: error.message };
	}
}
