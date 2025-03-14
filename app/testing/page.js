import { fetchLatestProducts } from "@/actions/testing";
import React from "react";

const page = async () => {
	const response = await fetchLatestProducts();
	const sortedAndLastFive = response?.data?.slice(-8).reverse();
	console.log(sortedAndLastFive);

	return (
		<div>
			{sortedAndLastFive.map((item) => (
				<h1 key={item._id}>{item.name}</h1>
			))}
		</div>
	);
};

export default page;
