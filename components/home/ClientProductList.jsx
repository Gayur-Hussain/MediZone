import React from "react";
import ClientProductCard from "./ClientProductCard";

const ClientProductList = ({ allProducts }) => {
	// Check if there are products
	if (allProducts?.length > 0) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-10">
				{allProducts.map((product) => (
					<ClientProductCard
						key={product.id || product._id}
						product={product}
					/>
				))}
			</div>
		);
	}

	// Display message if no products found
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen text-gray-500">
			<h1 className="text-lg font-semibold">No products found.</h1>
		</div>
	);
};

export default ClientProductList;
