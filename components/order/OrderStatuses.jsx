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
			icon: <CheckCircle size={28} />,
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
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
			{statusList.map((status, index) => (
				<div
					key={index}
					className={`border h-28 flex flex-col justify-center items-center rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${status.bgColor}`}
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
