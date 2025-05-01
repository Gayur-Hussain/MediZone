import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/OrderModel";

export const GET = async () => {
	try {
		await connectToDatabase();
		const result = await Order.find({});
		if (!result) return;
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: "Could not found orders",
		});
	}
};
