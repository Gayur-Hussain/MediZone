import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUserDetailsAction } from "@/actions/userAction";
const CheckOutPage = async () => {
	const { userId } = await auth();
	const userDetails = await fetchUserDetailsAction(userId);
	userDetails?.data?.role === "admin"
		? redirect("/dashboard/products")
		: null;
	return <div>CheckOutPage</div>;
};

export default CheckOutPage;
