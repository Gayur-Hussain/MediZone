// src/pages/orders.js or src/components/admin/Orders.js
import AdminOrders from "@/components/admin/AdminOrders";
import { fetchOrdersAction } from "@/actions/orderAction";

export default async function Orders() {
	const orders = await fetchOrdersAction();

	if (!orders || orders.length === 0) {
		return <p className="text-center mt-10">No orders found.</p>;
	}

	return (
		<div className="lg:ml-[250px] mt-10 lg:mt-0 p-4">
			{/* Constrain the width of the parent container */}
			<div className="w-full max-w-full overflow-hidden">
				<h1 className="text-2xl font-semibold mb-4">
					Orders Management
				</h1>

				{/* Pass fetched orders to AdminOrders */}
				<AdminOrders orders={orders} />
			</div>
		</div>
	);
}
