"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
	const pathname = usePathname();

	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const navItems = [
		{ title: "Dashboard", href: "/dashboard" },
		{ title: "Products", href: "/dashboard/products" },
		{ title: "Orders", href: "/dashboard/orders" },
	];

	return (
		<>
			{/* Desktop Sidebar */}
			<div className="hidden lg:block fixed h-screen md:w-[250px] border-r bg-background p-4 mt-12">
				<div className="space-y-4">
					<div className="space-y-2">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
									pathname === item.href
										? "bg-primary text-primary-foreground"
										: "hover:bg-accent hover:text-accent-foreground"
								}`}
								aria-current={
									pathname === item.href ? "page" : undefined
								}
							>
								{item.title}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="mt-10">
							<Menu className="h-4 w-4 " />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[250px]">
						<SheetTitle></SheetTitle>
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-bold">Dashboard</h2>
							</div>
							<div className="space-y-2">
								{navItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
											pathname === item.href
												? "bg-primary text-primary-foreground"
												: "hover:bg-accent hover:text-accent-foreground"
										}`}
										aria-current={
											pathname === item.href
												? "page"
												: undefined
										}
										onClick={() => setIsSheetOpen(false)} // Close sidebar on link click
									>
										{item.title}
									</Link>
								))}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}
