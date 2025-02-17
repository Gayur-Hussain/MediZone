import React from "react";

// The fetch function remains the same
const fetchSpecificProduct = async (id) => {
	try {
		const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
		if (!apiResponse.ok) {
			throw new Error("Failed to fetch product");
		}
		return await apiResponse.json();
	} catch (error) {
		throw new Error(error.message);
	}
};

// Server Component in Next.js
const ProductDetails = async ({ params }) => {
	const paramsDetails = await params;

	const product = await fetchSpecificProduct(paramsDetails?.details);

	// Handling case where no product is found
	if (!product) {
		return <div>Product not found</div>;
	}

	// Return JSX with the fetched data
	return <div className="ml-[240px]">{product?.title}</div>;
};

export default ProductDetails;
