"use client";

import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import HomeProductsList from "@/components/home/HomeProductsList";

import { ModeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<div className="md:px-28 px-4">
			<div className="flex justify-between mt-4 ">
				<div>
					<Link
						href={"/"}
						className="font-extrabold text-2xl lg:text-4xl text-rose-600"
					>
						Medi-Zone
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<Button onClick={() => router.push("/dashboard/products")}>
						Dashboard
					</Button>
					<ModeToggle />
				</div>
			</div>
			<Hero />
			<HomeProductsList />
			<Footer />
		</div>
	);
}
