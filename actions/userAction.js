"use server";
import connectToDatabase from "@/lib/db";
import User from "@/models/UserModel";
import { currentUser } from "@clerk/nextjs/server";

export async function saveUserToDB() {
	await connectToDatabase();
	const user = await currentUser();

	if (!user) return { error: "User not authenticated" };

	try {
		const existingUser = await User.findOne({ clerkId: user.id });

		if (!existingUser) {
			await User.create({
				clerkId: user.id,
				email: user.emailAddresses[0]?.emailAddress,
				username: user.username || user.id, // Use Clerk username or fallback to ID
				firstName: user.firstName,
				lastName: user.lastName,
				photo: user.imageUrl, // Clerk provides imageUrl for user profile pictures
				role: "user", // Default role
			});

			return { success: "User stored in database" };
		}

		return { success: "User already exists" };
	} catch (error) {
		console.error("Error saving user:", error);
		return { error: "Database error" };
	}
}

// fetch use detail from database

export async function fetchUserDetailsAction(id) {
	try {
		await connectToDatabase();
		const userDetails = await User.findOne({ clerkId: id });
		if (!userDetails) {
			return {
				success: false,
				message: "User not found!",
			};
		}
		return {
			success: true,
			data: JSON.parse(JSON.stringify(userDetails)),
		};
	} catch (error) {
		return {
			success: false,
			message: "Error fetching user details",
		};
	}
}

// ✅ Fetch User Address
export async function fetchUserAddressAction(userId) {
	try {
		await connectToDatabase();
		const user = await User.findById(userId).lean(); // ✅ Convert to plain object
		return user?.address || null;
	} catch (error) {
		console.error("Error fetching user address:", error.message);
		throw new Error("Failed to fetch address");
	}
}

// ✅ Update User Address

export async function updateUserAddressAction(userId, addressData) {
	try {
		await connectToDatabase();

		if (!userId || !addressData) {
			throw new Error("Invalid userId or address data");
		}

		// ✅ Directly update the address field
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $set: { address: addressData } },
			{ new: true }
		);

		if (!updatedUser) {
			throw new Error("User not found");
		}

		return JSON.parse(JSON.stringify(addressData));
	} catch (error) {
		console.error("Error updating user address:", error);
		throw new Error(error.message);
	}
}
