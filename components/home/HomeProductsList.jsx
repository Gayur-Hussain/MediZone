"use client";

import React, { useEffect } from "react";
import SearchAndCategory from "../products/SearchAndCategory";
import { useSelector, useDispatch } from "react-redux";
import { Rabbit } from "lucide-react";
import {
	productsApi,
	setSearch,
	setCategory,
	setPage,
} from "@/store/slices/productSlice";

import { Loader } from "lucide-react";
import ClientProductList from "./ClientProductList";

const HomeProductsList = () => {
	const dispatch = useDispatch();

	// Extract the relevant state from the Redux store
	const {
		data: products,
		loading,
		error,
		currentPage,
		totalPages,
		search,
		category,
	} = useSelector((state) => state.products);

	// Fetch products when parameters change
	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			dispatch(productsApi({ search, category, page: currentPage }));
		}, 400); // Delay of 400ms

		// Cleanup the timeout on dependency change
		return () => clearTimeout(debounceTimeout);
	}, [dispatch, search, category, currentPage]);

	// Handle page changes
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			dispatch(setPage(currentPage - 1));
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setPage(currentPage + 1));
		}
	};

	return (
		<div className="mb-10">
			<div className="mt-8 md:mt-0">
				<h1 className="text-2xl md:text-3xl font-extrabold mb-3">
					Products
				</h1>
				{/* Pass dispatch actions to SearchAndCategory */}
				<SearchAndCategory
					setSearch={(search) => dispatch(setSearch(search))}
					setCategory={(category) => dispatch(setCategory(category))}
				/>
				<hr className="mt-4" />
			</div>

			{/* Show loading spinner */}
			{loading ? (
				<div className="flex items-center justify-center h-64">
					<Loader className="w-10 h-10 animate-spin text-gray-500" />
				</div>
			) : error ? (
				<div className="text-center text-red-500">
					<h1>Failed to load products. Please try again.</h1>
				</div>
			) : products.length === 0 ? (
				<div className="flex items-center justify-center flex-col text-gray-500 mt-10">
					<Rabbit size={100} />
					<h1>No products found.</h1>
				</div>
			) : (
				<>
					{/* Render the product list */}
					<ClientProductList allProducts={products} />

					{/* Pagination controls only if there are multiple pages */}
					{totalPages > 1 && (
						<div className="flex items-center justify-center md:justify-start mt-10 gap-4">
							<button
								className={`px-4 py-2 border rounded-md ${
									currentPage === 1
										? "cursor-not-allowed"
										: ""
								}`}
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
							>
								Previous
							</button>
							<span className="text-gray-600">
								Page {currentPage} of {totalPages}
							</span>
							<button
								className={`px-4 py-2 border rounded-md ${
									currentPage === totalPages
										? "cursor-not-allowed"
										: ""
								}`}
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default HomeProductsList;
