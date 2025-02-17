"use client";
import Sidebar from "@/components/sidebar";
import { Suspense } from "react";
import Loading from "./loading";

export default function DashboardLayout({ children }) {
	return (
		<div className="flex min-h-screen" suppressHydrationWarning>
			<Sidebar />
			<main className="flex-1 p-8 pt-12">
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</main>
		</div>
	);
}
