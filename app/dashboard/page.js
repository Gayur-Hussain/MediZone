import React from "react";
import { auth } from "@clerk/nextjs";
const Dashboard = () => {
	const { userId } = auth();
	return (
		<div>
			<h1>User ID: {userId}</h1>
		</div>
	);
};

export default Dashboard;
