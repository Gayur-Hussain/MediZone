"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/actions/orderAction";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Clock, Settings, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/helperFunction";

export default function AdminOrders({ orders: initialOrders }) {
	const [orders, setOrders] = useState(initialOrders);
	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();
	const [selectedStatus, setSelectedStatus] = useState("All");

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

	// Define the status list based on dynamic data
	const statusList = [
		{
			name: "All",
			count: orders.length,
			icon: <Clock size={28} />,
			bgColor: "bg-gray-800 text-white",
		},
		{
			name: "Pending",
			count: getOrderCounts().Pending,
			icon: <Clock size={28} />,
			bgColor: "bg-yellow-500 text-white",
		},
		{
			name: "Processing",
			count: getOrderCounts().Processing,
			icon: <Settings size={28} />,
			bgColor: "bg-blue-500 text-white",
		},
		{
			name: "Completed",
			count: getOrderCounts().Completed,
			icon: <CheckCircle size={28} />,
			bgColor: "bg-green-500 text-white",
		},
		{
			name: "Cancelled",
			count: getOrderCounts().Cancelled,
			icon: <XCircle size={28} />,
			bgColor: "bg-red-500 text-white",
		},
	];

	return (
		<div>
			{/* Filter Buttons (Tabs) */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-5 gap-3">
				{statusList.map((status) => (
					<motion.button
						key={status.name}
						onClick={() => setSelectedStatus(status.name)}
						className={`p-3 flex items-center justify-center gap-2 rounded-lg transition-all text-center cursor-pointer ${
							selectedStatus === status.name
								? "shadow-lg"
								: "hover:shadow-md"
						} ${status.bgColor}`}
					>
						{status.icon}
						<h1 className="lg:text-lg font-bold">{status.name}</h1>
						<span className="lg:text-lg font-extrabold">
							{status.count}
						</span>
					</motion.button>
				))}
			</div>

			{/* Table */}
			<div className="overflow-x-auto mt-6">
				<div className="min-w-[800px]">
					{" "}
					{/* Added min-width to ensure proper width */}
					<Table className="table-auto w-full">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[150px]">
									Order ID
								</TableHead>
								<TableHead className="w-[120px]">
									Status
								</TableHead>
								<TableHead className="w-[200px]">
									User Email
								</TableHead>
								<TableHead className="hidden sm:table-cell w-[300px]">
									Delivery Address
								</TableHead>
								<TableHead className="hidden sm:table-cell w-[300px]">
									Order Date
								</TableHead>
								<TableHead className="w-[150px]">
									Action
								</TableHead>
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
									<TableCell
										className={
											"text-blue-600 cursor-pointer"
										}
									>
										<Link href={`/orders/${order._id}`}>
											{order._id}
										</Link>
									</TableCell>
									<TableCell>{order.status}</TableCell>
									<TableCell>{order.userId.email}</TableCell>
									<TableCell className="hidden sm:table-cell">
										{order.deliveryAddress.street},{" "}
										{order.deliveryAddress.city},
										{order.deliveryAddress.state},{" "}
										{order.deliveryAddress.zipCode},
										{order.deliveryAddress.country}
									</TableCell>
									<TableCell>
										{formatDate(order.createdAt)}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
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
													order.status ===
														"Completed" ||
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
														order.status ===
														"Pending"
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
		</div>
	);
}
