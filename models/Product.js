import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: String,
	price: { type: Number, required: true },
	stock: { type: Number, required: true },
	category: String,
	companyName: String,
	imageUrl: String,
	imageKey: String,
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
	mongoose.model("Product", productSchema);
