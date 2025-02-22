import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "@/components/ThemeProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
import CommonLayout from "@/components/commonLayout";
import { ReduxProvider } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NavigationBarWrapper from "@/components/navbar/navigationBarWrapper";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Medi-Zone",
	description: "Created by team (Gayur Hussain,Mohd Faisal, Mohd Fraiz)",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased `}
				>
					<ThemeProviders
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<NextSSRPlugin
							routerConfig={extractRouterConfig(ourFileRouter)}
						/>
						<ReduxProvider>
							<CommonLayout>
								<NavigationBarWrapper />
								{children}
							</CommonLayout>
						</ReduxProvider>
						<Toaster />
					</ThemeProviders>
				</body>
			</html>
		</ClerkProvider>
	);
}
