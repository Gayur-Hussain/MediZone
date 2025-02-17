import mongoose from "mongoose";

const connectToDatabase = async () => {
	if (mongoose.connections[0].readyState) {
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Next Agency connected successfully!");
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
};

export default connectToDatabase;
