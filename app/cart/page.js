import Cart from "@/components/cart/Cart";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUserDetailsAction } from "@/actions/userAction";

const CartPage = async () => {
	const { userId } = await auth();
	const userDetails = await fetchUserDetailsAction(userId);
	userDetails?.data?.role === "admin"
		? redirect("/dashboard/products")
		: null;
	return (
		<div className="px-28">
			<Cart />
		</div>
	);
};

export default CartPage;
