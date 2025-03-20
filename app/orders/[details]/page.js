import { fetchSpecificUserOrder } from "@/actions/userOrders";
import SpecificOrderDetails from "@/components/orderPage/SpecificOrderDetails";
import React from "react";

const OrderDetails = async ({ params }) => {
	const { details: orderId } = await params;
	const response = await fetchSpecificUserOrder(orderId);
	console.log(response?.data);
	return (
		<div className="px-4 mt-24 lg:px-28">
			<h1>Params {orderId}</h1>
			<SpecificOrderDetails order={response?.data} />
		</div>
	);
};

export default OrderDetails;
