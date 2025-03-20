import { fetchSpecificUserOrder } from "@/actions/userOrders";
import SpecificOrderDetails from "@/components/orderPage/SpecificOrderDetails";

const OrderDetails = async ({ params }) => {
	// Destructure the orderId from params.details
	const { details: orderId } = params;

	// Fetch order data using the orderId
	const response = await fetchSpecificUserOrder(orderId);

	// Optionally log the response data to check if it's correct
	console.log(response?.data);

	return (
		<div className="px-4 mt-24 lg:px-28">
			<SpecificOrderDetails order={response?.data} />
		</div>
	);
};

export default OrderDetails;
