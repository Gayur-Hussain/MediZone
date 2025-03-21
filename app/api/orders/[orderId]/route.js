import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const { orderId } = await params; // Get the orderId from the URL (dynamic segment)

	try {
		// Connect to the database
		await connectToDatabase();

		// Find the order by its ID and populate related data
		const response = await Order.findById(orderId)
			.populate("products.productId")
			.exec();

		if (!response) {
			return NextResponse.json(
				{
					success: false,
					message: "Order not found!",
				},
				{ status: 404 }
			);
		}

		// Return the order details as JSON
		return NextResponse.json({
			success: true,
			message: "Data found!",
			data: response,
		});
	} catch (error) {
		console.log("Error fetching specific order details", error);
		return NextResponse.json(
			{
				success: false,
				message: "Error occurred fetching order details!",
			},
			{ status: 500 }
		);
	}
}
