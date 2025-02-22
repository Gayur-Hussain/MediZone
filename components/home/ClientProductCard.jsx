"use client";

import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { IndianRupee } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";

const ClientProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.cart);

	// Check if the product exists in the cart
	const isExists = items.some((item) => item._id === product._id);

	function handleAddToCart(product) {
		dispatch(addToCart(product));
	}

	function handleRemoveFromCart(product) {
		dispatch(removeFromCart(product._id));
	}

	return (
		<Card className="overflow-hidden shadow-lg rounded-lg">
			<CardHeader>
				<div className="flex flex-col items-center">
					{/* Product Image */}
					<Image
						className="h-40 w-36 object-cover rounded-md"
						src={product?.imageUrl}
						height={400}
						width={300}
						alt={product?.description || "Product image"}
					/>
				</div>
			</CardHeader>

			<CardFooter>
				<div className="flex flex-col items-start gap-4">
					{/* Product Name */}
					<CardTitle className="mt-3 text-2xl font-bold text-left">
						{product?.name}
					</CardTitle>
					{/* Price */}
					<span className="flex items-center justify-center text-xl font-semibold text-green-600">
						<span>
							<IndianRupee size={18} />
						</span>
						<span>{product?.price}</span>
					</span>

					{/* Details Button */}
					<Drawer>
						<DrawerTrigger>
							<Button className="text-sm">View Details</Button>
						</DrawerTrigger>
						<DrawerContent className="p-6">
							{/* Drawer Content */}
							<div className="flex flex-col lg:flex-row gap-6">
								{/* Product Image */}
								<div className="flex justify-center lg:w-1/2">
									<Image
										src={product.imageUrl}
										height={300}
										width={300}
										alt={product.name}
										className="rounded-lg shadow-md"
									/>
								</div>

								{/* Product Info */}
								<div className="flex flex-col lg:w-1/2 space-y-4">
									<DrawerHeader>
										<DrawerTitle className="text-2xl font-bold">
											{product?.name}
										</DrawerTitle>
										<span className="flex items-center text-xl font-semibold text-green-600">
											<span>
												<IndianRupee size={18} />
											</span>
											<span>{product?.price}</span>
										</span>
									</DrawerHeader>

									<DrawerDescription className="text-gray-600">
										{product?.description}
									</DrawerDescription>

									{/* Additional Product Info */}
									<div className="flex flex-col gap-2 text-sm">
										<div>
											<span className="font-medium">
												Company:
											</span>{" "}
											<span className="text-green-600">
												{product?.companyName}
											</span>
										</div>
										<div>
											<span className="font-medium">
												Stock:
											</span>{" "}
											<span className="text-violet-600">
												{product?.stock}
											</span>
										</div>
										<div>
											<span className="font-medium">
												Category:
											</span>{" "}
											<span className="text-rose-600">
												{product?.category}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Drawer Footer */}
							<DrawerFooter className="mt-6 flex justify-end">
								<DrawerClose>
									<Button variant="secondary">Close</Button>
								</DrawerClose>
								<div className="flex justify-center items-center">
									<Button
										onClick={() =>
											isExists
												? handleRemoveFromCart(product)
												: handleAddToCart(product)
										}
										className="w-full sm:w-auto"
									>
										{isExists
											? "Remove From Cart"
											: "Add To Cart"}
									</Button>
								</div>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ClientProductCard;
