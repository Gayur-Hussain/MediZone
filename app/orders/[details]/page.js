// Assuming this is a server action to fetch the order
import { fetchSpecificUserOrder } from "@/actions/userOrders";
import SpecificOrderDetails from "@/components/orderPage/SpecificOrderDetails";

const OrderDetails = async ({ params }) => {
	try {
		const { details: orderId } = params;

		// Log orderId to confirm it’s being passed correctly
		console.log("Order ID:", orderId);

		// Fetch the order data using the server action
		const response = await fetchSpecificUserOrder(orderId);

		// Log the response to check if data is being returned correctly
		console.log("Fetched Order Data:", response?.data);

		if (!response?.data) {
			throw new Error("No data found for this order.");
		}

		return (
			<div className="px-4 mt-24 lg:px-28">
				<SpecificOrderDetails order={response?.data} />
			</div>
		);
	} catch (error) {
		// Catch any errors that happen in the try block
		console.error("Error fetching order:", error);

		return (
			<div className="px-4 mt-24 lg:px-28">
				<h1>Error loading order details. Please try again later.</h1>
			</div>
		);
	}
};

export default OrderDetails;
