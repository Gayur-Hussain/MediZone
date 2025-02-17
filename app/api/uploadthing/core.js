import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: "4MB", // Maximum file size for uploads
			maxFileCount: 1, // Maximum number of files allowed
			acceptedFileTypes: [
				"image/png", // PNG files
				"image/jpeg", // JPEG files
				"image/jpg", // JPG files
				"image/webp", // WEBP files
				"image/gif", // GIF files
				"image/svg+xml", // SVG files
			],
		},
	}).onUploadComplete(async ({ metadata, file }) => {
		console.log("File uploaded successfully:", file.ufsUrl);
	}),
};
