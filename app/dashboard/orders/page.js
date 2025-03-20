// src/pages/orders.js or src/components/admin/Orders.js
import AdminOrders from "@/components/admin/AdminOrders";
import OrderStatuses from "@/components/order/OrderStatuses";
import { fetchOrdersAction } from "@/actions/orderAction"; // Assuming this fetches your orders data

export default async function Orders() {
	// Fetch orders once
	const orders = await fetchOrdersAction();

	if (!orders || orders.length === 0) {
		return <p className="text-center mt-10">No orders found.</p>;
	}

	// Calculate order counts based on the fetched orders
	const orderCounts = {
		Pending: orders.filter((order) => order.status === "Pending").length,
		Processing: orders.filter((order) => order.status === "Processing")
			.length,
		Completed: orders.filter((order) => order.status === "Completed")
			.length,
		Cancelled: orders.filter((order) => order.status === "Cancelled")
			.length,
	};

	return (
		<div className="md:ml-[250px] p-4">
			<h1 className="text-2xl font-semibold mb-4">Orders Management</h1>

			{/* Pass fetched orders to AdminOrders */}
			<AdminOrders orders={orders} />
		</div>
	);
}
