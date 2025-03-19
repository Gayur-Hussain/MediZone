import { UserProfile } from "@clerk/nextjs";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { fetchUserDetailsAction } from "@/actions/userAction";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
	const { userId } = await auth();
	const userDetails = await fetchUserDetailsAction(userId);
	userDetails?.data?.role === "admin"
		? redirect("/dashboard/products")
		: null;

	return (
		<div className="mt-24 flex justify-center items-center">
			<UserProfile />
		</div>
	);
};

export default ProfilePage;
