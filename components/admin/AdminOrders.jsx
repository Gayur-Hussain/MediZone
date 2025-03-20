"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/actions/orderAction";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import OrderStatuses from "../order/OrderStatuses";

export default function AdminOrders({ orders: initialOrders }) {
	const [orders, setOrders] = useState(initialOrders);
	const [expandedOrder, setExpandedOrder] = useState(null);
	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();
	const [selectedStatus, setSelectedStatus] = useState("All");
	const router = useRouter();

	// Calculate the order counts based on the statuses
	const getOrderCounts = () => {
		const counts = {
			Pending: 0,
			Processing: 0,
			Completed: 0,
			Cancelled: 0,
		};

		orders.forEach((order) => {
			if (order.status === "Pending") counts.Pending++;
			if (order.status === "Processing") counts.Processing++;
			if (order.status === "Completed") counts.Completed++;
			if (order.status === "Cancelled") counts.Cancelled++;
		});

		return counts;
	};

	const filteredOrders = orders.filter(
		(order) => selectedStatus === "All" || order.status === selectedStatus
	);

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
		<div className="p-4 max-w-full">
			{/* Display the Order Status counts */}
			<OrderStatuses orderCounts={getOrderCounts()} />

			{/* Filter Buttons */}
			<div className="mb-4 flex flex-wrap gap-4">
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

			{/* Table */}
			<div className="overflow-x-auto">
				<Table className="min-w-full">
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>User Email</TableHead>
							<TableHead className="hidden sm:table-cell">
								Delivery Address
							</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredOrders.map((order) => (
							<motion.tr
								key={order._id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<TableCell>{order._id}</TableCell>
								<TableCell>{order.status}</TableCell>
								<TableCell>{order.userId.email}</TableCell>
								<TableCell className="hidden sm:table-cell">
									{order.deliveryAddress.street},{" "}
									{order.deliveryAddress.city}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										{/* Status Dropdown */}
										<select
											className="border p-2 rounded-md w-full sm:w-auto"
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
											<option value="Pending">
												Pending
											</option>
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
								</TableCell>
							</motion.tr>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
