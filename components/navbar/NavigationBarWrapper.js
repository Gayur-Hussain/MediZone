import { fetchUserDetailsAction } from "@/actions/userAction";
import NavigationBar from "./NavigationBar";
import { auth } from "@clerk/nextjs/server";

export default async function NavigationBarWrapper() {
	const user = await auth();

	// If the user is logged in, fetch their details
	let userDetails = null;
	if (user) {
		userDetails = await fetchUserDetailsAction(user.userId);
	}

	return <NavigationBar userDetails={userDetails?.data} />;
}
