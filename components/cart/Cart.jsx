"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateCartQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
	const { items } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const router = useRouter();
	const { toast } = useToast();

	// Handle quantity changes with stock validation
	const handleQuantityChange = (_id, quantity, stock) => {
		const newQuantity = Math.max(1, Math.min(quantity, stock)); // Ensure within stock
		dispatch(updateCartQuantity({ _id, quantity: newQuantity, stock }));
	};

	// Handle item removal with a ShadCN toast notification
	const handleRemoveItem = (_id) => {
		dispatch(removeFromCart(_id));
		toast({
			title: "Item Removed",
			description: "The item was successfully removed from your cart.",
			variant: "destructive",
		});
	};

	// Calculate total price
	const totalPrice = items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<Card className="p-4 sm:p-6 shadow-lg w-full max-w-5xl mx-auto mt-24">
			<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-center">
				Your Cart
			</h1>

			{items.length === 0 ? (
				<div className="text-center">
					<p className="text-lg text-gray-500 mb-4">
						Your cart is empty.
					</p>
					<Button onClick={() => router.push("/")}>
						Continue Shopping
					</Button>
				</div>
			) : (
				<div className="overflow-x-auto">
					<Table className="w-full min-w-[600px]">
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>Image</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{items.map((item) => (
								<TableRow key={item._id}>
									<TableCell className="font-medium">
										{item.name}
									</TableCell>
									<TableCell>
										<img
											src={item.imageUrl}
											alt={item.name}
											className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
										/>
									</TableCell>
									<TableCell>₹{item.price}</TableCell>
									<TableCell>
										<Input
											type="number"
											value={item.quantity}
											min={1}
											max={item.stock} // Ensures UI also prevents exceeding stock
											className="w-12 sm:w-16"
											onChange={(e) =>
												handleQuantityChange(
													item._id,
													parseInt(e.target.value),
													item.stock
												)
											}
										/>
										{item.quantity >= item.stock && (
											<p className="text-red-500 text-sm">
												Max stock reached
											</p>
										)}
									</TableCell>
									<TableCell>
										₹{item.price * item.quantity}
									</TableCell>
									<TableCell>
										<Button
											variant="destructive"
											size="sm"
											onClick={() =>
												handleRemoveItem(item._id)
											}
										>
											Remove
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}

			{items.length > 0 && (
				<CardContent className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-lg sm:text-xl font-bold">
						Total: ₹{totalPrice}
					</p>
					<Button
						onClick={() => router.push("/checkout")}
						className="px-6 py-3 w-full sm:w-auto"
					>
						Proceed to Checkout
					</Button>
				</CardContent>
			)}
		</Card>
	);
};

export default Cart;
