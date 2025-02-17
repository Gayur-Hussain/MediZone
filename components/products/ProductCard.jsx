"use client";

import React, { useContext, useState } from "react";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "motion/react";

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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { removeImageAction } from "@/actions/imageRemove";
import { removeProductAction } from "@/actions/admin";
import { ProductContext } from "@/context";
import { initialNewProductFormControlsData } from "@/utils";

const ProductCard = ({ product, refetchProducts }) => {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const {
		setCurrentEditedId,
		setOpenDialog,
		setFormData,
		setImageKey,
		setImageUrl,
	} = useContext(ProductContext);

	async function handleDeleteProduct(id, imageKey) {
		setLoading(true);
		await removeImageAction(imageKey);
		const res = await removeProductAction(id, "/dashboard/products");

		if (!res.success) {
			toast({
				title: res.message,
				variant: "destructive",
			});
		}
		refetchProducts();
		toast({
			title: res.message,
			variant: "success",
		});
		setLoading(false);
	}

	async function handleClickChange(product) {
		setCurrentEditedId(product._id);
		setOpenDialog(true);
		setFormData({
			...initialNewProductFormControlsData,
			name: product?.name,
			description: product?.description,
			price: product?.price,
			stock: product?.stock,
			category: product?.category,
			companyName: product?.companyName,
			imageUrl: product?.imageUrl,
			imageKey: product?.imageKey,
		});
		setImageKey(product?.imageKey);
		setImageUrl(product?.imageUrl);
	}

	return (
		<Card className="overflow-hidden">
			<CardHeader>
				<div className="flex items-center justify-around">
					<Image
						className="h-24 w-20"
						src={product?.imageUrl}
						height={400}
						width={300}
						alt={product?.description}
					/>
					<CardTitle className="font-bold ">
						{product?.name}
					</CardTitle>
				</div>
			</CardHeader>

			<CardFooter>
				<div className="flex items-center w-full justify-around gap-4">
					<Drawer>
						<DrawerTrigger>
							<Button>Details</Button>
						</DrawerTrigger>
						<DrawerContent className="p-6">
							<div className="flex flex-col lg:flex-row gap-6">
								{/* Left Section: Image */}
								<div className="flex justify-center lg:w-1/2">
									<Image
										src={product.imageUrl}
										height={300}
										width={300}
										alt={product.name}
										className="rounded-lg shadow-lg"
									/>
								</div>

								{/* Right Section: Product Info */}
								<div className="flex flex-col lg:w-1/2 space-y-4">
									<DrawerHeader>
										<DrawerTitle className="text-xl md:text-3xl font-semibold">
											{product?.name}
										</DrawerTitle>
										<span className="text-2xl font-bold text-green-600">
											$ {product.price}
										</span>
									</DrawerHeader>

									<DrawerDescription>
										{product?.description}
									</DrawerDescription>

									<div className="flex flex-col md:flex-row gap-4 text-sm">
										<div>
											<span className="font-medium">
												Company:
											</span>{" "}
											<span className="text-green-600">
												{product.companyName}
											</span>
										</div>
										<div>
											<span className="font-medium">
												Stock:
											</span>{" "}
											<span className="text-violet-600">
												{product.stock}
											</span>
										</div>
										<div>
											<span className="font-medium">
												Category:
											</span>{" "}
											<span className="text-rose-600">
												{product.category}
											</span>
										</div>
									</div>
								</div>
							</div>

							<DrawerFooter className="mt-6 flex justify-end">
								<DrawerClose>
									<Button variant="secondary">Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
					<Pencil
						onClick={() => {
							handleClickChange(product);
						}}
						className="text-yellow-600"
					/>
					<div>
						{loading ? (
							<motion.ul
								animate={{ rotate: 360 }}
								transition={{
									repeat: Infinity,
									duration: 1.5,
									ease: "linear",
								}}
								className="w-5 h-5 border-4 border-dashed rounded-full "
							></motion.ul>
						) : (
							<>
								<AlertDialog>
									<AlertDialogTrigger>
										<Trash2 className="text-red-600" />
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone.
												This will permanently delete
												your product.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction>
												<Button
													onClick={() =>
														handleDeleteProduct(
															product?._id,
															product?.imageKey
														)
													}
												>
													Continue
												</Button>
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</>
						)}
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
