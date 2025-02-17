"use client";

import ProductsList from "../ProductsList";
import SearchAndCategory from "./SearchAndCategory";
import AddNewProduct from "./AddNewProduct";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	productsApi,
	setSearch,
	setCategory,
	setPage,
} from "@/store/slices/productSlice";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

const Products = () => {
	const dispatch = useDispatch();
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
		// Clear the timeout if there's an existing one
		const debounceTimeout = setTimeout(() => {
			dispatch(productsApi({ search, category, page: currentPage }));
		}, 400); // Delay of 500ms

		// Cleanup the timeout if dependencies change before the timeout completes
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

	// Function to refetch products after add or update
	const refetchProducts = () => {
		dispatch(productsApi({ search, category, page: currentPage }));
	};

	return (
		<div className="md:ml-[250px] pt-5">
			<div className="flex items-center justify-between gap-4 mb-5">
				<h1 className="text-2xl sm:text-3xl font-bold">
					Manage Products
				</h1>
				<AddNewProduct
					refetchProducts={refetchProducts} // Pass refetch function as a prop
				/>
			</div>
			<hr />
			<div className="mt-5 flex gap-2 justify-between">
				{/* Pass dispatch actions to SearchAndCategory */}
				<SearchAndCategory
					setSearch={(search) => dispatch(setSearch(search))}
					setCategory={(category) => dispatch(setCategory(category))}
				/>
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
			) : (
				<>
					{/* Render the product list */}
					<ProductsList
						allProducts={products}
						refetchProducts={refetchProducts}
					/>

					{/* Pagination controls */}
					<div className="flex items-center justify-center md:justify-start mt-10 gap-4 ">
						<Button
							className={`px-4 py-2 border rounded-md ${
								currentPage === 1 ? "cursor-not-allowed " : ""
							}`}
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
						>
							Previous
						</Button>
						<span className="text-gray-600">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							className={`px-4 py-2 border rounded-md ${
								currentPage === totalPages
									? "cursor-not-allowed "
									: ""
							}`}
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default Products;
