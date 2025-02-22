import { Webhook } from "svix";
import { headers } from "next/headers";
import User from "@/models/User";
import connectToDatabase from "@/lib/db";

export async function POST(req) {
	await connectToDatabase();

	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	const payload = await req.json();
	const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
	let evt;

	try {
		evt = wh.verify(JSON.stringify(payload), {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		});
	} catch (err) {
		return new Response("Error verifying webhook", { status: 400 });
	}

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
				email: email_addresses[0].email_address,
				username: username,
				firstName: first_name,
				lastName: last_name,
				photo: image_url,
			},
			{ upsert: true, new: true }
		);
	}

	return new Response("", { status: 200 });
}
