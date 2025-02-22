import { fetchUserDetailsAction } from "@/actions/userAction";
import NavigationBar from "./NavigationBar";
import { auth } from "@clerk/nextjs/server";

export default async function navigationBarWrapper() {
	const user = await auth();

	let userDetails = null;
	if (user) {
		userDetails = await fetchUserDetailsAction(user.userId);
	}

	return <NavigationBar userDetails={userDetails?.data} />;
}
