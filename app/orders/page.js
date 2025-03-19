import { fetchUserDetailsAction } from "@/actions/userAction";
import { fetchUserOrdersAction } from "@/actions/userOrders";
import ClientOrders from "@/components/orderPage/ClientOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
	// User id from clerk
	const { userId } = await auth();

	// User Details from the database
	const userDetails = await fetchUserDetailsAction(userId);

	// Redirect if user role is admin
	userDetails?.data?.role === "admin" ? redirect("dashboard/products") : null;

	// Fetch all user orders
	const userOrders = await fetchUserOrdersAction(userDetails?.data?._id);
	const Orders = userOrders?.data?.reverse();
	// console.log(Orders);

	return (
		<div className="mt-20 lg:mt-0 lg:p-28">
			<h1 className="px-4 lg:px-0 mb-5 text-2xl font-bold">My Orders</h1>
			<ClientOrders orders={Orders} />
		</div>
	);
};

export default OrdersPage;
