// src/components/order/OrderStatuses.js
import React from "react";
import { Clock, Settings, CheckCircle, XCircle } from "lucide-react";

const OrderStatuses = ({ orderCounts }) => {
	// Define the status list based on the dynamic data passed
	const statusList = [
		{
			name: "Pending",
			count: orderCounts.Pending,
			icon: <Clock size={28} />,
			bgColor: "bg-yellow-100 text-yellow-700", // Light yellow background with dark yellow text
		},
		{
			name: "Processing",
			count: orderCounts.Processing,
			icon: <Settings size={28} />,
			bgColor: "bg-blue-100 text-blue-700", // Light blue background with dark blue text
		},
		{
			name: "Completed",
			count: orderCounts.Completed,
			icon: <CheckCircle size={28} className="text-sm" />,
			bgColor: "bg-green-100 text-green-700", // Light green background with dark green text
		},
		{
			name: "Cancelled",
			count: orderCounts.Cancelled,
			icon: <XCircle size={28} />,
			bgColor: "bg-red-100 text-red-700", // Light red background with dark red text
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-3 ">
			{statusList.map((status, index) => (
				<div
					key={index}
					className={`border p-2 flex  justify-center items-center gap-3  rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${status.bgColor}`}
				>
					{status.icon}
					<h1 className="lg:text-lg font-bold">{status.name}</h1>
					<span className="lg:text-2xl font-extrabold">
						{status.count}
					</span>
				</div>
			))}
		</div>
	);
};

export default OrderStatuses;
