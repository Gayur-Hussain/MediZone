"use client";
import React from "react";
import ProductCard from "./products/ProductCard";
import { Rabbit } from "lucide-react";

const ProductsList = ({ allProducts, refetchProducts }) => {
	if (allProducts?.length > 0) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 pt-10">
				{allProducts.map((product) => (
					<ProductCard
						key={product.id || product._id}
						product={product}
						refetchProducts={refetchProducts}
					/>
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center w-full h-screen text-gray-500">
			<Rabbit className="w-16 h-16 mb-4 text-gray-400" />
			<h1 className="text-lg font-semibold">No products found.</h1>
		</div>
	);
};

export default ProductsList;
