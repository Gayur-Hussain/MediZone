"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import SpecificOrderDetails from "@/components/orderPage/SpecificOrderDetails";

// Assuming you already have a function for fetching data
async function fetchSpecificUserOrder(orderId) {
	const response = await fetch(`/api/orders/${orderId}`);
	if (!response.ok) {
		throw new Error("Failed to fetch order details");
	}
	const data = await response.json();
	return data;
}

const OrderDetails = ({ params }) => {
	const [order, setOrder] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true); // New state to track loading

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { details: orderId } = await params; // Destructure orderId from params

				const response = await fetchSpecificUserOrder(orderId); // Fetch order data

				if (response?.success) {
					// console.log("Fetched Order Data:", response.data);
					setOrder(response.data); // Set the order data
				} else {
					setError("No data found for this order.");
				}
			} catch (err) {
				console.error("Error fetching order:", err);
				setError(
					"Error loading order details. Please try again later."
				);
			} finally {
				setLoading(false); // Set loading to false once the data is fetched or failed
			}
		};

		fetchData(); // Fetch the data when the component is mounted
	}, [params]); // Dependency array ensures the data fetch is triggered on params change

	// Show loading message with motion animation
	if (loading) {
		return (
			<motion.div
				className="loading-container"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div>Loading...</div>
			</motion.div>
		);
	}

	// Show error if any error occurs with motion animation
	if (error) {
		return (
			<motion.div
				className="error-container"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div>{error}</div>
			</motion.div>
		);
	}

	// Render the fetched order details once available with motion animation
	return (
		<motion.div
			className="px-4 mt-24 lg:px-28"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<SpecificOrderDetails order={order} />
		</motion.div>
	);
};

export default OrderDetails;
