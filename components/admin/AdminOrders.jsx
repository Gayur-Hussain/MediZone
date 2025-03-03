"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/actions/orderAction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminOrders({ orders: initialOrders }) {
	const [orders, setOrders] = useState(initialOrders);
	const [expandedOrder, setExpandedOrder] = useState(null);
	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();
	const [selectedStatus, setSelectedStatus] = useState("All");
	const router = useRouter();

	const filteredOrders = orders.filter(
		(order) => selectedStatus === "All" || order.status === selectedStatus
	);

	const toggleOrderDetails = (orderId) => {
		setExpandedOrder(expandedOrder === orderId ? null : orderId);
	};

	const handleStatusUpdate = async (
		orderId,
		currentStatus,
		newStatus,
		products
	) => {
		if (currentStatus === newStatus) return;

		startTransition(async () => {
			const response = await updateOrderStatus(
				orderId,
				newStatus,
				products
			);

			if (response.success) {
				setOrders((prevOrders) =>
					prevOrders.map((order) =>
						order._id === orderId
							? { ...order, status: newStatus }
							: order
					)
				);
				toast({
					title: "Order Updated",
					description: `Status changed to ${newStatus}.`,
				});
			} else {
				toast({
					variant: "destructive",
					title: "Update failed",
					description: response.message,
				});
			}
		});
	};

	return (
		<div className="p-4">
			<div className="flex justify-between items-center w-full mb-6">
				<h1 className="text-2xl font-semibold">Admin Orders</h1>
			</div>

			<div className="mb-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				{["All", "Pending", "Processing", "Completed", "Cancelled"].map(
					(status) => (
						<motion.button
							key={status}
							onClick={() => setSelectedStatus(status)}
							className={`p-2 rounded-lg transition-all ${
								selectedStatus === status
									? "bg-gray-200 dark:bg-gray-800"
									: "bg-gray-100 dark:bg-gray-700"
							}`}
						>
							{status}
						</motion.button>
					)
				)}
			</div>

			<ul className="space-y-4">
				{filteredOrders.map((order) => (
					<motion.li
						key={order._id}
						className="border rounded-lg p-4 shadow-md"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div
							className="cursor-pointer flex justify-between items-center"
							onClick={() => toggleOrderDetails(order._id)}
						>
							<div>
								<p className="font-semibold">
									<strong>Order ID:</strong> {order._id}
								</p>
								<p>
									<strong>Status:</strong> {order.status}
								</p>
								<p>
									<strong>User Email:</strong>{" "}
									{order.userId.email}
								</p>
								<p>
									<strong>Delivery Address:</strong>{" "}
									{order.deliveryAddress.street},{" "}
									{order.deliveryAddress.city}
								</p>
							</div>
							<span className="text-lg">
								{expandedOrder === order._id ? "▲" : "▼"}
							</span>
						</div>

						{expandedOrder === order._id && (
							<motion.div
								className="mt-2 p-4 rounded-md"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4 }}
							>
								<p>
									<strong>Total Amount:</strong> ₹
									{order.totalAmount}
								</p>
								<p>
									<strong>Payment:</strong>{" "}
									{order.paymentMethod}
								</p>
								<h3 className="mt-2 font-semibold">
									Products:
								</h3>
								<ul>
									{order.products.map((product) => (
										<li
											key={product.productId}
											className="text-sm"
										>
											{product.name} (x{product.quantity})
											- ₹{product.price}
										</li>
									))}
								</ul>

								<div className="mt-4">
									<label className="block font-semibold">
										Update Status:
									</label>
									<select
										className="border p-2 rounded-md w-full"
										value={order.status}
										onChange={(e) =>
											handleStatusUpdate(
												order._id,
												order.status,
												e.target.value,
												order.products
											)
										}
										disabled={
											isPending ||
											order.status === "Completed" ||
											order.status === "Cancelled"
										}
									>
										<option value="Pending">Pending</option>
										<option value="Processing">
											Processing
										</option>
										<option
											value="Completed"
											disabled={
												order.status === "Pending"
											}
										>
											Completed
										</option>
										<option value="Cancelled">
											Cancelled
										</option>
									</select>
								</div>
							</motion.div>
						)}
					</motion.li>
				))}
			</ul>
		</div>
	);
}
