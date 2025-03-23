"use client";

import { ShoppingCart } from "lucide-react";
import { ModeToggle } from "../ThemeToggle";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ProfileDropdown from "../profile/ProfileDropdown";

const NavigationBar = ({ userDetails }) => {
	const router = useRouter();

	return (
		<div className="flex justify-between p-4 fixed top-0 dark:bg-background bg-background w-full lg:px-28 z-50">
			<div>
				<Link
					href={"/"}
					className="font-extrabold text-2xl lg:text-4xl text-primary"
				>
					Medi-Zone
				</Link>
			</div>
			<div className="flex items-center gap-4">
				{/* ✅ Always show the cart icon unless the user is an admin */}
				{!userDetails || userDetails.role !== "admin" ? (
					<ShoppingCart onClick={() => router.push("/cart")} />
				) : null}
				<ModeToggle />
				<SignedOut>
					<SignInButton className="bg-primary p-2 rounded-md px-4" />
				</SignedOut>
				<SignedIn>
					{!userDetails || userDetails.role !== "admin" ? (
						<ProfileDropdown userDetails={userDetails} />
					) : (
						<UserButton />
					)}
				</SignedIn>
			</div>
		</div>
	);
};

export default NavigationBar;
