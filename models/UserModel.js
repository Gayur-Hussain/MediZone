import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		clerkId: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true },
		firstName: { type: String, default: null },
		lastName: { type: String, default: null },
		photo: { type: String },
		role: { type: String, default: "user" },

		// ✅ Fix: Ensure 'address' is an embedded object, not a string
		address: {
			street: { type: String, default: "" },
			city: { type: String, default: "" },
			state: { type: String, default: "" },
			zipCode: { type: String, default: "" },
			country: { type: String, default: "" },
		},
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
