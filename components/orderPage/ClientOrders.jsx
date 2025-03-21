import { formatDate } from "@/utils/helperFunction";
import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ExternalLink, IndianRupee } from "lucide-react";
import Link from "next/link";

const ClientOrders = ({ orders }) => {
	// Function to set background color for Status based on order status
	const getStatusColor = (status) => {
		switch (status) {
			case "Completed":
				return "bg-green-100 text-green-700"; // Green background for Completed
			case "Pending":
				return "bg-yellow-100 text-yellow-700"; // Yellow background for Pending
			case "Cancelled":
				return "bg-red-100 text-red-700"; // Red background for Canceled
			default:
				return "bg-gray-100 text-gray-700"; // Default background color for unknown status
		}
	};

	if (orders.length <= 0) {
		return (
			<h1 className="lg:text-6xl text-center font-bold mt-36">
				No Order's Fond!
			</h1>
		);
	}

	return (
		<div className="px-4 lg:px-0">
			<div className="overflow-x-auto">
				<Table>
					<TableCaption>A list of your orders.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								Order Id
							</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="whitespace-nowrap">
								Method
							</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Order Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.length > 0
							? orders.map((order) => (
									<TableRow key={order._id}>
										<TableCell>
											{" "}
											<Link
												className="font-medium text-blue-500 cursor-pointer flex items-center gap-1"
												href={`/orders/${order?._id}`}
											>
												{order._id}
												<ExternalLink size={18} />
											</Link>
										</TableCell>
										<TableCell>
											<span
												className={`${getStatusColor(
													order.status
												)} py-1 px-4 rounded-md`}
											>
												{order.status}
											</span>
										</TableCell>
										<TableCell className="whitespace-nowrap">
											{order.paymentMethod}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center">
												<IndianRupee size={13} />
												<span>{order.totalAmount}</span>
											</div>
										</TableCell>
										<TableCell className="text-right whitespace-nowrap">
											<div className="flex items-center">
												<span>
													{formatDate(
														order.createdAt
													)}
												</span>
											</div>
										</TableCell>
									</TableRow>
							  ))
							: null}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ClientOrders;
