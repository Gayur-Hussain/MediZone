import Sidebar from "@/components/sidebar";
import { Suspense } from "react";
import Loading from "./loading";

import { fetchUserDetailsAction, saveUserToDB } from "@/actions/userAction";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
	// Authenticate the user
	const user = await auth();

	// If user is not authenticated, redirect to login
	if (!user) redirect("/login");

	// Save user data in the database
	await saveUserToDB();

	// Fetch user details from the database
	const userDetails = await fetchUserDetailsAction(user.userId);

	// If user is not an admin, redirect to home page
	if (userDetails?.data?.role !== "admin") redirect("/");

	return (
		<div
			className="flex min-h-screen mt-6 lg:px-24"
			suppressHydrationWarning
		>
			<Sidebar />
			<main className="flex-1 p-8 pt-12">
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</main>
		</div>
	);
}
