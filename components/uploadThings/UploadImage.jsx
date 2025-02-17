"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import React from "react";

const UploadImage = () => {
	return (
		<div className="flex  flex-col items-center justify-between p-24">
			<UploadButton
				endpoint="imageUploader"
				onClientUploadComplete={(res) => {
					// Do something with the response
					console.log("Files: ", res);
					alert("Upload Completed");
				}}
				onUploadError={(error) => {
					// Do something with the error.
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</div>
	);
};

export default UploadImage;
