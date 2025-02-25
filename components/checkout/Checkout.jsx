"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
	fetchUserAddressAction,
	updateUserAddressAction,
} from "@/actions/userAction";
import { useToast } from "@/hooks/use-toast";

const Checkout = ({ userId }) => {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(true);
	const [address, setAddress] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		const loadAddress = async () => {
			if (!userId) return;

			try {
				const userAddress = await fetchUserAddressAction(userId);
				if (userAddress) {
					setAddress(userAddress);
					reset(userAddress);
				}
			} catch (error) {
				console.error("Error fetching address:", error.message);
			} finally {
				setLoading(false);
			}
		};
		loadAddress();
	}, [userId, reset]);

	const onSubmit = async (data) => {
		if (!userId) {
			console.error("User ID is missing!");
			return;
		}

		try {
			const updatedAddress = await updateUserAddressAction(userId, data);
			if (!updatedAddress) {
				throw new Error(
					"No data returned from updateUserAddressAction"
				);
			}
			setAddress(updatedAddress);
			toast({ title: "Address Updated Successfully!" });
			setIsDialogOpen(false);
		} catch (error) {
			console.error("Failed to update address:", error);
			toast({
				title: "Failed to update address",
				description: error.message,
				variant: "destructive",
			});
		}
	};

	if (loading) return <p>Loading address...</p>;

	return (
		<Card className="p-4">
			<CardContent>
				<h2 className="text-xl font-bold mb-4">Checkout</h2>

				{address ? (
					/** ✅ Show saved address */
					<div className="mb-4 p-4 border rounded-lg">
						<p className="font-semibold">Shipping Address:</p>
						<p>
							{address.street}, {address.city}, {address.state},{" "}
							{address.zipCode}, {address.country}
						</p>
						<Dialog
							open={isDialogOpen}
							onOpenChange={setIsDialogOpen}
						>
							<DialogTrigger asChild>
								<Button className="mt-2">Edit Address</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Update Address</DialogTitle>
								</DialogHeader>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="grid gap-4"
								>
									<div>
										<Label htmlFor="street">
											Street Address
										</Label>
										<Input
											id="street"
											{...register("street", {
												required: "Street is required",
											})}
										/>
										{errors.street && (
											<p className="text-red-500 text-sm">
												{errors.street.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="city">City</Label>
										<Input
											id="city"
											{...register("city", {
												required: "City is required",
											})}
										/>
										{errors.city && (
											<p className="text-red-500 text-sm">
												{errors.city.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="state">State</Label>
										<Input
											id="state"
											{...register("state", {
												required: "State is required",
											})}
										/>
										{errors.state && (
											<p className="text-red-500 text-sm">
												{errors.state.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="zipCode">
											Zip Code
										</Label>
										<Input
											id="zipCode"
											type="number"
											{...register("zipCode", {
												required:
													"Zip code is required",
											})}
										/>
										{errors.zipCode && (
											<p className="text-red-500 text-sm">
												{errors.zipCode.message}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="country">Country</Label>
										<Input
											id="country"
											defaultValue="India"
											{...register("country", {
												required: "Country is required",
											})}
										/>
										{errors.country && (
											<p className="text-red-500 text-sm">
												{errors.country.message}
											</p>
										)}
									</div>
									<Button type="submit" className="w-full">
										Update Address
									</Button>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				) : (
					/** ❌ No address, show form to add */
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button>Add Address</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Address</DialogTitle>
							</DialogHeader>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="grid gap-4"
							>
								<div>
									<Label htmlFor="street">
										Street Address
									</Label>
									<Input
										id="street"
										{...register("street", {
											required: "Street is required",
										})}
									/>
									{errors.street && (
										<p className="text-red-500 text-sm">
											{errors.street.message}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="city">City</Label>
									<Input
										id="city"
										{...register("city", {
											required: "City is required",
										})}
									/>
									{errors.city && (
										<p className="text-red-500 text-sm">
											{errors.city.message}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="state">State</Label>
									<Input
										id="state"
										{...register("state", {
											required: "State is required",
										})}
									/>
									{errors.state && (
										<p className="text-red-500 text-sm">
											{errors.state.message}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="zipCode">Zip Code</Label>
									<Input
										id="zipCode"
										type="number"
										{...register("zipCode", {
											required: "Zip code is required",
										})}
									/>
									{errors.zipCode && (
										<p className="text-red-500 text-sm">
											{errors.zipCode.message}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="country">Country</Label>
									<Input
										id="country"
										defaultValue="India"
										{...register("country", {
											required: "Country is required",
										})}
									/>
									{errors.country && (
										<p className="text-red-500 text-sm">
											{errors.country.message}
										</p>
									)}
								</div>
								<Button type="submit" className="w-full">
									Save Address
								</Button>
							</form>
						</DialogContent>
					</Dialog>
				)}
			</CardContent>
		</Card>
	);
};

export default Checkout;
