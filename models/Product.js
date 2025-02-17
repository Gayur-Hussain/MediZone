import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: String,
	stock: String,
	category: String,
	companyName: String,
	imageUrl: String,
	imageKey: String,
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
	mongoose.model("Product", productSchema);
