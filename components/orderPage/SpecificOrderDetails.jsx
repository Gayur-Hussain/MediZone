import Image from "next/image";
import React from "react";

const SpecificOrderDetails = ({ order }) => {
	// Function to return a color class based on the order status
	const getStatusClass = (status) => {
		switch (status) {
			case "Pending":
				return "text-yellow-500"; // Yellow for pending
			case "Processing":
				return "text-blue-500"; // Blue for processing
			case "Completed":
				return "text-green-500"; // Green for completed
			case "Cancelled":
				return "text-red-500"; // Red for cancelled
			default:
				return "text-gray-500"; // Default for unknown status
		}
	};

	return (
		<div className="max-w-screen-xl mx-auto  mb-10">
			{/* Order Overview */}
			<div className="border-b pb-4 mb-6 ">
				<h1 className="text-xl lg:text-3xl font-bold ">
					Order Overview
				</h1>
				<div className="space-y-2 mt-4 lg:flex lg:items-center lg:gap-10">
					<p className="mt-2">
						<strong>Order ID:</strong>{" "}
						<span className="text-blue-400">{order?._id}</span>
					</p>
					<p>
						<strong>Order Date:</strong>{" "}
						{new Date(order?.createdAt).toLocaleDateString()}
					</p>
					<p>
						<strong>Status:</strong>{" "}
						<span className={getStatusClass(order?.status)}>
							{order?.status.charAt(0).toUpperCase() +
								order?.status.slice(1)}
						</span>
					</p>
					<p className="flex items-center gap-2">
						<strong>Total Amount:</strong>
						<span className="text-blue-500">
							{order?.totalAmount}
						</span>
					</p>
					<p className="flex items-center gap-2">
						<strong>Products:</strong>
						<span className="text-blue-500">
							{order?.products.length}
						</span>
					</p>
					{order?.tracking && (
						<p>
							<strong>Tracking Number:</strong>{" "}
							{order?.tracking?.number}
						</p>
					)}
				</div>
			</div>

			{/* Products Section */}
			<h1 className="text-xl lg:text-3xl font-bold mb-6">Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{order?.products?.map((product) => (
					<div
						key={product._id}
						className="border p-4 flex flex-col items-center justify-between rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<div className="w-full flex justify-center mb-4">
							<Image
								src={product?.productId?.imageUrl}
								width={150}
								height={180}
								alt={product?.name}
								className="object-contain w-auto h-auto"
								priority
							/>
						</div>
						<h2 className="text-lg font-semibold ">
							{product.name}
						</h2>
						<p className="text-sm  mt-2">
							Price:{" "}
							<span className="text-green-400">
								{product.price}
							</span>
						</p>
						<p className="text-sm ">
							Items:{" "}
							<span className="text-blue-400">
								{product.quantity}
							</span>
						</p>
					</div>
				))}
			</div>

			{/* Additional Information */}
			<div className="mt-8">
				<h2 className="text-lg font-bold">Shipping Information</h2>
				<div className="space-y-2 mt-4">
					<p>
						<strong>Shipping Address: </strong>"{" "}
						{order?.deliveryAddress?.street},{" "}
						{order?.deliveryAddress?.city},{" "}
						{order?.deliveryAddress?.state},{" "}
						{order?.deliveryAddress?.zipCode},{" "}
						{order?.deliveryAddress?.country}"
					</p>
					<p>
						<strong>
							Shipping Method:{" "}
							<span className="text-sm">Local delivery</span>
						</strong>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SpecificOrderDetails;
