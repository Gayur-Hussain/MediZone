import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				name: String,
				price: Number,
				quantity: Number,
			},
		],
		totalAmount: { type: Number, required: true },
		deliveryAddress: { type: String, required: true },
		status: {
			type: String,
			enum: ["Pending", "Processing", "Out for Delivery", "Delivered"],
			default: "Pending",
		},
		paymentMethod: { type: String, default: "Cash on Delivery" },
	},
	{ timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
