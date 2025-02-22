"use client";

const { ShoppingCart } = require("lucide-react");
const { ModeToggle } = require("../ThemeToggle");

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const NavigationBar = () => {
	const router = useRouter();

	return (
		<div className="flex justify-between p-4 fixed top-0 dark:bg-background bg-background w-full md:px-28 z-50">
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
				<ShoppingCart onClick={() => router.push("/cart")} />
				<ModeToggle />
				<UserButton />
			</div>
		</div>
	);
};

export default NavigationBar;
