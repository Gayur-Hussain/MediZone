import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUserDetailsAction, saveUserToDB } from "@/actions/userAction";
import Checkout from "@/components/checkout/Checkout";
import OrderButton from "@/components/order/OrderButton";

const CheckOutPage = async () => {
	const { userId } = await auth();
	const userDetails = await fetchUserDetailsAction(userId);
	await saveUserToDB();
	userDetails?.data?.role === "admin"
		? redirect("/dashboard/products")
		: null;
	return (
		<div className="mt-24 md:px-28 flex flex-col  items-center gap-10">
			<h1 className="text-4xl font-bold">Checkout</h1>
			<Checkout userId={userDetails?.data?._id} />
			<OrderButton />
		</div>
	);
};

export default CheckOutPage;
