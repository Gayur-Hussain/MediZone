import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
				name: { type: String, required: true },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
			},
		],
		totalAmount: { type: Number, required: true },
		deliveryAddress: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: false },
			zipCode: { type: String, required: false },
			country: { type: String, default: "India" },
		}, // ✅ Must be an object, not a string!
		status: { type: String, default: "Pending" },
		paymentMethod: { type: String, required: true },
	},
	{ timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
