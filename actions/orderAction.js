"use server";

import mongoose from "mongoose";
import connectToDatabase from "@/lib/db";
import User from "@/models/UserModel";
import Order from "@/models/OrderModel";
import Product from "@/models/Product";

export const placeOrderAction = async (id, cart) => {
	try {
		await connectToDatabase();

		const user = await User.findById(id);
		if (!user) throw new Error("User not found");
		if (!cart || cart.length === 0) throw new Error("Cart is empty");

		const totalAmount = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);

		if (!user.address?.street || !user.address?.city) {
			throw new Error("User address is incomplete");
		}

		const newOrder = new Order({
			userId: user._id,
			products: cart.map((item) => ({
				productId: item._id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
			totalAmount,
			deliveryAddress: {
				street: user.address.street,
				city: user.address.city,
				state: user.address.state || "",
				zipCode: user.address.zipCode || "",
				country: user.address.country || "India",
			},
			status: "Pending",
			paymentMethod: "Cash on Delivery",
		});

		await newOrder.save();
		return { success: true, message: "Order placed successfully!" };
	} catch (error) {
		console.error("Order placement error:", error);
		return { success: false, message: error.message };
	}
};

export async function fetchOrdersAction() {
	try {
		await connectToDatabase();

		const orders = await Order.find()
			.populate("userId") // Populate user details
			.populate("products.productId") // Populate product details
			.lean() // Convert Mongoose models to plain objects
			.exec();

		return JSON.parse(JSON.stringify(orders));
	} catch (error) {
		console.error("Order fetching error:", error);
		return [];
	}
}

export async function updateOrderStatus(orderId, newStatus) {
	try {
		await connectToDatabase();

		// Find the order
		const order = await Order.findById(orderId);
		if (!order) return { success: false, message: "Order not found" };

		const previousStatus = order.status;
		order.status = newStatus;

		// Define stock updates based on status change
		const shouldReduceStock =
			newStatus === "Processing" && previousStatus !== "Processing";

		// Restore stock only if moving from "Processing" or "Completed" to "Cancelled" or "Pending"
		const shouldRestoreStock =
			(previousStatus === "Processing" ||
				previousStatus === "Completed") &&
			(newStatus === "Cancelled" || newStatus === "Pending");

		// Update stock accordingly
		if (shouldReduceStock) {
			for (const item of order.products) {
				const product = await Product.findById(item.productId);
				if (!product) continue;

				// Ensure enough stock
				if (product.stock < item.quantity) {
					return {
						success: false,
						message: `Insufficient stock for ${product.name}`,
					};
				}

				// Reduce stock
				product.stock -= item.quantity;
				await product.save();
			}
		} else if (shouldRestoreStock) {
			for (const item of order.products) {
				const product = await Product.findById(item.productId);
				if (!product) continue;

				// Restore stock
				product.stock += item.quantity;
				await product.save();
			}
		}

		await order.save();
		return { success: true };
	} catch (error) {
		console.error("Error updating order status:", error);
		return { success: false, message: error.message };
	}
}

export const fetchOrders = async () => {
	const res = await fetch("/api/orders"); // Adjust API endpoint if needed
	const data = await res.json();
	return data.orders;
};
