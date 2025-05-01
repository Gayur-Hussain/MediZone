// /app/api/stats/top-selling/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

export const GET = async () => {
	await connectToDatabase();

	const pipeline = [
		{ $unwind: "$products" },
		{
			$group: {
				_id: "$products.productId",
				name: { $first: "$products.name" },
				totalSold: { $sum: "$products.quantity" },
			},
		},
		{ $sort: { totalSold: -1 } },
		{ $limit: 5 }, // 👈 Return top 5 products
	];

	const result = await Order.aggregate(pipeline);
	return NextResponse.json(result);
};
