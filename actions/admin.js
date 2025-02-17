"use server";

import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

//Fetch all products
export async function fetchAllProductsAction() {
	try {
		await connectToDatabase();

		const result = await Product.find({});

		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log("Error during data fetching", error);
	}
}

// Add new product into database
export async function createNewProductAction(formData, pathToRevalidate) {
	const {
		name,
		description,
		price,
		stock,
		category,
		companyName,
		imageUrl,
		imageKey,
	} = formData;
	const product = {
		name,
		description,
		price,
		stock,
		category,
		companyName,
		imageUrl,
		imageKey,
	};

	try {
		await connectToDatabase();
		await Product.create(product);
		revalidatePath(pathToRevalidate);
		return { success: true, message: "Product Added Successfully!" };
	} catch (error) {
		return { success: false, message: "Error! Product not added." };
	}
}

// Remove product from database

export async function removeProductAction(id, pathToRevalidate) {
	try {
		await connectToDatabase();
		await Product.findOneAndDelete({ _id: id });
		revalidatePath(pathToRevalidate);
		return { success: true, message: "Product Deleted Successfully!" };
	} catch (error) {
		return { success: false, message: "Error deleting product!" };
	}
}

// Update product by id to database
export async function updateProductAction(id, formData, pathToRevalidate) {
	const {
		name,
		description,
		price,
		stock,
		category,
		companyName,
		imageUrl,
		imageKey,
	} = formData;
	try {
		await connectToDatabase();
		await Product.findOneAndUpdate(
			{ _id: id },
			{
				name,
				description,
				price,
				stock,
				companyName,
				imageUrl,
				imageKey,
				category,
			},
			{ new: true }
		);
		revalidatePath(pathToRevalidate);
		return {
			success: true,
			message: "Product Updated Successfully!",
		};
	} catch (error) {
		return { success: false, message: "Error during updating!" };
	}
}
