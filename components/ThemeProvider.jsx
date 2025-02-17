"use client"; // Mark this as a Client Component
import { ThemeProvider } from "next-themes";

export function ThemeProviders({ children }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			{children}
		</ThemeProvider>
	);
}
