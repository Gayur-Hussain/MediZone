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
		},
		{
			name: "Processing",
			count: orderCounts.Processing,
			icon: <Settings size={28} />,
		},
		{
			name: "Completed",
			count: orderCounts.Completed,
			icon: <CheckCircle size={28} />,
		},
		{
			name: "Cancelled",
			count: orderCounts.Cancelled,
			icon: <XCircle size={28} />,
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
			{statusList.map((status, index) => (
				<div
					key={index}
					className="border h-28 flex flex-col justify-center items-center rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
				>
					{status.icon}
					<h1 className="text-lg font-bold mt-2">{status.name}</h1>
					<span className="text-2xl font-extrabold">
						{status.count}
					</span>
				</div>
			))}
		</div>
	);
};

export default OrderStatuses;
