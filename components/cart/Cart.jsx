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

const Cart = () => {
	const { items } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleQuantityChange = (itemId, quantity) => {
		if (quantity >= 1) {
			dispatch(updateCartQuantity({ itemId, quantity }));
		}
	};

	const handleRemoveItem = (itemId) => {
		dispatch(removeFromCart(itemId));
	};

	return (
		<Card className="p-6 shadow-lg">
			<h1 className="text-3xl lg:text-4xl font-extrabold mb-6">
				Your Cart
			</h1>

			{items.length === 0 ? (
				<p className="text-lg text-gray-500">Your cart is empty.</p>
			) : (
				<Table className="w-full">
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
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
								<TableCell>₹{item.price}</TableCell>
								<TableCell>
									<Input
										type="number"
										value={item.quantity}
										min={1}
										className="w-16"
										onChange={(e) =>
											handleQuantityChange(
												item._id,
												parseInt(e.target.value)
											)
										}
									/>
								</TableCell>
								<TableCell>
									₹{item.price * item.quantity}
								</TableCell>
								<TableCell>
									<Button
										variant="destructive"
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
			)}

			{items.length > 0 && (
				<CardContent className="mt-6 flex justify-between items-center">
					<p className="text-xl font-bold">
						Total: ₹
						{items.reduce(
							(total, item) => total + item.price * item.quantity,
							0
						)}
					</p>
					<Button
						onClick={() => router.push("/checkout")}
						className="px-6 py-3"
					>
						Proceed to Checkout
					</Button>
				</CardContent>
			)}
		</Card>
	);
};

export default Cart;
