import { fetchSpecificUserOrder } from "@/actions/userOrders";
import React from "react";

const OrderDetails = async ({ params }) => {
	const response = await fetchSpecificUserOrder(params?.details);
	// console.log(response?.data);
	return <div className="px-4 mt-24 lg:px-28">{response?.data?.status}</div>;
};

export default OrderDetails;
