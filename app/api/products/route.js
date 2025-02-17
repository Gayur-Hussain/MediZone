import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req) {
	try {
		// Connect to the database
		await connectToDatabase();

		// Extract query parameters from the request URL
		const { searchParams } = new URL(req.url);
		const search = searchParams.get("search") || "";
		const category = searchParams.get("category") || "";
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);

		// Build the filter object
		const filter = {};

		// Add search filter
		if (search) {
			filter.$or = [
				{ name: { $regex: search, $options: "i" } }, // Case-insensitive regex for `name`
			];
		}

		// Add category filter (case-insensitive)
		if (category) {
			filter.category = { $regex: category, $options: "i" }; // Case-insensitive regex for `category`
		}

		// Pagination options
		const skip = (page - 1) * limit;

		// Get total matching documents
		const total = await Product.countDocuments(filter);

		// Get paginated data
		const products = await Product.find(filter).skip(skip).limit(limit);

		// Respond with the data
		return NextResponse.json({
			data: products,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			totalItems: total,
		});
	} catch (error) {
		// Handle unexpected errors
		return NextResponse.json(
			{ error: "Internal Server Error", details: error.message },
			{ status: 500 }
		);
	}
}
