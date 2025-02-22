import { Webhook } from "svix";
import User from "@/models/UserModel";
import connectToDatabase from "@/lib/db";

export async function POST(req) {
	// Connect to database
	await connectToDatabase();

	// Ensure CLERK_WEBHOOK_SECRET is defined
	if (!process.env.CLERK_WEBHOOK_SECRET) {
		console.error("Missing Clerk Webhook Secret in environment variables.");
		return new Response("Server misconfiguration", { status: 500 });
	}

	// Get headers from request (Corrected way)
	const svix_id = req.headers.get("svix-id");
	const svix_timestamp = req.headers.get("svix-timestamp");
	const svix_signature = req.headers.get("svix-signature");

	// Validate headers
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error: Missing Svix headers", { status: 400 });
	}

	// Get request payload
	const payload = await req.json();
	const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
	let evt;

	// Verify webhook payload
	try {
		evt = wh.verify(JSON.stringify(payload), {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		});
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}

	// Handle the event
	const eventType = evt.type;
	if (eventType === "user.created" || eventType === "user.updated") {
		const {
			id,
			email_addresses,
			username,
			first_name,
			last_name,
			image_url,
		} = evt.data;

		await User.findOneAndUpdate(
			{ clerkId: id },
			{
				email: email_addresses[0]?.email_address || "",
				username: username || "",
				firstName: first_name || "",
				lastName: last_name || "",
				photo: image_url || "",
			},
			{ upsert: true, new: true }
		);
	}

	console.log(`Webhook received: ${eventType}`);
	return new Response("Webhook received", { status: 200 });
}
