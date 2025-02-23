import { fetchUserDetailsAction, saveUserToDB } from "@/actions/userAction";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import HomeProductsList from "@/components/home/HomeProductsList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await auth();
	const { userId } = user;
	// Save user data in the database
	await saveUserToDB();
	const userDetails = await fetchUserDetailsAction(userId);
	userDetails?.data?.role === "admin"
		? redirect("/dashboard/products")
		: null;
	return (
		<div className="md:px-28 px-4 mt-24 md:mt-10 ">
			<Hero />
			<HomeProductsList />
			<Footer />
		</div>
	);
}
