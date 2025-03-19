"use server";

import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

export async function fetchUserOrdersAction(userId) {
	try {
		await connectToDatabase();
		const result = await Order.find({ userId });
		if (!result) {
			return {
				success: false,
				message: "No Orders Found!",
			};
		}
		return {
			success: true,
			data: JSON.parse(JSON.stringify(result)),
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Error during fetch client orders",
		};
	}
}

export async function fetchSpecificUserOrder(orderId) {
	try {
		await connectToDatabase();
		const result = await Order.findById(orderId);
		if (!result) {
			return {
				success: false,
				message: "No Order Found With This orderId",
			};
		}
		return {
			success: true,
			data: JSON.parse(JSON.stringify(result)),
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Error during fetch client specific orders details",
		};
	}
}
