"use server";

import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/OrderModel";

export async function fetchLatestProducts() {
	try {
		await connectToDatabase();
		const result = await Product.find({});
		return {
			success: true,
			data: JSON.parse(JSON.stringify(result)),
		};
	} catch (error) {
		return {
			success: false,
			message: true,
		};
	}
}
