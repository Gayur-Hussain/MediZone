"use server";

import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

export async function getProductStats() {
	try {
		await connectToDatabase();

		const data = await Order.aggregate([
			{ $unwind: "$products" },
			{
				$group: {
					_id: "$products.name",
					totalQuantity: { $sum: "$products.quantity" },
				},
			},
			{ $sort: { totalQuantity: -1 } },
		]);

		// Format for Recharts (BarChart expects array of objects with consistent keys)
		return data.map((item) => ({
			product: item._id,
			quantity: item.totalQuantity,
		}));
	} catch (error) {
		console.error("Error aggregating product stats:", error);
		return [];
	}
}
