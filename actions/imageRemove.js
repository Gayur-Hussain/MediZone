"use server";

import { utapi } from "@/server/uploadthing";

export async function removeImageAction(imageKey) {
	try {
		await utapi.deleteFiles(imageKey);
		return { success: true };
	} catch (error) {
		return { success: false };
	}
}
