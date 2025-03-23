import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
	"/dashboard(.*)",
	"/forum(.*)",
	"/checkout",
	"/profile",
	"/orders",
]);

// Define public routes (e.g., sign-in, sign-out)
const isPublicRoute = createRouteMatcher([
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api(.*)", // Exclude API routes from protection
]);

export default clerkMiddleware(async (auth, req) => {
	// Debugging: Log the request URL
	console.log("Request URL:", req.url);

	// Skip middleware for public routes
	if (isPublicRoute(req)) {
		console.log("Public route, skipping protection");
		return;
	}

	// Protect protected routes
	if (isProtectedRoute(req)) {
		console.log("Protected route, checking authentication");
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and static files
		"/((?!_next|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|css|js|json)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
