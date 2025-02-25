import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

export async function GET() {
	try {
		await connectToDatabase(); // Connect to the database

		const orders = await Order.find()
			.populate("userId") // Populate user details
			.populate("products.productId") // Populate product details
			.limit(1)
			.exec();

		return NextResponse.json(
			{ success: true, data: orders },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Order fetching error:", error);
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 500 }
		);
	}
}
