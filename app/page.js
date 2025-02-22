import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import HomeProductsList from "@/components/home/HomeProductsList";

export default function Home() {
	return (
		<div className="md:px-28 px-4 ">
			<Hero />
			<HomeProductsList />
			<Footer />
		</div>
	);
}
