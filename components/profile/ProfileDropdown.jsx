"use client";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { SignedOut, SignOutButton } from "@clerk/nextjs";

const ProfileDropdown = ({ userDetails }) => {
	const router = useRouter();
	return (
		<div className="mt-2">
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded-full">
					{userDetails?.photo ? (
						<Image
							src={userDetails.photo}
							height={28}
							width={28}
							alt="userImage"
							className="rounded-full"
						/>
					) : (
						<CircleUserRound />
					)}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => router.push("/profile")}>
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push("/orders")}>
						Orders
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SignOutButton className="text-red-600" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ProfileDropdown;
